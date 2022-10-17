// ==UserScript==
// @name        decoding example hook
// @author      Nuro
// @description description
// @version     1
// @match       *://*.moomoo.io/*
// @run-at      document-start
// @require     https://greasyfork.org/scripts/423602-msgpack/code/msgpack.js?version=1005014
// @grant       none
// ==/UserScript==

let onmessagesetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onmessage").set;

Object.defineProperty(WebSocket.prototype, "onmessage", {
    set: function (callback) {
        onmessagesetter.call(this, function (event) {
            let data = new Uint8Array(event.data)
            let parsed = msgpack.decode(data)
            let [type, [...args]] = parsed;

            if (type == "ch") {
                let [authorid, message] = args;
                console.log(`Message from ${authorid}: ${message}`);
            }
            callback(event);
        });
    }
});