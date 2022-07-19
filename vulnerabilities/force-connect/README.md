# Force connect

> **Force connect** - is a script that allows you to connect to the full server

Every server can contain up to `50` players, but there's a strictly limited number of players who can connect to the server `40`.

## Large servers
In old versions of the game there were large servers:
- London 1
- Frankfurt 1

they could contain up to `80` players and `90` with force connect

## Versions
- Force connect 1<br>
The first version of force connect used a socket url replacement technique. The source code may have been lost.

- [Force connect 2](vulnerabilities/force-connect/force_connect_2.user.js)<br>
In fact, this is the same as the first version of force connect, which is made by `Cloudy`.

- [Force connect 3](vulnerabilities/force-connect/force_connect_3.user.js)<br>
This version is written by Illya. It uses `window.vultr` property hooking, iterates over an array of servers and changes `playerCount` to negative number. In this case, game will think that the server is not full.

- [Force connect 4](vulnerabilities/force-connect/force_connect_4.user.js)<br>
This is the newest existing version of force connect, modifies `maxPlayers` property, which tells the game that the server is not full yet.
