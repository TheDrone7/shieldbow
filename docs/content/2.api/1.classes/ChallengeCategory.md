---
title: ChallengeCategory
description: A representation of a summoner's challenge category data.
---

# ChallengeCategory class

---

A representation of a summoner's challenge category data.

**Signature:**

```ts
export declare class ChallengeCategory 
```

---

### Constructor

```ts
new ChallengeCategory (name: CategoryName, data: ChallengeCategoryData)
```

Constructs a new instance of the `ChallengeCategory` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [CategoryName](/api/types/categoryname) |  |
| data | [ChallengeCategoryData](/api/interfaces/challengecategorydata) |  |
---

### Properties

#### current

The current progression of this summoner in this challenge category.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### max

The maximum progression of this summoner in this challenge category.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### name

The name of this challenge category.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### percentile

The percentile of this summoner in this challenge category. (0-100 %)



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tier

The tier this summoner has reached in this challenge category.



**Type**: [TierType](/api/types/tiertype)

---

