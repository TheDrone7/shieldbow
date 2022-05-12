---
title: SummonerSpell
description: A representation of an in-game summoner spell.
---

## SummonerSpell class

A representation of an in-game summoner spell.

**Signature:**

```ts
export declare class SummonerSpell 
```

---

### Constructor

```ts
new SummonerSpell (client: Client, data: SummonerSpellData)
```

Constructs a new instance of the `SummonerSpell` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client that requested this data. |
| data | [SummonerSpellData](/shieldbow/api/SummonerSpellData.md) | The raw summoner spell data from the API. |
---

### Properties

#### cooldown

The cooldown of this summoner spell (in seconds)



**Type**: number

---

#### description

The description of this summoner spell.



**Type**: string

---

#### id

The ID of this summoner spell.



**Type**: string

---

#### image

A link to the image that represents this summoner spell.



**Type**: string

---

#### key

The numerical ID of this summoner spell.



**Type**: number

---

#### maxAmmo

Number of times you can use this spell before it goes on a cooldown.



**Type**: number

---

#### modes

The game modes you can pick this summoner spell in.



**Type**: [GameMode](/shieldbow/api/GameMode.md)[]

---

#### name

The name of this summoner spell.



**Type**: string

---

#### range

The range of this spell, i.e. how many units far away can you cast this from.



**Type**: number

---

#### rawTooltip

The raw tooltip of this summoner spell. This contains some HTML-like tags to help view this better on webpages.


Even though, these are supposed to be more detailed than the [SummonerSpell.description](/shieldbow/api/SummonerSpell.md#description). It is not recommended using either this OR [SummonerSpell.tooltip](/shieldbow/api/SummonerSpell.md#tooltip). This is because they contain placeholders without values to fill them with. Use [SummonerSpell.description](/shieldbow/api/SummonerSpell.md#description) instead.


See [tooltip](/shieldbow/api/SummonerSpell.md#tooltip) to view this with the HTML-like tags stripped out.



**Type**: string

---

#### summonerLevel

The level of this summoner spell. This is the summoner level at which you unlock this spell.



**Type**: number

---

#### tooltip

The tooltip of this summoner spell. This does not contain the HTML-like tags to help view this better on console and other output media.


See [rawTooltip](/shieldbow/api/SummonerSpell.md#rawTooltip) to view this with the HTML-like tags included.



**Type**: string

---

