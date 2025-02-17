---
layout: project
title: Reroll Mod - 20 Minutes Till Dawn
postDate: 2025-02-08 01:08
createDate: 2022-07-20
sourceCode: https://github.com/Bitlytic/CharacterRerollMTD
published: true
---

## Unity Game Modding

This project honestly taught me more than I give it credit for. I started work on it because a youtuber I watched at the time, [sifd](https://www.youtube.com/@Sifd), mentioned offhand that he would love the ability to reroll the random character ability to make recording content easier for the game. So, I set off to do that.

<h2 id="BepInEx">BepInEx</h2>

The first thing I needed to learn was [BepInEx](https://github.com/BepInEx/BepInEx), a tool used to mod Unity games. I find it super neat, so I'm going to do a quick high level technical explanation of what BepInEx functionally does, so skip ahead to the next section if you don't really care about it.

<a href="">Click me to skip the nerd talk 🤓</a>

### C#

The first thing we gotta understand is the C# runtime. C# isn't like C++ or C, instead of being compiled directly to computer instructions run by your operating system, it's transpiled to an intermediary language which is this processed by the C# Runtime. 

This is important because it means that instead of having to modify bytecode (yuck!) we can peek inside of this transpiled language and append our own code.

Even without BepInEx, we can do this using [DnSpy](https://github.com/dnSpy/dnSpy). And unless the developer specifically uses something like IL2CPP, all Unity games by default can be edited this way.

### Automated Loading

While you can definitely make changes directly do the game using DnSpy, it'd be super impractical to share the modified DLL and expect everyone to replace that in their game folder. Alongside that, what about multiple mods? It would be practically impossible to automatically combine mods this way - enter BepInEx.

There are a few changes to how BepInEx mods are created - for example, rather than modifying the code directly, you instead choose to insert your code before, after, or completely overwrite a function. So for example, let's say that I wanted to modify the game's code to make the player twice as fast, and we know the player's class looks something like this:

```Csharp
public class Player : MonoBehaviour {

    private float m_speed;

    public void Start() {
        m_speed = 5.0f;
    }

    // Pretend there's more class here that uses m_speed
}
```


Well, the easiest way to modify this would be to hook into this class directly after the `Start()` method, and affect the member variables directly. 


<h2></h2>