# Incoming packets

There are 36 incoming packet types, and I will go through them one by one.

## Packet handling

As I already said, MooMoo.io has an Object with all incoming packet types.

see more [here](../../vultr/README.md)

# Packet types

| Packet Name          	| packet ID 	| data                                                                                                                      	|
|----------------------	|-----------	|---------------------------------------------------------------------------------------------------------------------------	|
| [setInitData](#setinitdata)          	| id        	| {"teams": [{"sid": "ClanName","owner": SidOfOwner}]}                                                                      	|
| [disconnect](#disconnect)           	| d         	| no data                                                                                                                   	|
| [setupGame](#setupgame)            	| 1         	| player sid                                                                                                                	|
| [addPlayer](#addplayer)            	| 2         	| player id, sid, name, x, y, dir, health, maxHealth, scale, skinColor, isMyself                                            	|
| [removePlayer](#removePlayer)         	| 4         	| player id                                                                                                                 	|
| [updatePlayers](#updateplayers)        	| 33        	| id, x, y, dir, buildIndex, weaponIndex, weaponVariant, team, isLeader, skinIndex, tailIndex, iconIndex, zIndex, isVisible 	|
| [updateLeaderboard](#updateleaderboard)   	| 5         	| sid, name, score, sid, name, score, sid, name, score                                                                      	|
| [loadGameObject](#loadgameobject)       	| 6         	| sid, x, y, dir, scale, idk, type, ownerSid                                                                                	|
| [loadAI](#loadai)               	| a         	| sid, type, x, y, dir, health, index                                                                                       	|
| [animateAI](#animateai)            	| aa        	| sid                                                                                                                       	|
| [gatherAnimation](#gatheranimation)      	| 7         	| sid, didHit, index                                                                                                        	|
| [wiggleGameObject](#wigglegameobject)     	| 8         	| dir, sid                                                                                                                  	|
| [shootTurret](#shootturret)          	| sp        	| sid, dir                                                                                                                  	|
| [updatePlayerValue](#updateplayervalue)    	| 9         	| index, value, updateView                                                                                                  	|
| [updateHealth](#updatehealth)      	| h         	| sid, value                                                                                                                	|
| [killPlayer](#killplayer)           	| 11        	| no data                                                                                                                   	|
| [killObject](#killobject)           	| 12        	| sid                                                                                                                       	|
| [killObjects](#killobjects)          	| 13        	| sid                                                                                                                       	|
| [updateItemCounts](#updateitemcounts)     	| 14        	| index, value                                                                                                              	|
| [updateAge](#updateage)            	| 15        	| xp, maxxp, age                                                                                                            	|
| [updateUpgrades](#updateupgrades)       	| 16        	| points, age                                                                                                               	|
| [updateItems](#updateitems)          	| 17        	| itemsInHotbar / weaponsInHotbar, isWeapons                                                                                	|
| [addProjectile](#addprojectile)        	| 18        	| x, y, dir, range, speed, index, layer, sid                                                                                	|
| [remProjectile](#remprojectile)        	| 19        	| sid, range                                                                                                                	|
| [serverShutdownNotice](#servershutdownnotice) 	| 20        	| countdown                                                                                                                 	|
| [addAlliance](#addaliance)           	| ac        	| {sid: clanName, owner: sidOfOwner}                                                                                        	|
| [deleteAlliance](#deletealliance)       	| ad        	| sid                                                                                                                       	|
| [allianceNotification](#alliancenotification) 	| an        	| sid, name                                                                                                                 	|
| [setPlayerTeam](#setplayerteam)        	| st        	| team, isOwner                                                                                                             	|
| [setAlliancePlayers](#setallianceplayers)   	| sa        	| sid, name, sid, name                                                                                                      	|
| [updateStoreItems](#updatestoreitems)     	| us        	| type, id, index                                                                                                           	|
| [receiveChat](#receivechat)          	| ch        	| sid, message                                                                                                              	|
| [updateMinimap](#updateminimap)        	| mm        	| x, y, x, y                                                                                                                	|
| [showText](#showtext)             	| t         	| x,y, value, type                                                                                                          	|
| [pingMap](#pingmap)              	| p         	| x,y                                                                                                                       	|
| [pingSocketResponse](#pingsocketresponse)   	| pp        	| no data                                                                                                                   	|

---

going add explanation to each packet soon.

# Packets explanation


## setInitData
Nothing much to talk about this one, it receives an object of all current teams on the server.


## disconnect

This packet gets called when there's either a server error or client error, the WS gets closed on this packet.

## setupGame

This packet gets called to show the client that your player has spawned successfully. it receives the player sid, which is used to identify the player.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1632)

## addPlayer

This packet gets called whenever a new player enters your render distances, it receives the player info, and a boolean value to check if the player is you.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2792)

## removePlayer

this packet has a SID, which is used to identify the player, and removes it from the player array

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2816)

## updatePlayers

this packet gets called every 1/3ms, if receives a chunk of data about all players in your render distances, it updates the player array with the new data.

its a chunked array with each chunk containing 13 values.

`x, y, dir, buildIndex, weaponIndex, weaponVariant, team, isLeader, skinIndex, tailIndex, iconIndex, zIndex, isVisible`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2846)

## updateLeaderboard

Works the same as updatePlayers, but for the leaderboard.

Its a chunked array with each chunk containing 3 values.

`name, score, sid`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1796)

## loadGameObject

This packet gets called whenever a new object enters your render distances, it receives the object info.

also works the same as updatePlayers, but for objects.

Its a chunked array with each chunk containing 8 values.

resource returns a number with the resource given by the object if you hit it. null = player building, 0 = wood, 1 = food, 2 = stone, 3 = gold.

`sid, x, y, dir, scale, resource, type, ownerSid`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2682)

## loadAI

works the same as AddPlayer, but for AI.

its a chunked array with each chunk containing 8 values.

`sid, type, x, y, dir, health`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2728)

## animateAI

This packet is used to start the animation of an AI, it only receives the AI sid.

targetAngle = `Math.PI * 0.8`

Its used to precisely calculate the AI's angle and coordinates.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/src/data/ai.js)

## gatherAnimation

This packet is sent whenever a player is hitting.

It is used to animate the swing animation of a player.

didHit means if the player is already hitting or not.

targetAngle = `(didHit ? -config.hitAngle : -Math.PI)`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/src/data/player.js)


## wiggleGameObject

This packet is sent to animate an object when it's being hit.

The packet has 2 values, the object sid and the dir its going to wiggle to.
```js
xWiggle += config.gatherWiggle * Math.cos(dir);
yWiggle += config.gatherWiggle * Math.sin(dir);
```

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2692)

## shootturret

Works the same as wiggleGameObject, but for turrets.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2692)

## updatePlayerValue

this packet is used to update a players resources, it receivesn the index of what to update, the value and a boolean which is used to check if the status display should be updated or not.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2831)

## updateHealth

this packet is used to calculate the health of a player. Its being sent when a player healed or got hit.

It has 2 values, the player SID and the health.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2839)

## killPlayer

this packet is being sent when you have died. No data.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1652)

## killObject

this packet is being sent when an object has been destroyed. It receives the object SID.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1681)

## killObjects

this packet is being sent when all objectes owned by a player have to be removed. It receives the player SID.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1677)

## updateItemCounts

this packet is being sent when any of your item counts have been updated (either because one of your items have been destroyed or you placed a new one)

it receives the item id and the new count of the item.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2825)

## updateAge

this packet is being sent when your xp has been updated. It receives the new xp, the maxXP of the current age and the new age.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1780)

## updateUpgrades

this packet is being sent when you upgraded your health (from 1 to 9 only).

It receives the points (amount of levels you can choose items from) and the new age you have.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1709)

## updateItems

this packet is being sent when the items in your hotbar have been updated. (when you were choosing new items)

it includes the item data of all items that have to be updated. There are 2 different types of updates.

when the second value is true, it means that its weapon data, otherwise its item data.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1224)

## addProjectile

this packet is being sent when there's a new projectile that has been created. It receives the projectile data.

`x, y, dir, range, speed, index, layer, sid`

layer is a boolean which sets if the projectile goes over buildings or not.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/src/data/projectile.js)

## remProjectile

this packet "updates" a projectile. It receives the projectile index and the new range.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2715)

## serverShutdownNotice

this packet is being sent when the server is going to shutdown. It receives the time in seconds until the server shuts down.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2928)

## addAlliance

this packet is being sent when there's a new allience to add. It receives the alliance data.

the allience data is an object with 2 values, the allience name and the SID of the player who created the alliance.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L717)

## deleteAlliance

this packet is being sent when an alliance has been deleted. It receives the alliance SID.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L738)

## allianceNotification

This packet is being sent when a player is requesting to join your alliance. IT receives the player sid and its name.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L676)

## setPlayerTeam

This packet is being sent when a you have joined an alliance. It receives the alliance name and a boolean which is true if the player is the leader of the alliance.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L723)

## setAlliancePlayers

This packet is once again a chunk of data. Each chunk is an array with 2 values, the player sid and its name.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L732)

## updateStoreItems

This packet is being sent whenever you have bought an item from the store or equipped / unequipped an item. It receives the item data.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1006)

## receiveChar

this packet is being sent when anyone in your render distance has sent a chat message. It contains one two values, the first one is the player sid and the second one is the message.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1342)

## updateMinimap

This packet is a chunk of data. Each chunk is an array with 2 values, the circle x and y position.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L937)

## showText

this packet is sent every time the animation text is being rendered. It happens when you have damaged someone or when you healed yourself.

it receives the x, y, value, and the type (which isnt used lol)

the color is being calculated like this:

`(value >= 0) ? "#fff" : "#8ecc51"`

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L1646)

## pingMap

this packet is being sent when someone has pinged the map. it includes the start x and y.

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L916)

## pingSocketResponse

this packet is the response to the [client ping packet](../client/README.md#ping-packet). it doesnt have any data

[MooMoo client source reference](https://github.com/NuroC/Moo-client-source/blob/main/app.js#L2917)

---

shit this is a lot of work, i hope this helps you out. if you have any questions, feel free to ask me on discord: Nuro#9818


