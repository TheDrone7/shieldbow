---
title: ChampionData
description: A representation of the champion data returned by Data Dragon.
---

## ChampionData interface

A representation of the champion data returned by Data Dragon.

**Signature:**

```ts
export interface ChampionData 
```

### Properties

#### allytips



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

#### blurb



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### enemytips



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

#### id



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### image



**Type**: ImageData

---

#### info



**Type**: [ChampionRating](/api/championrating)

---

#### key



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### lore



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### partype



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### passive



**Type**: {         name: string;         description: string;         image: ImageData;     }

---

#### skins



**Type**: [ChampionSkinData](/api/championskindata)[]

---

#### spells



**Type**: [SpellData](/api/spelldata)[]

---

#### stats



**Type**: {         hp: number;         hpperlevel: number;         mp: number;         mpperlevel: number;         movespeed: number;         armor: number;         armorperlevel: number;         spellblock: number;         spellblockperlevel: number;         attackrange: number;         hpregen: number;         hpregenperlevel: number;         mpregen: number;         mpregenperlevel: number;         crit: number;         critperlevel: number;         attackdamage: number;         attackdamageperlevel: number;         attackspeedperlevel: number;         attackspeed: number;     }

---

#### tags



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

#### title



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

