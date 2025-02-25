---
layout: video
title: Animation Trees
link: https://www.youtube.com/embed/iElHZhOxGYA
videoDate: 2024-09-17
published: true
---
<script>
    import PostHeader from "/src/components/post-header.svelte";
</script>

## Why Trees?

This started when I was writing my umpteenth animation component and asked myself, "surely there has to be a better way to do this than hardcoding animation names?"

As I'm sure some of you are aware, these animation components can be _very_ repetitive and gross to touch, for example:

```GDScript
var last_facing_direction := Vector2(0, 1)

func _physics_process(delta: float) -> void:
	var velocity = player.velocity
	
	if velocity:
		last_facing_direction = velocity.normalized()
	
	var anim_direction : String
	
	if last_facing_direction.x > 0:
		anim_direction = "right"
	elif last_facing_direction.x < 0:
		anim_direction = "left"
	elif last_facing_direction.y > 0:
		anim_direction = "down"
	elif last_facing_direction.y < 0:
		anim_direction = "up"
	
	if velocity:
		animation_player.play("run_" + anim_direction)
	elif player.attacking:
		animation_player.play("attack_" + anim_direction)
	else:
		animation_player.play("idle_" + anim_direction)
```

Ew.

First, we determine our direction string by checking the x and y of the `last_facing_direction`, and assign it to values like "up" and "left". Then, we check our state specific variables, in this case `velocity` and `attacking`, and play the animation through constructing strings like "run_left" and "attack_down".

So gross.

Not only is this disgusting to read, it's repetitive, and annoying to expand. It also _requires_ that each animation state has all four directions, and the animation names _need_ to have a specific naming convention. Oh, and don't ask me the amount of times I've mistyped "run_" and ended up flooding my console with errors.

It was time for a change.


<PostHeader name="Time for Trees"/>

What if there was a nice, less error-prone way to break your animation into separate states that can automatically switch between each other?

![Screenshot](/screenshots/animation-tree/states.png)
#### woah... animation states...

Oh look at that, there is.

That's the main reason I switched to using AnimationTrees - you can define these states and ultimately it doesn't really matter how many animations are inside of them, or what the animations are called. You could even have one of these states just be a single animation if you wanted.

Alongside this, one of my favorite parts of the animation tree is how you can route a state machine through other processing. For example, if I want to globally slow all of the animations in a tree down, I can do that by running it through a TimeScale node:


![Screenshot](/screenshots/animation-tree/time_scale.png)


<PostHeader name="The Repetition Issue"/>


The only gripe I have with these trees is that for those states I showed earlier, they all have their own blend spaces. This means that even though I'd like all of them to reflect the direction the player is going in, I have to set all of them manually. This results in some gross duplicated code, but I'd still rather write this duplicated mess than another manual animation component.

```GDScript
animation_tree.set("parameters/PlayerStates/Run/blend_position", last_facing_direction)
animation_tree.set("parameters/PlayerStates/Idle/blend_position", last_facing_direction)
animation_tree.set("parameters/PlayerStates/Attack/blend_position", last_facing_direction)

animation_tree.set("parameters/TimeScale/scale", 1.0)
```

Who knows? Maybe one day I'll get fed up enough and make that change to the source code directly to free us from our repetitive shackes.