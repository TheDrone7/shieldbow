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
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [SummonerSpellData](/api/SummonerSpellData.md) | The raw summoner spell data from the API. |
---

### Properties

#### cooldown

The cooldown of this summoner spell (in seconds)



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### description

The description of this summoner spell.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### id

The ID of this summoner spell.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### image

A link to the image that represents this summoner spell.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### key

The numerical ID of this summoner spell.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### maxAmmo

Number of times you can use this spell before it goes on a cooldown.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### modes

The game modes you can pick this summoner spell in.



**Type**: [GameMode](/api/GameMode.md)[]

---

#### name

The name of this summoner spell.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### range

The range of this spell, i.e. how many units far away can you cast this from.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### rawTooltip

The raw tooltip of this summoner spell. This contains some HTML-like tags to help view this better on webpages.


Even though, these are supposed to be more detailed than the [SummonerSpell.description](/api/SummonerSpell.md#description). It is not recommended using either this OR [SummonerSpell.tooltip](/api/SummonerSpell.md#tooltip). This is because they contain placeholders without values to fill them with. Use [SummonerSpell.description](/api/SummonerSpell.md#description) instead.


See [tooltip](/api/SummonerSpell.md#tooltip) to view this with the HTML-like tags stripped out.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### summonerLevel

The level of this summoner spell. This is the summoner level at which you unlock this spell.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tooltip

The tooltip of this summoner spell. This does not contain the HTML-like tags to help view this better on console and other output media.


See [rawTooltip](/api/SummonerSpell.md#rawTooltip) to view this with the HTML-like tags included.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

