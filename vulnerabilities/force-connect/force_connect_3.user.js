// ==UserScript==
// @name Force connect 3
// @author Illya
// @description The third version of force connect
// @version 0.1
// @match *://moomoo.io/*
// @match *://*.moomoo.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace -
// ==/UserScript==

let servers, elemSet = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set;
Object.defineProperty(window, "vultr", {
    set: (data) => {
        data.servers.forEach(server => server.games.forEach(game => {game.playerCount = 0-game.playerCount;}));
        servers = data;
    },
    get: () => servers
})

Object.defineProperty(Element.prototype, "innerHTML", {
    set(data) {
        this.id === "serverBrowser" && (data = data.replace(/-(\d)/g, '$1'));
        return elemSet.call(this, data);
    }
})
