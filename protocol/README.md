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

https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap

Flat maps are used to convert the incoming packet data to a more usable format.

You can think of it like this:

```js
// original Array
[["key", "value"], ["key", "value"]]

// flat mapped Arrat
["key", "value", "key", "value"]
```

Its used in some of the incoming packets


to deal with this, you need to first identify how long the original arrays are. If you figured that out, you can use a loop to get the original arrays.

```js
let array = ["key", "value", "key", "value"];

for(let i = 0; i < array.length;) {
    let key = array[i];
    let value = array[i + 1];

    i += 2;
}
```
