---
layout: project
title: Antworks (SM64)
postDate: 2025-02-09 01:10
createDate: 2023-03-15
---

![Screenshot](/thumbnails/project/antworks.png)

## Did you say Super Mario 64?

Yeah! This is _actually_ a mod of Super Mario 64. This was (at the time of writing) the furthest from Super Mario 64 I've ever taken a romhack. 

It was created over a _week_ (9 days, technically) as part of [a romhacking competition](https://romhacking.com/competitions/4a152767-731e-4ea0-a90d-aeb2464f8f40) with Mel from Team Cornersoft, where he handled the modeling and I was assigned to the depths of coding.

As a bonus for this, we wanted the romhack to be playable on an actual Nintendo 64, and it is! It runs super well, with a few tricks to make rendering a bit easier specifically when it's on console.


## Development

I'm actually super excited to talk about this project because of the _many_ hacks and workarounds that were needed to get this hack to work. Things like moving fruits between levels, getting the movement _just_ right, and other N64 shenanigans.

Luckily for us, I actually made quite a large amount of gifs during the development of this hack, all the way from Mario being used, to the moment that I managed to get the drag mechanics down, so let's dive in!


![Screenshot](/screenshots/antworks/first-crawl.gif)
#### Woah... Mario crawl...


## Humble Beginnings

First thing's first, ants don't walk, they crawl. I didn't _need_ to make mario crawl at super speed, but for some reason that's where I started.

This ended up saving me a lot of struggle later since it was incredibly easy to adjust the crawling state to race up slopes, way easier than expected.


![Screenshot](/screenshots/antworks/ant-camera.gif)
#### He kinda looks like an ant from up here

![Screenshot](/screenshots/antworks/weird-crawling.gif)
#### Not quite right, but pretty close


## Camera

At this point, we switched the camera to an actual top down, which was honestly quite easy to do.


If you care about technicals, Lakitu has a position and a focus point. I set the focus point to always be at mario's location, and Lakitu's position is always a constant offset from that point. This offset gets lerped from two target values when you hold C-up and C-down. You can see that lerp a bit better in the next gif.


![Screenshot](/screenshots/antworks/ant-model.gif)
#### It's an uncle!


This one has _quite_ a bit of progress visually. At this point, Mel has added some nice details to the starting area, and if you ignore the floating dude we run under, this all looks quite nice.

You can also probably see the Pikmin inspiration in the design, with the small hints of human architecture scattered in the form of bricks and stuff.

<p>
	<video controls width="480">
		<source src="/screenshots/antworks/first-dragging.webm" type="video/webm" />
	</video>
</p>

#### Ignore the sudden change to webm

## Dragging Fruit (Currently a box)

And here's the first development of the main mechanic.

I haven't talked much about the goal of the game. The planned idea was to play as an ant where you need to go out and bring back food for your colony. This would be under a time limit as the day progresses to night. There would be different types of fruits that you could carry and move around, with heavy foods requiring you to drag it around, as you see above.

You can also see a _gorgeous_ water hose draped over the starting area.


![Screenshot](/screenshots/antworks/lifting-box.gif)
#### Alternative carrying mode

![Screenshot](/screenshots/antworks/area-transitions.gif)
#### You have no idea how much trouble this caused me

## The first technical challenge


This gif might not seem very impressive, and I really don't blame you, but Super Mario 64 by default does _not_ like to keep track of object positions when you switch areas.

For example, in Cool, Cool, Mountain, if you pick up the baby penguin and move it somewhere, then go into the cabin and back out, the baby penguin will be back to its spawn point. Since each object loaded takes memory, SM64 just unloads the penguin, and when you enter the area again, it just spawns it back where it started.

I had to completely sidestep this mechanic, but keeping every object loaded in memory would indeed be quite wasteful. Luckily, there's only a few different fields on objects we need to know about. Those are the X, Y, and Z positions, and the Y rotation (left/right rotation), as well as what kind of food we're tracking (strawberry, currant, etc.).

This memory then needs to be both read and written to when entering and exiting each area. Unfortunately, this took me a couple days to get right, since area loads and unloads are sometimes done in really weird ways, especially when changing levels, as we'll see later.

Luckily, it's actually quite easy to request a chunk of memory somewhere in kernel space to be held onto that we can reference whenever we want, since not all segments in memory are full in SM64. As well as that, our objects don't actually cost a _ton_ of memory. I omitted a few fields earlier, but the object memory breakdown is essentially:

###

| Field      | Memory  |
| ---------- | ------- |
| Flags      | 1 byte  |
| Level ID   | 1 byte  |
| Area ID    | 1 byte  |
| Object ID  | 2 bytes |
| Model ID   | 2 bytes |
| Position   | 6 bytes |
| Y-Rotation | 2 bytes |

###

Or just around 16 bytes per object (The keen-eyed of you may notice the numbers above add up to 15, but structs in C are 4-byte aligned, so we get an extra byte for fun).