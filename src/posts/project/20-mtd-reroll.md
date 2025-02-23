---
layout: project
title: Reroll Mod - 20 Minutes Till Dawn
postDate: 2025-02-08 01:08
createDate: 2022-07-20
sourceCode: https://github.com/Bitlytic/CharacterRerollMTD
published: true
---
<script>
    import PostHeader from "/src/components/post-header.svelte";
</script>

## Unity Game Modding

This project honestly taught me more than I give it credit for. I started work on it because a youtuber I watched at the time, [sifd](https://www.youtube.com/@Sifd), mentioned offhand that he would love the ability to reroll the random character ability to make recording content easier for the game. So, I set off to do that.

<PostHeader name="BepInEx"/>

The first thing I needed to learn was [BepInEx](https://github.com/BepInEx/BepInEx), a tool used to mod Unity games. I find it super neat, so I'm going to do a quick high level technical explanation of what BepInEx functionally does, so skip ahead to the next section if you don't really care about it.

<a class="post-link" href="">Click me to skip the super nerd talk 🤓</a>

### C#

The first thing we gotta understand is the C# runtime. C# isn't like C++ or C, instead of being compiled directly to computer instructions run by your operating system, it's transpiled to an intermediary language which is this processed by the C# Runtime. 

This is important because it means that instead of having to modify bytecode (yuck!) we can peek inside of this transpiled language and append our own code.

Even without BepInEx, we can do this using [DnSpy](https://github.com/dnSpy/dnSpy). And unless the developer specifically uses something like IL2CPP, all Unity games by default can be edited this way.

### Automated Loading

While you can definitely make changes directly do the game using DnSpy, it'd be super impractical to share the modified DLL and expect everyone to replace that in their game folder. Alongside that, what about multiple mods? It would be practically impossible to automatically combine mods this way - enter BepInEx.

There are a few changes to how BepInEx mods are created - for example, rather than modifying the code directly, you instead choose to insert your code before, after, or completely overwrite a function. So for example, let's say that I wanted to modify the game's code to make the player twice as fast, and we know the player's class looks something like this:

```Csharp
public class Player : MonoBehaviour {

    public float m_speed;

    public void Start() {
        m_speed = 5.0f;
    }

    // Pretend there's more class here that uses m_speed
}
```


Well, the easiest way to modify this would be to hook into this class directly after the `Start()` method, and affect the member variables directly. 


```Csharp
[HarmonyPatch(typeof(Player), "Start")]
[HarmonyPostfix]
static void Start(Player __instance)
{
    __instance.m_speed *= 2.0f;
}
```

Let's break that down a bit


### HarmonyPatch & HarmonyPostfix

Harmony is a helper that BepInEx uses to make it easy to patch methods before and after they're called. So, we use the `HarmonyPatch` annotation with its two arguments to specify that we want to patch into the class `Player` and we're targeting the "Start" method.

Then, `HarmonyPostfix` states that we want to add our code directly _after_ when this method is called. If we wanted to patch before the method is called, we can use `HarmonyPrefix`

Then, we're able to define `__instance` (the name is important), and this will be populated with the instance of the `Player` we're currently modifying.

<PostHeader name="Back to Regular Nerd Talk" id="nerd-talk"/>

Back to specficially this mod for 20 Minutes Till Dawn (A great game you should play if you get the chance), I wanted to give the player the option to reroll their randomly selected character ability.


So here's what I did:
```Csharp
[HarmonyPatch(typeof(PlayerController), "Start")]
[HarmonyPrefix]
static void Start(PlayerController __instance)
{
    controllerInstance = Object.FindObjectOfType<GameController>();
    characterPool = characterPoolRef(controllerInstance.powerupGenerator);
}
```


In 20 Minutes Till Dawn (actually a really well programmed game I found out), I needed two things from the game state: a `GameController` which handles what state we're in (regular gameplay, opening a chest, picking an upgrade, etc.), and the `PowerupGenerator` of the current character, which you can probably guess, contains information about the abilities of the current character.


One of the best parts about modding games, is you can get away with doing the quick and dirty option, as I'm about to show you.

```CSharp
[HarmonyPatch(typeof(PlayerController), "Update")]
[HarmonyPrefix]
static void Update(PlayerController __instance)
{
    if (controllerInstance.CurrentState is ChestState)
    {
        if (__instance.playerInput.currentActionMap.FindAction("Pause").triggered)
        {
            RerollUpgrade();
        }
    }
}
```

So, why not check every frame if we're in the chest opening state and if we've just pressed the pause button?


I would most certainly _not_ recommend writing your code like this, as there's definitely a better way to accomplish this (see: the observer pattern), but I wanted to make this mod in under 24 hours, so here's where we ended up.



<PostHeader name="Modding is Fun"/>

But that was my experience learning to mod Unity games. Overall, a very painless, fun experience. I haven't run into any Godot games I want to mod yet, but I'm hoping to learn if there's a similar workflow for patching your own code in like this.

I recommend anyone try to mod their favorite games if they can, as it's a super fun experience, can teach you new skills, and honestly, it's just fun poking around in other people's code bases while trying not to knock over their bookshelves.