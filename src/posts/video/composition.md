---
layout: video
title: Composition
link: https://www.youtube.com/embed/74y6zWZfQKk
videoDate: 2023-04-26
published: true
---
<script>
    import PostHeader from "/src/components/post-header.svelte";
</script>

<PostHeader name="Inheritance vs Composition"/>

The main reason this video was made is because I wanted to separate a player's ground detection from their hitbox (where things like bullets 'n stuff would hit them). Thus began a journey to break out these two detections in a clean, easy to reuse way, since having every entity implement their own health functionality was pain.


### Inheritance Problem

Speaking of health, that was also a major pain point that set me down this path.

I had a `Player` and an `Enemy` who were both a `CharacterBody2D` that had health, so I could break them out into an `Entity` class. For example, it looked something like this:


Entity.gd
```gdscript
# Entity.gd
class_name Entity
extends CharacterBody2D

var health := 10.0

func damage(amount: float) -> void:
	health -= amount
	if health <= 0:
	queue_free()
```

Player.gd
```gdscript
class_name Player
extends Entity
```

Enemy.gd
```gdscript
class_name Enemy
extends Entity
```

If you're making a super simple game, or just learning the engine, this is probably how the classes are set up. And if nothing changes, this is perfectly fine.

However, things do change, and I want a `Tree` object that can be attacked and has health.

Unfortunately, our current setup almost immediately breaks under this, since we don't have access to multiple inheritance. If we want to continue using this health implementation in `Entity`, then we are forced to make our `Tree` into a `CharacterBody2D` to satisfy the inheritance hierarchy.

While this might be inconvenient at worst, ideally functionality like this shouldn't be tied to a specific node type. So what if we had a system where something can have health regardless of if it's a `CharacterBody2D`, `StaticBody2D`, or even a 3D Node.


<PostHeader name="Nodes as Components"/>

Well, we need ways to dynamically add functionality to an object, despite its base class. Since we're in Godot, we can just tack on this functionality through auxiliary nodes!

I won't get into the super technical side of things because there are a ton of ways you can do this (Metadata, raw fields through `Node.set()`, etc.), but the basic idea is to create a node or resource that contains isolated functionality. For example, a health node:

Health.gd
```gdscript
class_name Health
extends Node

signal died()

var health := 10.0

func damage(amount: float) -> void:
	health -= amount:
	if health <= 0:
		died.emit()
```

This class does one thing: handles a unit's health. It doesn't decidewhen a unit takes damage, nor what happens when it dies. It just lets other parts interact with the health as a system, and decide both when and what happens when a unit takes damage.


This lets us tack this node onto _anything_ that we want to have health functionality, and it just works™ (if the other systems are in place that allow other classes to interact with this one).

I started using this system because I was inspired by [a blog by Alyce/CthulhuCodesGames](https://alyceosbourne.github.io/godot_blog/2024/08/13/Self-Binding-Components.html) where she takes things a bit further by registering signals in the parent to interact with these components.

<PostHeader name="Metadata"/>

One way that I've been using this recently is through metadata (`Node.set_meta()` and `Node.get_meta()`) which allow a component to register itself to its parent and creates a way for other components to interact it.

For example, let's say our health component registers itself via:

Health.gd
```gdscript
func _ready() -> void:
	get_parent().set_meta("health", self)
```

We can then have other classes, perhaps a hitbox, or something else that needs to interact with health access that component via meta:

Hitbox.gd
```gdscript
# Attack is an object passed in by whatever hit this unit
func hit(attack: Attack) -> void:

	# This will be null if there is no Health present
	var health : Health = get_parent().get_meta("health") as Health
	if !health:
		return
	
	health.damage(attack.damage)
```

This gives us a clean, mostly decoupled way of interacting with the health system from the outside.


<PostHeader name="Unity"/>


This was around the time that something finally clicked for me... This is just Unity's `GetComponent<>()` methods but homebrewed in Godot... Oops.

There are a few nice changes though, since components are expressed as a `Node`, they can interact with the world as their own separate entity and also don't have to be directly attached to the parent.