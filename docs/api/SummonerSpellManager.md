---
title: SummonerSpellManager
description: A spell manager - to fetch and manage all summoner spell data.
---

## SummonerSpellManager class

A spell manager - to fetch and manage all summoner spell data.

**Signature:**

```ts
export declare class SummonerSpellManager implements BaseManager<SummonerSpell> 
```

Implements: [BaseManager](/shieldbow/api/BaseManager.html)<[SummonerSpell](/shieldbow/api/SummonerSpell.html)>

**References:** [BaseManager](/shieldbow/api/BaseManager.html), [SummonerSpell](/shieldbow/api/SummonerSpell.html)

---

### Constructor

```ts
new SummonerSpellManager (client: Client, cacheSettings: {
        enable: boolean;
        root: string;
    })
```

Constructs a new instance of the `SummonerSpellManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| cacheSettings | {         enable: boolean;         root: string;     } |  |
---

### Properties

#### cache

A collection of the summoner spells cached in the memory.



**Type**: Collection\<string, [SummonerSpell](/shieldbow/api/SummonerSpell.html)\>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.html)

---

### Methods

#### .fetch (key, options)

Fetch a spell by its ID. The ID is usually something like Summoner\{Spell\} For example, for the spell `Flash`, the ID is `SummonerFlash`. But there are a lot of exceptions to this, so it is recommended to use [findByName](/shieldbow/api/SummonerSpellManager.html#findByName) instead.




**Signature:**

```ts
fetch(key: string, options?: {
        force: boolean;
    }): Promise<SummonerSpell>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | string | The ID of the spell to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[SummonerSpell](/shieldbow/api/SummonerSpell.html)\>

---

#### .findByName (name)

Find a spell by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
findByName(name: string): Promise<SummonerSpell | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | The name of the spell to look for. |

**Return type**: Promise\<[SummonerSpell](/shieldbow/api/SummonerSpell.html) \| undefined\>

---

