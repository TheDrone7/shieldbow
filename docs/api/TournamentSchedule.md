---
title: TournamentSchedule
description: A representation of a clash tournament schedule.
---

## TournamentSchedule class

A representation of a clash tournament schedule.

**Signature:**

```ts
export declare class TournamentSchedule 
```

---

### Constructor

```ts
new TournamentSchedule (data: TournamentScheduleData)
```

Constructs a new instance of the `TournamentSchedule` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TournamentScheduleData](/shieldbow/api/TournamentScheduleData.html) |  |
---

### Properties

#### cancelled

Whether the events as per this schedule have been cancelled.



**Type**: boolean

---

#### id

The ID of the tournament schedule.



**Type**: number

---

#### registrationTime

The time at which the registration begins.



**Type**: Date

---

#### registrationTimestamp

The timestamp at which the registration begins.



**Type**: number

---

#### startTime

The time at which the tournament begins.



**Type**: Date

---

#### startTimestamp

The timestamp at which the tournament begins.



**Type**: number

---

