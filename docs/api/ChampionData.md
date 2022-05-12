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



**Type**: string[]

---

#### blurb



**Type**: string

---

#### enemytips



**Type**: string[]

---

#### id



**Type**: string

---

#### image



**Type**: [ImageData](/shieldbow/api/ImageData.html)

---

#### info



**Type**: {         attack: number;         defense: number;         magic: number;         difficulty: number;     }

---

#### key



**Type**: string

---

#### lore



**Type**: string

---

#### name



**Type**: string

---

#### partype



**Type**: string

---

#### passive



**Type**: {         name: string;         description: string;         image: ImageData;     }

---

#### skins



**Type**: {         id: string;         num: number;         name: string;         chromas: boolean;     }[]

---

#### spells



**Type**: [SpellData](/shieldbow/api/SpellData.html)[]

---

#### stats



**Type**: {         hp: number;         hpperlevel: number;         mp: number;         mpperlevel: number;         movespeed: number;         armor: number;         armorperlevel: number;         spellblock: number;         spellblockperlevel: number;         attackrange: number;         hpregen: number;         hpregenperlevel: number;         mpregen: number;         mpregenperlevel: number;         crit: number;         critperlevel: number;         attackdamage: number;         attackdamageperlevel: number;         attackspeedperlevel: number;         attackspeed: number;     }

---

#### tags



**Type**: string[]

---

#### title



**Type**: string

---

