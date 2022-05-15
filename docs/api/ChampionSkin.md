---
title: ChampionSkin
description: A representation of a champion's skin (visual modification).
---

## ChampionSkin class

A representation of a champion's skin (visual modification).

**Signature:**

```ts
export declare class ChampionSkin 
```

---

### Constructor

```ts
new ChampionSkin (champ: Champion, data: ChampionSkinData, meraki: MerakiSkin)
```

Constructs a new instance of the `ChampionSkin` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| champ | [Champion](/api/Champion.md) | The champion this skin belongs to. |
| data | [ChampionSkinData](/api/ChampionSkinData.md) | The raw skin data from data dragon. |
| meraki | [MerakiSkin](/api/MerakiSkin.md) | The raw skin data from meraki. |
---

### Properties

#### availability

The availability of this skin - Available or Legacy.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### centeredSplashArt

The splash art for the skin zoomed in on the champion to make it centered.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### champ

The champion this skin belongs to.



**Type**: [Champion](/api/Champion.md)

---

#### chromas

The skin's chromas.



**Type**: [SkinChroma](/api/SkinChroma.md)[]

---

#### id

The numerical ID of this skin.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### internalId

The ID this skin is identified by internally (the game).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### isBase

Whether the skin is the base skin.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### loadingScreen

The loading screen image.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### lore

The lore of the champion in the world of this skin line.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name

The name of the skin displayed in game. U



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### price

The in-game price of the skin.



**Type**: [SkinPricing](/api/SkinPricing.md)

---

#### rarity

How rare is this skin - 'Epic', 'Legendary', etc.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### splashArt

The default splash art for the skin.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### vintageLoadingScreen

The loading screen image with skin border (if available).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

