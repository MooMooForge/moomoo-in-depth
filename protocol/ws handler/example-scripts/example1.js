// ==UserScript==
// @name        onmessage Hook example
// @author      Nuro
// @description description
// @version     1
// @match       *://*.moomoo.io/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

let onmessagesetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onmessage").set;

Object.defineProperty(WebSocket.prototype, "onmessage", {
    set: function (callback) {
        onmessagesetter.call(this, function (event) {
            let data = event.data;
            console.log(data);
            callback(event);
        });
    }
});

// I have not included the decoding for the packets, you can do that on your own.
// Here's the decoding format if you dont know: [add later]