## 360-Hit exploit

The exploit happens due to moomoo.io player angle system.

## Reproducing

To use this exploit, you need to send "2" packet, which tells the server about your player's angle with data that is higher than π * 2.

## How does it work?

If the angle is more than π * 2, The result will be weird.

Angle of player can be bigger than π * 2, then server divides N / 6.28

Let's look at canvas rotate rendering system.
Draw a simple square and rotate it with angle 0 in radians:

```js
ctx.rotate(0);
```

We have a square that is rotated with angle 0 radians.
Now, try picking a number like 2000000004.

```js
ctx.rotate(2e7+4);
```

It will make shape rotate with almost same angle!

It means, players see your old angle, but server sees it different.

When you rotate a shape with angle that's >π*2, it rotates the shape N times.

If we rotate the shape with (π*2) + π / 2 angle, it will rotate 2 times.

Which means, players will see instead of normal angle, spinning hammer.

## How does server see it?

You're rotating in one server updates, so it can't count properly your angle and just huts everything.

## Examples 

Let's do a simple 360 hit for your mod.
I'll use Moo Moo API for this purpose.

```js

MooMoo.sendPacket("2", 90**100);

```

Player will rotate (90**100) / (π * 2)

## Conclusion

Moo moo is weird.
