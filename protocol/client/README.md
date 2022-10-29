# Outgoing packets
There are 16 outgoing packets, I will go over them one by one.

| Packet Name            	| Packet ID 	| Usage                                                 	|
|------------------------	|-----------	|-------------------------------------------------------	|
| Mouse / Space attack   	| c         	| 0/1, angle                                            	|
| Auto Attack / Lock Dir   	| 7         	| 0/1                                                   	|
| Send Chat              	| ch        	| Text                                                  	|
| Clan Accept player     	| 11        	| playerSID                                             	|
| create clan            	| 8         	| ClanName                                              	|
| Clan Kick player       	| 12        	| playerSID                                             	|
| Clan send join Request 	| 10        	| ClanName                                              	|
| hat/acc_buy / equip    	| 13c       	| 1/0, hatID, 1/0                                       	|
| clan Leave             	| 9         	| no args                                               	|
| return ping packet     	| pp        	| none                                                  	|
| hold item              	| 5         	| itemID                                                	|
| select Upgrade         	| 6         	| itemID                                                	|
| set angle              	| 2         	| angle                                                 	|
| Spawn Player           	| sp        	| {name: "playername", moofoll: true/false, skin: 0-9 } 	|
| window focus           	| rmd       	| none                                                  	|




# Explaining the packets

## Mouse / Space attack
This packet is sent on mouse down / mouse up. (space down / space up). Setting the first item to 1 starts the hit, setting it to 0 stops it. (so 1 at mousedown, 0 at mouseup). The second item is the angle of the mouse.

formula: `Math.atan2(mouseY - (screenHeight / 2), mouseX - (screenWidth / 2));`

### Auto Attack / Lock Dir

This packet is being sent when you press E / X.

setting the first item to 1 sends the auto attack, setting it to 0 sends the lock dir.
sending the same packet again will stop the effect.

### Send Chat

sends a chat message, first message is a string containing the chat message.

### Clan Accept player

sends the clan accept packet, first item is the playerSID.

### create clan

sends the create clan packet, first item is the clan name.

### Clan Kick player

sends the clan kick packet, first item is the playerSID.

### Clan send join Request

sends the clan join request packet, first item is the clan name.

### hat/acc_buy / equip

sent when you click the hat or accessory button.

first item is 0 when you want to equip a hat / accessory, 1 when you want to buy a hat / accessory. second item is the hat / accessory ID. third item is 0 when its a hat, 1 when its an accessory.

### clan Leave
sent when you want to leave a clan

### ping packet
when this packet is sent, the server will respond with a ping packet. its used to measure the ping.

### hold item
sent when you want to hold an item. first item is the item ID.

### select Upgrade
sent when you want to select an upgrade. first item is the item ID.

### set angle

sent when you want to set the angle. first item is the angle.

formula: `Math.atan2(mouseY - (screenHeight / 2), mouseX - (screenWidth / 2));`

### Spawn Player

send when you want to spawn.

first item is the name, second is the moofoll, third is the skin.

Moofoll is a boolean, true when you want 100+ resources when you spawm, false when you want 0 resources.

### window focus

sent when the window is focused. no args.


