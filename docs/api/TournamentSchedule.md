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
| data | [TournamentScheduleData](/api/TournamentScheduleData.md) | The raw tournament schedule data from the API. |
---

### Properties

#### cancelled

Whether the events as per this schedule have been cancelled.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### id

The ID of the tournament schedule.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### registrationTime

The time at which the registration begins.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

#### registrationTimestamp

The timestamp at which the registration begins.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### startTime

The time at which the tournament begins.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

#### startTimestamp

The timestamp at which the tournament begins.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

