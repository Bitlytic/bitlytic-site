---
layout: video
title: Resources
link: https://www.youtube.com/embed/h5vpjCDNa-w
videoDate: 2024-12-24
published: true
---

<script>
    import PostHeader from "/src/components/post-header.svelte";
</script>

<PostHeader name="Custom Resources"/>

Ah, Custom Resource, ScriptableObject, whatever the name, it's the modern game engine's key to data driven development, a gateway to easy modification without hardcoding everything. This video was long coming, with it being one of the biggest question marks a lot of newer devs in my [Discord](https://discord.com/invite/skPc32bUfA) were asking for. 

Although I didn't cover absolutely everything I wanted to about resources and there are things I think I could've shown better, I'm very happy that there are people who have been introduced to resources through that video. 

<PostHeader name="Data Driven Development"/>

Although resources can be used for quite a large amount of things (including lots of built in nodes and effects in the godot editor), my favorite usage is creating a setup where resources are used entirely as data for systems with little input outside of defining the resources.

A basic example, and what I used in my video, is a system that automatically registers item and crafting recipes entirely using resources.

This means if I want to add a new item, all I need to do is create a new resource of type `Item`, and fill out whatever fields (name, texture, etc.) are needed. Then a recipe is just a list of crafting ingredients, which is just an item and how many of that item it needs, and an output, which is just what item and count we're outputting.

<PostHeader name="Resource Loader"/>

One of the most important autonomous parts of this system is the ability to load any recipes in without having to manually specify them anywhere.

That's where a resource loader comes in:

```gdscript
class_name CraftingRegistry

var resources : Array[CraftingRecipe]

static func _static_init() -> void:
	load_resources("res://Resources/Recipes")

static func load_resources(path: String) -> void:
	if !path.ends_with("/"):
		path += "/"
	
	var dir = DirAccess.open(path)
	if dir:
		dir.list_dir_begin()
		var file_name = dir.get_next()
		while file_name != "":
			recipes.append(load(path + file_name))
			file_name = dir.get_next()
```

I'd recommend bookmarking this one, as it's a super useful bit of code that you can utilize to load in an arbitrary amount of resources.

A couple key points I'd like to mention:
1. `_static_init()` is called at the start of the game automatically as part of Godot registering the `CraftingRegistry` class for use in the game.
2. _Technically_ this doesn't account for the possibility of files that aren't recipe .tres files in the folder so either don't do that, or adapt it to expect those.
3. It also doesn't call subdirectories recursively, but there's a way to do that by calling `dir.current_is_dir()` after `dir.get_next()` to check if we're currently looking at a directory, and passing that into a recursive call with the path.