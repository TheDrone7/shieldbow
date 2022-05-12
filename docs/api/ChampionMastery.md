---
title: ChampionMastery
description: A representation of a summoner's mastery over a champion.
---

## ChampionMastery class

A representation of a summoner's mastery over a champion.

**Signature:**

```ts
export declare class ChampionMastery 
```

---

### Constructor

```ts
new ChampionMastery (client: Client, data: ChampionMasteryData)
```

Constructs a new instance of the `ChampionMastery` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| data | [ChampionMasteryData](/shieldbow/api/ChampionMasteryData.md) |  |
---

### Properties

#### champion

The champion these details are for.



**Type**: [Champion](/shieldbow/api/Champion.md)

---

#### chestGranted

Whether the summoner has earned the chest for this champion this season.



**Type**: boolean

---

#### lastPlayedAt

The time this summoner played the champion last time.



**Type**: Date

---

#### level

The mastery level, can be anywhere between 1 and 7.



**Type**: number

---

#### points

The total number of mastery points earned by this summoner on the champion.



**Type**: number

---

#### pointsSinceLastLevel

The number of mastery points earned by the summoner since they progressed from the previous level.



**Type**: number

---

#### pointsToNextLevel

The number of mastery points required by the summoner to achieve the next level.



**Type**: number

---

#### tokens

This is only applicable if the mastery level is 5 or 6. The number of tokens achieved for reaching the next mastery level.



**Type**: number

---

