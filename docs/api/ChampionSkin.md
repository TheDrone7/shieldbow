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
| champ | [Champion](/shieldbow/api/Champion.md) | The champion this skin belongs to. |
| data | [ChampionSkinData](/shieldbow/api/ChampionSkinData.md) | The raw skin data from data dragon. |
| meraki | [MerakiSkin](/shieldbow/api/MerakiSkin.md) | The raw skin data from meraki. |
---

### Properties

#### availability

The availability of this skin - Available or Legacy.



**Type**: string

---

#### centeredSplashArt

The splash art for the skin zoomed in on the champion to make it centered.



**Type**: string

---

#### champ

The champion this skin belongs to.



**Type**: [Champion](/shieldbow/api/Champion.md)

---

#### chromas

The skin's chromas.



**Type**: [SkinChroma](/shieldbow/api/SkinChroma.md)[]

---

#### id

The numerical ID of this skin.



**Type**: number

---

#### internalId

The ID this skin is identified by internally (the game).



**Type**: string

---

#### isBase

Whether the skin is the base skin.



**Type**: boolean

---

#### loadingScreen

The loading screen image.



**Type**: string

---

#### lore

The lore of the champion in the world of this skin line.



**Type**: string

---

#### name

The name of the skin displayed in game. U



**Type**: string

---

#### price

The in-game price of the skin.



**Type**: [SkinPricing](/shieldbow/api/SkinPricing.md)

---

#### rarity

How rare is this skin - 'Epic', 'Legendary', etc.



**Type**: string

---

#### splashArt

The default splash art for the skin.



**Type**: string

---

#### vintageLoadingScreen

The loading screen image with skin border (if available).



**Type**: string

---

