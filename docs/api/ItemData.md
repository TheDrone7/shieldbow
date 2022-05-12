---
title: ItemData
description: A representation of the item data returned by Data Dragon.
---

## ItemData interface

A representation of the item data returned by Data Dragon.

**Signature:**

```ts
export interface ItemData 
```

### Properties

#### consumed



**Type**: boolean

---

#### consumeOnFull



**Type**: boolean

---

#### depth



**Type**: number

---

#### description



**Type**: string

---

#### from



**Type**: string[]

---

#### gold



**Type**: {         base: number;         purchasable: boolean;         total: number;         sell: number;     }

---

#### hideFromAll



**Type**: boolean

---

#### image



**Type**: [ImageData](/shieldbow/api/ImageData.html)

---

#### inStore



**Type**: boolean

---

#### into



**Type**: string[]

---

#### maps



**Type**: {         [key: string]: boolean;     }

---

#### name



**Type**: string

---

#### plaintext



**Type**: string

---

#### requiredChampion



**Type**: string

---

#### specialRecipe



**Type**: number

---

#### stacks



**Type**: number

---

#### stats



**Type**: {         [key: string]: number;     }

---

#### tags



**Type**: string[]

---

