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

Implements: BaseManager&lt;SummonerSpell&gt;

**References:** [BaseManager](/api/BaseManager.md), [SummonerSpell](/api/SummonerSpell.md)

---

### Constructor

```ts
new SummonerSpellManager (client: Client)
```

Constructs a new instance of the `SummonerSpellManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this summoner spell manager belongs to. |
---

### Properties

#### client

The client this summoner spell manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch ()

Fetch a spell by its ID. The ID is usually something like Summoner\{Spell\} For example, for the spell `Flash`, the ID is `SummonerFlash`. But there are a lot of exceptions to this, so it is recommended to use [fetchByName](/api/SummonerSpellManager.md#fetchbyname) instead.




**Signature:**

```ts
fetch(key: string, options?: FetchOptions): Promise<SummonerSpell>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the spell to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [SummonerSpell](/api/SummonerSpell.md) \>

---

#### .fetchAll ()

Fetch all summoner spells.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<string, SummonerSpell>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [SummonerSpell](/api/SummonerSpell.md) \> \>

---

#### .fetchByName ()

Fetch a spell by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
fetchByName(name: string, options?: FetchOptions): Promise<SummonerSpell | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the spell to look for. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [SummonerSpell](/api/SummonerSpell.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

