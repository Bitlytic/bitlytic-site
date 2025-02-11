---
layout: project
title: Antworks (SM64)
postDate: 2025-02-09 01:10
createDate: 2023-03-15
published: true
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



![Screenshot](/screenshots/antworks/level-dragging.gif)
#### This was actually like 2 or 3 days worth of programming effort


## Between level loading

Here was by _far_ the most annoying technical challenge I had during the competition. This might not look any different than what we saw before, but this is actually 1. dragging a fruit through a loading zone and 2. that loading zone is between two _levels_ not two _areas_

See, in SM64, there are multiple _levels_ (Bob-omb Battlefield, Whomp's Fortress, etc.) and those levels can have multiple _areas_ (Tiny Huge Island, for example, has a small and large version of the level). And in SM64, levels are completely isolated, so what you do in Tiny Huge Island won't affect the Castle Interior, aside from stars you collect.

When you load the main level, both of instructions on how to build any areas are loaded, and all information about other levels is unloaded. Unfortunately for us, this is handled in a _very_ different way than area loading. 

This means that the first time we load into a level, I need to hook into level loading and store all of the fruit information. Then, when we reload the level, I need to stop it from just spawning every fruit where it expects, and to instead sprinkle in our own fruit spawns.

And for the final piece, I need to also keep track of which of our fruits the ant is holding onto, and place it back in its hands if it's taking one between levels.


## A bit more of a technical look

Feel free to skip ahead if code scares you, but if you're an ultra nerd, I'm going to show off some of the fun code I had to use to get this to work.


## Level loading
```C
// Is level registered?
if (bhvScript == bhvAntFood && 
	!(sLevelProcessedFlags & (1 << mappedLevelNum))) {

	// Find first empty object slot
	get_next_open_slot();
	
	lastSavedObject->flags |= OBJECT_FLAG_VALID;
	// Other field assignments...

	lastSavedObject++;

	sCurrentCmd = CMD_NEXT;
	return;
}
```

SM64 uses behaviors, and here `bhvAntFood` is the catch-all object type that all food/fruit belongs to. So here, we check if we haven't been to this level yet. If we haven't, we save the information of each food object. 

The `sLevelProcessedFlags` 32 bit integer that's always persistent from the time the game is started, so we can keep track of what levels have been loaded.


```C
void update_area_spawns(void) {
    
    struct SpawnInfo* spawnInfo = gCurrentArea->objectSpawnInfos;

    spawnInfo = gCurrentArea->objectSpawnInfos;

    // Set the spawn head to the first non ant food object
    while (spawnInfo != NULL) {
        if (spawnInfo->behaviorScript == bhvAntFood) {
            spawnInfo = spawnInfo->next;
            continue;
        }
        break;
    }


    gCurrentArea->objectSpawnInfos = spawnInfo;

    // Filter out all of the spawnInfos that pertain to ant food
    while (spawnInfo != NULL) {
        struct SpawnInfo* nextSpawn = spawnInfo->next;

        // Find the next object or NULL that isn't antFood
        while (nextSpawn != NULL) {
            if (nextSpawn->behaviorScript == bhvAntFood) {
                nextSpawn = nextSpawn->next;
                continue;
            }

            break;
        }

        spawnInfo->next = nextSpawn;

        if (spawnInfo->next == NULL) {
            break;
        }
        spawnInfo = spawnInfo->next;
    }

}
```

And last, we also want to avoid spawning _any_ food objects, since we handle spawning separately, so we need to skip over any and all foods.

Not a ton to break down, but I thought this was a fun piece of code to end this little write up with.


#

\- Bity