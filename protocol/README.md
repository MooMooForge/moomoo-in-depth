# WebSocket Protocol

## Intro

Just as every other WebSocket based game, MooMoo.io has incoming - outgoing packets too.

After connecting the WebSocket, a onmessage event gets created, and depending on the packet item, a function gets executed.

I've talked about this before, check out the [Vultr-client](../vultr/README.md)

There are 36 incoming packet types and 16 outgoing packets.

You find all outgoing packets [here](./client/README.md).
You find all incoming packet types [here](./server/README.md).

## Basic Packet Structure

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

## Chunk Arrays

Chunk arrays are arrays that contain multiple data packs, for example 3 player data packs.

They are used for sending multiple data packs at once, to reduce the amount of packets sent.

Example:
```js
// original Array
[["key", "value"], ["key", "value"]] // 36 bytes

// chunked Array
["key", "value", "key", "value"] // 32 bytes
```

## How to use

To convert chunks to an array, it is necessary that you know the size of each chunk.

We use a for loop to iterate through the array while repeatedly slicing chunks of the specified size using the `Array.prototype.slice()` method. You can increase the iterator by the specified size on each iteration so as to start each new group after the previous one ended:

```js
function chunkArray(array, size) {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}
```

To convert a array to a chunk, we use the `Array.prototype.concat()` method to merge the arrays into one:
```js
function unchunkArray(array, chunksize) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result = result.concat(array[i])
    }
    return result
}
```

