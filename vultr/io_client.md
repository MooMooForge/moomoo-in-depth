# io-client 

This documentation includes information about the io-client, that MooMoo uses to communicate with the server.

The io-client is an Object that has all the information you need to interact with MooMoo servers. Lets go through all of them.

- [Properties](#properties)
  - [Socket](#socket)
  - [Connected](#connected)
  - [SocketId](#socketid)
  - [Connect](#connect)
  - [Send](#send)
  - [SocketReady](#socketready)
  - [Close](#close)

# Properties

## socket

This property is the WebSocket connection to the server. It is a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) object.


## connected

This property is a boolean that indicates if the client is connected to the server.
by default it is false obviously.

## socketId


This property is the uniqe id of the socket.
It gets set when the client connects to the server, and stays the same until the client disconnects.

## connect

This property is a function that takes 3 arguments:
 - `address`: The URL, that the client should connect to. click [here](./README.md) how to create a valid URL.
 - `callback`: A function that gets called when the client is connected or when an error occurs. It handles errors and tells the client if it is connected or not.
 - `events`: An Object that contains all the events that the client should listen to.

Everything that happens inside of the connect function, is in a try/catch block.
If an error occurs, the callback function gets called with the error as the first argument.

Inside of the try/catch block, the client created a new WebSocket, sets the `socket` property to the new WebSocket, and sets the `connected` property to true.

After that, it configures the `binaryType` property of the WebSocket to `arraybuffer`.

Then, it sets the `socket.onmessage` property to a function that gets called when a message is received.

This Function takes in 1 argument, which is a `MessageEvent` object. This Object gets converted into a new Uint8Array and decoded with the msgpack library.

It now has a encoded packet, which is an Array with the following structure:
 - `0`: The type of the packet.
 - `1`: The data of the packet.

 More information about the packet structure can be found in the [protocol documentation](../protocol).

 Now it checks if the packet type is `io_init`, which is the inital packet that the server send to the client. It includes one information, which is the `socketId`.

If the packet type is not `io_init`, it calls the proper event handler with the data of the packet.

```js
var type = parsed[0];
var data = parsed[1];

if (type == "io-init") {
    this.socketId = data[0];
} else {
    events[type].apply(undefined, data);
}
```
 
 Now after that, it sets the `socket.onopen` property to a function that gets called when the connection is opened.

 When the connection is opened, it calls the `callback` and sets `this.connected` to true.

 After that, it sets the `socket.onclose` property to a function that gets called when the connection is closed.

 When the connection is closed, it calls the `callback` with either `Disconnected` or `Invalid Connection` as the first argument depending if `event.code` is `4001`.

 Now, it sets the `socket.onerror` property to a function that gets called when an error occurs. This function calls the `callback` with `Socket Error` as the first argument.

 ## send

The send function takes an Array as its first and only argument.

The Array has the following structure:
 - `0`: The type of the packet.
 - `1`: The data of the packet.

 First the Array gets extracted by calling it with Array.slice.

 ```js
 var data = Array.prototype.slice.call(arguments, 1);
 ```

 After that, it gets converted into binary data with the msgpack library.
 The binary data then gets sent to the server.

## socketReady

This function returns if the socket is ready to send data.

```js
socketReady: function() {
    return (this.socket && this.connected);
},
```

## close

this function closes the socket.