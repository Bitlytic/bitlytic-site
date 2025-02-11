---
layout: video
title: Composition
link: https://www.youtube.com/embed/74y6zWZfQKk
videoDate: 2023-04-26
published: true
---

## Inheritance vs Composition

The main reason this video was made is because I wanted to separate a player's ground detection from their hitbox (where things like bullets 'n stuff would hit them). Thus began a journey to break out these two detections in a clean, easy to reuse way, since having every entity implement their own health functionality was pain.


### Inheritance Problem

Speaking of health, that was also a major pain point that set me down this path.

I had a `Player` and an `Enemy` who were both a `CharacterBody2D` that had health, so I could break them out into an `Entity` class. For example, it looked something like this:


Entity.gd
```gdscript
# Entity.gd
class_name Player
```


Player.gd
```gdscript
class_name Player
extends CharacterBody2D

func _ready() -> void:
	print("Awawa")
```


## Nodes as components






### Unity

This was around the time that it finally clicked 

