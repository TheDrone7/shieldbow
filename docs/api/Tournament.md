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
| data | [TournamentData](/shieldbow/api/TournamentData.html) |  |
---

### Properties

#### id

The ID of the tournament.



**Type**: number

---

#### schedule

The tournament's schedule.



**Type**: [TournamentSchedule](/shieldbow/api/TournamentSchedule.html)[]

---

#### subtitle

The description (day) of the tournament.



**Type**: string

---

#### themeId

The ID of the theme of the tournament.



**Type**: number

---

#### title

The name (title) of the tournament.



**Type**: string

---

