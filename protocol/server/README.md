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
| [addAliance](#addaliance)           	| ac        	| {sid: clanName, owner: sidOfOwner}                                                                                        	|
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

---

## setInitData

---

## disconnect

---

## setupGame

---

## addPlayer

---

## removePlayer

---

## updatePlayers

---

## updateLeaderboard

---

## loadGameObject

---

## loadAI

---

## animateAI

---

## gatherAnimation

---

## wiggleGameObject

---

## shootTurret

---

## updatePlayerValue

---

## updateHealth

---

## killPlayer

---

## killObject

---

## killObjects

---

## updateItemCounts

---

## updateAge

---

## updateUpgrades

---

## updateItems

---

## addProjectile

---

## remProjectile

---

## serverShutdownNotice

---

## addAliance

---

## deleteAlliance

---

## allianceNotification

---

## setPlayerTeam

---

## setAlliancePlayers

---

## updateStoreItems

---

## receiveChat

---

## updateMinimap

---

## showText

---

## pingMap

---

## pingSocketResponse

