# Outgoing packets
There are 16 outgoing packets, I will go over them one by one.

| Packet Name            	| Packet ID 	| Usage                                                 	|
|------------------------	|-----------	|-------------------------------------------------------	|
| Mouse / Space attack   	| c         	| 0/1, angle                                            	|
| Auto Attack            	| 7         	| 0/1, angle                                            	|
| Send Chat              	| ch        	| Text                                                  	|
| Clan Accept player     	| 11        	| playerSID                                             	|
| create clan            	| 8         	| ClanName                                              	|
| Clan Kick player       	| 12        	| playerSID                                             	|
| Clan send join Request 	| 10        	| ClanName                                              	|
| hat/acc_buy / equip    	| 13c       	| 1/0, hatID, 1/0                                       	|
| clan Leave             	| 13        	| 1, hatID, 1/0                                         	|
| return ping packet     	| pp        	| none                                                  	|
| hold item              	| 5         	| itemID                                                	|
| select Upgrade         	| 6         	| itemID                                                	|
| set angle              	| 2         	| angle                                                 	|
| Spawn Player           	| sp        	| {name: "playername", moofoll: true/false, skin: 0-9 } 	|
| window focus           	| rmd       	| none                                                  	|



more coming soon
