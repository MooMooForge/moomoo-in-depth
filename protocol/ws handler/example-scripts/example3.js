// ==UserScript==
// @name        decoding example hook with player packet
// @author      Nuro
// @description description
// @version     1
// @match       *://*.moomoo.io/*
// @run-at      document-start
// @require     https://greasyfork.org/scripts/423602-msgpack/code/msgpack.js?version=1005014
// @grant       none
// ==/UserScript==

function chunkArray(array, size) {
    let result = []
    for (let i = 0; i < array.length; i += size) {
        let chunk = array.slice(i, i + size)
        result.push(chunk)
    }
    return result
}

let onmessagesetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onmessage").set;

Object.defineProperty(WebSocket.prototype, "onmessage", {
    set: function (callback) {
        onmessagesetter.call(this, function (event) {

            let data = new Uint8Array(event.data)
            let parsed = msgpack.decode(data)

            let [type, [...args]] = parsed;

            if (type == "33") {
                let players = chunkArray(args[0], 13)
            }

            callback(event);
        });
    }
});

