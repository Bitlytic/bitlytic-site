---
layout: video
title: Modular Upgrades
link: https://www.youtube.com/embed/sZDJJeDNe_M
videoDate: 2024-05-25
published: true
---

<script>
    import PostHeader from "/src/components/post-header.svelte";
</script>

<PostHeader name="Strategy Pattern"/>

First off, I need to come clean about something...

This isn't the strategy pattern. At least not how the pattern was designed.

The first example in the video actually _is_ an example of the strategy pattern, like creating a basic filter and extending it later to have multiple options. That being said, I used the pattern as a grounding point to explain how the upgrades will work, and it's a reasonable distance away from the pattern to be able to get away with sharing the name.

However, I kinda wanna use this post to talk about an alternative pattern that quite a few people have brought up in the comments and messages to me - the Decorator Pattern.

<PostHeader name="Decorator Pattern"/>

The idea behind the decorator pattern is stacking upgrades/modifications on top of the most basic version of a class.

For a quick example, we'll just toss together a sword that can be upgraded, it might not translate 100% into Godot, but it should be a good indicator for what the pattern aims to achieve.

Starting off, we'll define our sword as pretty basic, it'll have an upgrade field called `SwordUpgrade` and an attack method that uses the upgrade to calculate damage.


```GDScript
class_name Sword
extends Node2D

var upgrade : SwordUpgrade

func attack(target: Enemy) -> void:
	target.damage(upgrade.get_damage())
```

Then, we'll need to actually define how the upgrade works, starting with `SwordUpgrade`

```GDScript
class_name SwordUpgrade

func get_damage() -> float:
	return 0
```

Currently interfaces aren't in GDScript yet, but just imagine that this is a class that does nothing on its own, and classes that extend it will need to implement their own functionality.

One difference between this pattern and strategy is that the basic definition of the sword is actually stored as an "Upgrade" that gets modified

```GDScript
class_name BasicSword
extends SwordUpgrade

func get_damage() -> float:
	return 10
```

So here's our basic sword "upgrade" which just defines the base damage for the weapon. If we stopped here, we could use this in our `upgrade` field on the sword and it would work, but the magic comes from the modifier classes, or decorators.

We can create a new class, `SwordUpgradeDecorator` that extends off of `SwordUpgrade` and takes in any other "upgrade" and improves (or impairs) it. For example:

```GDScript
class_name SwordUpgradeDecorator
extends SwordUpgrade

var upgrade : SwordUpgrade

func _init(og_upgrade: SwordUpgrade):
	upgrade = og_upgrade


func get_damage() -> float:
	return upgrade.get_damage()
```

...Okay? This doesn't really seem that great yet, since right now, these two are essentially equivalent

```GDScript
upgrade = BasicSword.new()
upgrade = SwordUpgradeDecorator.new(BasicSword.new())
```

These end up calling the same `.get_damage()`, so what's the point?

Well, now we can define different decorators that modify the output damage from any other decorator or upgrade. This lets us (ideally) infinitely stack upgrades.

For example, let's create two different upgrades: one that adds 5 damage, and one that increases damage by 25%.

### flat_upgrade.gd
```GDScript
class_name FlatUpgrade
extends SwordUpgradeDecorator

func get_damage() -> float:
	return upgrade.get_damage() + 5
```

### mult_upgrade.gd
```GDScript
class_name MultUpgrade
extends SwordUpgradeDecorator

func get_damage() -> float:
	return upgrade.get_damage() * 1.25
```

Now we can effectively chain these upgrades together, like so:

```GDScript
upgrade = BasicSword.new()		# get_damage() returns 10
upgrade = FlatDamage.new(upgrade)	# get_damage() returns 15
upgrade = MultDamage.new(upgrade)	# get_damage() returns 18.75
```

It's kinda like those stacking Russian dolls where you open up the largest one and there's a slightly smaller one on the inside, all the way down until you find the smallest one. Effectively each layer is built on top of the next smallest and applies its upgrades to the output of the previous one.

Also worth noting, these upgrades can be dependent on the order they are applied in, and creating a sort of "ordering" can be quite difficult since it's set in such a recursive way, for example:

```GDScript
upgrade = BasicSword.new()		# get_damage() returns 10
upgrade = MultDamage.new(upgrade)	# get_damage() returns 12.5
upgrade = FlatDamage.new(upgrade)	# get_damage() returns 17.5
```

As you can see here, since we applied the multiplicative upgrade first, we end up losing out on 1.25 damage at the end. 

<PostHeader name="Which to use?"/>

While the decorator pattern definitely has its use cases, and can be quite fun to experiment with, I think I prefer our "strategy pattern" since it's easier to reorder and implement a priority system.

It's also kind of an age long question of recursion vs iteration, with the decorator being a recursive upgrade system where you call down the stack until you reach the bottom, and the strategy being an iterative one where you sequentially apply an upgrade along a list.