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



**Type**: string

---

#### id

The unique numerical ID of this Rune Tree.



**Type**: number

---

#### key

The key of this rune tree. Usually the same as the rune's name.



**Type**: string

---

#### name

The name of this rune tree.



**Type**: string

---

#### slots

The slots of this rune tree. The slots are numbered from 1 to 4. The first slot contains the keystones.



**Type**: Collection\<number, Collection\<number, [Rune](/shieldbow/api/Rune.md)\>\>

---

