---
title: ChallengePreferences
description: A representation of a summoner's challenge preferences data.
---

# ChallengePreferences class

---

A representation of a summoner's challenge preferences data.

**Signature:**

```ts
export declare class ChallengePreferences 
```

---

### Constructor

```ts
new ChallengePreferences (client: Client, data: ChallengePreferencesData)
```

Constructs a new instance of the `ChallengePreferences` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) |  |
| data | [ChallengePreferencesData](/api/interfaces/challengepreferencesdata) |  |
---

### Properties

#### bannerAccent

The banner accent of this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### crestBorder

Type of the border the summoner has currently selected.



**Type**: 'level' \| 'ranked'

---

#### displayedChallengeIds

The IDs of the challenges this summoner has put on display.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[]

---

#### prestigeCrestBorderLevel

The level at which summoner unlocked currently equipped level border.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### title

The title of this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

### Methods

#### .fetchDisplayedChallenges ()

The challenges that this summoner has put on display.



**Signature:**

```ts
fetchDisplayedChallenges(): Promise<Challenge[]>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Challenge](/api/classes/challenge)[] \>

---

