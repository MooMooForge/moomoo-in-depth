# How the client handles the WebSocket protocol

After connecting, the client sets the WebSocket onmessage event to a function that handles the incoming packets.

All events are stored in an object, and the packet type is used as the key.

To view all incoming packets, you can hook into the onmessage event and log the packet types and data.

I've prepared an example script [here](./example-scripts/example1.js)

## Basic Packet Handling

I have explained the packet structure in the [protocol README](../README.md).

In this section tho, I will tell you how to decode and encode packets so you can modify or send them.

## Decoding
To decode packets, we take the ArrayBuffer `event.data` and create a new Uint8Array from it.

We then use the msgpack library to decode the `Uint8Array` to a JavaScript object / array.

Your code should look something like this:

```js
let data = new Uint8Array(event.data);
let parsed = msgpack.decode(data);
```

Now, we have a fully decoded packet and we can start working with them.

The packet structure takes the first item of the array as the packet type, and the second array is an array of more data.
more about that [here](../README.md).

Lets take the chat packet as an example.
As we know, the chat packet looks like this:

```js
[
    "ch",
    [
        authorid,
        message
    ]
]
```

So to access the message, we take the second argument of the data array.

```js
let [type, [...args]] = parsed;

if (type == "ch") {
    let [authorid, message] = args;
    console.log(`Message from ${authorid}: ${message}`);
}
```
You can find a script that uses the onmessage hook with the chat packet [here](./example-scripts/example2.js)

You can find a list of all incoming packets [here](../server/README.md).

## Chunk Arrays

some packets are chunked, which means that there are multiple data chunks in one array.

The most common chunked packet is the player packet.
We know, that its 13 items long, so we can slice the array into chunks of 13 items.

I have talked about chunk arrays in the [protocol README](../README.md).

The handling works the same as usual, but you need to slice the array.

Lets take the player packet as an example.

```js
if(type == "33") {
    let players = chunkArray(args, 13);
    // chunked = [[...], [...], [...], ...]
}
```
I have prepared a script thhat utilizes the chunked player packet [here](./example-scripts/example3.js)

## Encoding

The sending packet structure is the same as the incoming packet structure.

To encode packets, we first encode the packet with msgpack, and then we create a new `Uint8Array` from the encoded packet.

We then send the `Uint8Array` to the server.

It should look something like this:

```js
let packet = ["ch", ["Message"]]
let encoded = msgpack.encode(packet);

let tosend = new Uint8Array(encoded);

ws.send(tosend);
```
