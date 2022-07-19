// ==UserScript==
// @name Force connect 2
// @author Cloudy
// @description The second version of force connect, which doesn't work anymore
// @version 0.1
// @match *://moomoo.io/*
// @match *://*.moomoo.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace -
// ==/UserScript==

(function() {
    "use strict";

    let coreURL = new URL(window.location.href);
    window.sessionStorage.force = coreURL.searchParams.get("fc");

    if (window.sessionStorage.force != "true" && window.sessionStorage.force && window.sessionStorage.force.toString() != "null") {
        document.getElementsByClassName("menuHeader")[0].innerHTML = `Servers <span style="color: blue;">Force (${window.sessionStorage.force})</span>`;
    }

    var oldAlert = alert;
    window.alert = function() {
        $.alert({
            title: "Full Server!",
            content: "This server is full! Would you like to force connect?",
            useBootstrap: false,
            buttons: {
                Back: () => {
                    window.onbeforeunload = null;
                    window.location = "http://moomoo.io";
                },
                Yes: () => {
                    let coreURL = new URL(window.location.href);
                    let server = coreURL.searchParams.get("server");
                    window.sessionStorage.force = server;
                    window.sessionStorage.dog = server;
                    setTimeout(() => {
                        window.location = `http://moomoo.io?fc=${server}`;
                    }, 500);
                },
            }
        });
    }


    class ForceSocket extends WebSocket {
        constructor(...args) {
            if (window.sessionStorage.force != "false" && window.sessionStorage.force && window.sessionStorage.force.toString() != "null") {
                let server = window.sessionStorage.force;
                let sip = "";
                for (let gameServer of window.vultr.servers) {
                    if (`${gameServer.region}:${gameServer.index}:0` == server) {
                        sip = gameServer.ip;
                    }
                }
                args[0] = `wss://ip_${sip}.moomoo.io:8008/?gameIndex=0`;
                delete window.sessionStorage.force;
            }
            super(...args);
        }
    }
    window.WebSocket = ForceSocket;

})();
