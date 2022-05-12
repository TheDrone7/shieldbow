---
title: RuneTree
description: A representation of an in-game rune tree
---

## RuneTree class

A representation of an in-game rune tree

**Signature:**

```ts
export declare class RuneTree 
```

---

### Constructor

```ts
new RuneTree (client: Client, data: RuneTreeData)
```

Constructs a new instance of the `RuneTree` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client that requested this data. |
| data | [RuneTreeData](/shieldbow/api/RuneTreeData.md) | The raw rune tree data from data dragon. |
---

### Properties

#### icon

A link to the rune tree's icon.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### id

The unique numerical ID of this Rune Tree.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### key

The key of this rune tree. Usually the same as the rune's name.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name

The name of this rune tree.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### slots

The slots of this rune tree. The slots are numbered from 1 to 4. The first slot contains the keystones.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Rune](/shieldbow/api/Rune.md) \> \>

---

