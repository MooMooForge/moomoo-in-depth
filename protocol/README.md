# WebSocket Protocol

## Intro

Just as every other WebSocket based game, MooMoo.io has incoming - outgoing packets too.

After connecting the WebSocket, a onmessage event gets created, and depending on the packet item, a function gets executed.

I've talked about this before, check out the [Vultr-client](../vultr/README.md)

There are 36 incoming packet types and 16 outgoing packets.

You find all outgoing packets [here](./client/README.md).
You find all incoming packet types [here](./server/README.md).

## Basic Packet Structure

---

The packet structure is easy and similar to socket.io packets.

The Packet is an Array, with the first item being the packet type.
The rest of the items are the packet data. Can be an any data type.

For example, the following packet would send a message to the server:

```js
[
    "message",
    [
        "Hello World!"
    ]
]
```

Its the same for incoming packets.

## Flat Maps

