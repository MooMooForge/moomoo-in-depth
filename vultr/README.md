# Vultr Client

This documentation includes information about the VultrClient that moomoo is using and the structure of it

- [Setup](#setting-up-the-vultrclient)
  - [Open a new VultrClient](#opening-VultrClient)
  - [Generate ReCaptcha token](#generating-a-recaptcha-token)
  - [Setup WS URL](#setting-up-the-websocket-url)
  - [create WS](#creating-the-websocket)
- [Structure](#structure-of-the-vultrclient)
  - [constructor](#constructor)
  - [Start](#starting-the-client)
  - [Parse Server Query](#starting-the-client)
  - [Find Server](#find-server)
  - [Seek Server](#seek-server)
  - [Connect to Server](#connect-to-server)
  - [Get Server Address](#get-server-address)
  - [Process Servers](#process-servers)
  - [ipToHex](#iptohex)
  - [hashIP](#haship)
  - [Generate Href](#generate-href)

# Setting up the VultrClient

## Opening VultrClient

You can open a VultrClient just like this:

```js
let client = new VultrClient("moomoo.io", 3000, config.maxPlayers, 5, false);
```

Constructor takes 5 arguments, `baseUrl`, `devPort`, `lobbySize`, `lobbySpread` and `rawIPs`.

---

## Generating a ReCaptcha token

Before we can start creating WebSockets, we need to generate a recaptcha token with MooMoo's recaptcha API token.

```js
let token = "6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ";
window.grecaptcha.execute(token, { action: "homepage" }).then(function(token) {
    connectWS(token)
})
```

---

## Setting up the WebSocket URL

MooMoo starts the VultrClient and configures the WebSocket inside of callback function (first argument of the start function). This callback function is called when the VultrClient is ready to start.

The callback function takes 3 arguments, which are `address`, `port` and `gameIndex`.

To create a valid WebSocket url, it takes the protocol, address and gameindex.

Moomoo also checks if `location.hostname` is not a localhost address, if it is the `isProd` variable gets set to true.

```js
var protocol = isProd ? "wss" : "ws";
var wsAddress = protocol + "://" + address + ":" + 8008 + "/?gameIndex=" + gameIndex;
if (token) wsAddress += "&token=" + encodeURIComponent(token);
```

## Creating the WebSocket

MooMoo uses its own io client to create the WebSocket.

You can read more about it [here](./io_client.md)

The connect function takes 3 arguments, which are the address of the websocket, a callback function which gets called when the websocket is connected or when an error occurs, and `events` Object which includes all the events that the websocket should listen to.

(more about events and the websocket protocol [here](../protocol))

The callback function we pass in first tries to ping the WebSocket.

```js
function pingSocket() {
    lastPing = Date.now();
    io.send("pp");
}
```

It then creates an interval which calls the pingSocket function every 2.5 seconds.

If the callback function gets called with an error, the gameUI gets cleared and the WebSocket is most likely closed.

```js
function disconnect(reason) {
    connected = false;
    io.close();
}
```

# Structure of the VultrClient

## Constructor

The first argument is the base url of the server, which is the url of the server that the client is connecting to. When you pass in localhost, it will redirect to "127.0.0.1", because the server manager uses that as the home url.

Set `this.debugLog` to true to see the debug logs of the client.

The rest of the arguments are base data that is used later on.

```js
class VultrClient {
    constructor(baseUrl, devPort, lobbySize, lobbySpread, rawIPs) {
        if (location.hostname == "localhost") {
            window.location.hostname = "127.0.0.1";
        }

        this.debugLog = false;

        this.baseUrl = baseUrl;
        this.lobbySize = lobbySize;
        this.devPort = devPort;
        this.lobbySpread = lobbySpread;
        this.rawIPs = !!rawIPs;
    }
}
```

---

## Starting the client

When starting, the client first parses the URL query string for a server code. If there is none, it pings every server to get the correct one.

```js
static start(callback, errorCallback) {
    this.callback = callback;
    this.errorCallback = errorCallback;

    var query = parseServerQuery();
    if (query) {
        this.password = query[3];
        this.connect(query[0], query[1], query[2]);
    } else {
        this.pingServers();
    }
};
```

---

## Parse Server Query

The url is parsed to get the server code, index and region.

It first parses `location.href` from the query string.
If the parsed query string isnt a string, it return the process.
It then parse the server string into an array.

---

## Find Server

The arguments that are passed in are the region and index.

It first find the server that matches the region, then we find the server that matches the index.

If the region isn't found, it returns the error callback.
If the index isn't found, it returns nothing.

---

## Seek Server

This function gets called when a server is either full or not found.

It first define configurations for the server, which are the game mode, max players and lobby spread.

It then gets a list with all of the servers that are in the same region as the server we are seeking, and We filter it to only include servers that are not full or private / unavailable.

It then maps the servers to `{region, index, gameIndex, gameCount, playerCount, isPrivate}` where index is From 0 to (total servers \* games per server).

By doing that, it can decompose the index again later to find the server and game index.

Then it filters out private servers and servers that are full.

If there are no servers left, it return the error callback.

It then picks a random server from the list, by getting `lobbySpread` which defines how many servers we want to spread out for.

```js
var randomSpread = Math.min(lobbySpread, servers.length);
var serverIndex = Math.floor(Math.random() * randomSpread);
serverIndex = Math.min(serverIndex, servers.length - 1);
var rawServer = servers[serverIndex];
```

Then It extracts the information from the raw server.

```js
var serverRegion = rawServer.region;
var serverIndex = Math.floor(rawServer.index / rawServer.gameCount);
var gameIndex = rawServer.index % rawServer.gameCount;
```

---

## Connect to Server

First of all, MooMoo needs to make sure that the client is not already connected to a server.
It Also checks if the server is private or full.

After saving the server information, we call the callback function.

```js
this.callback(this.serverAddress(server.ip), this.serverPort(server), game);
```

---

## Get Server Address

This function takes 2 arguments, the ip an argument that determines if we want to force the server to go through CloudFlare or not. It returns the server adress for an IP using reverse DNS.

---

## Process Servers

This function takes a list of servers and processes, sorts and saves them.

## ipToHex

MooMoo uses the IP adress of a server to convert it into a hexadecimal string.

```js
static ipToHex(ip) {
    const encoded = ip.split(".")
        .map((component) =>
            ("00" + parseInt(component).toString(16))
            .substr(-2)
        )
        .join("")
        .toLowerCase();
    return encoded;
};
```

---

## hashIP

This function hashes an IP intop a cryptographically secure string. It does this by converting the ip to a hexadecimal string and then doing a md5 has on the string.

```js
static hashIP(ip) {
    return md5(this.ipToHex(ip));
}
```

## Generate Href

This function takes a region, index, game and password to generate a valid href for a server.

```js
static generateHref(region, index, game, password) {
    if (region.startsWith("vultr:")) {
            region = region.slice(6);
        } else if (region.startsWith("do:")) {
            region = region.slice(3);
        }
    }

    var href = "/?server=" + region + ":" + index + ":" + game;
    if (password) {
        href += "&password=" + encodeURIComponent(password);
    }
    return href;
};
```
