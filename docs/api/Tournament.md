---
title: Tournament
description: A representation of a clash tournament.
---

## Tournament class

A representation of a clash tournament.

**Signature:**

```ts
export declare class Tournament 
```

---

### Constructor

```ts
new Tournament (data: TournamentData)
```

Constructs a new instance of the `Tournament` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TournamentData](/shieldbow/api/TournamentData.md) | The raw tournament data from the API. |
---

### Properties

#### id

The ID of the tournament.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### schedule

The tournament's schedule.



**Type**: [TournamentSchedule](/shieldbow/api/TournamentSchedule.md)[]

---

#### subtitle

The description (day) of the tournament.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### themeId

The ID of the theme of the tournament.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### title

The name (title) of the tournament.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

