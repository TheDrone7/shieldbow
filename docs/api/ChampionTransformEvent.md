---
title: ChampionTransformEvent
description: A representation of the champion transform event.   As of right now, this only applies to Kayn's transformations.
---

## ChampionTransformEvent class

A representation of the champion transform event.   As of right now, this only applies to Kayn's transformations.

**Signature:**

```ts
export declare class ChampionTransformEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ChampionTransformEvent (data: ChampionTransformEventData)
```

Constructs a new instance of the `ChampionTransformEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ChampionTransformEventData](/api/ChampionTransformEventData.md) | The raw data of the event. |
---

### Properties

#### participantId

The ID of the participant that transformed.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### transformType

The new form that the participant took.



**Type**: 'ASSASSIN' \| 'SLAYER'

---

#### type

The type of the event.



**Type**: 'CHAMPION_TRANSFORM'

---

