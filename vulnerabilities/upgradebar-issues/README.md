# Upgrade bar issues

This is another vulnerability in the code, which has completely changed the community.<br>
This served to create the `ws sender`, `katana musket`, `from stick to katana` hacks.

The game has client-side protection, limiting access to the impossible combinations such as: `katana & musket`, `stick -> katana`, `stick & spinning spike` and many others.
This can be easily bypassed by sending the right websocket packets at a certain age.<br>
Or another option is to replace all `pre` properties in the `weapons` and `list` array to `null`, which will unlock all possible combinations in the upgrade bar.

#### It will look like this:
<img src="https://i.imgur.com/Dh8IMFu.png" height="200"/>

#### WS sender UI
<img src="https://i.imgur.com/r2LjASU.png" height="400"/>
