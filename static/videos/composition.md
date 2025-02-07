## Inheritance vs Composition

### Inheritance

Inheritance is how we're all taught to think about programming in school. 

For example, let's have an `Entity` class with a `health`field. An `Enemy` is an `Entity`, the `Player` is an `Entity` and so on. 

We add combat to our game, so both the `Player` and `Enemy` can attack, so we'll give them a `target` field. (Pretend that `health` and `target` have more complex underlying implementations)

All's well and good until we decide that we want a tree to be able to take damage. Well, we don't want to rewrite the health implementation, so we'll just have `Tree` extend `Entity`, and just not use any of the `target` stuff, right?

While I'm sure this works, this ends up causing anything that extends `Entity` to hold on to any baggage that belongs to the class as a whole. We could create an in between class called `CombatEntity` or something that separates fields out, but maybe there's another way to describe this object that isn't stacking classes on top of each other.


### Composition

We can start with an `Entity` class, that's all well and good since we can define common properties that will _always_ be present, like `position` so we know where the `Entity` is in the world.

But instead of creating a hierarchy of classes and functionality built on top of this, we can define a separate class just called `Health`. This class will contain any implementation for whatever our health system needs (taking damage, the entity dying, etc.)

Then, our `Enemy` class can extends `Entity` and simply pull in the functionality from `Health`. Traditionally you would do this by tacking a field on the `Enemy` using the `Health` class, but specifically in Godot we can attach these functionalities either as a Node or, in the future, Traits (Stay tuned for a blog about that magical feature).