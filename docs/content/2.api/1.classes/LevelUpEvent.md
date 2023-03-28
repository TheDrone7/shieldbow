---
title: LevelUpEvent
description: A representation of the Level up event.
---

# LevelUpEvent class

---

A representation of the Level up event.

**Signature:**

```ts
export declare class LevelUpEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/classes/timelineevent)

---

### Constructor

```ts
new LevelUpEvent (data: LevelUpEventData)
```

Constructs a new instance of the `LevelUpEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [LevelUpEventData](/api/interfaces/levelupeventdata) | The raw data of the event. |
---

### Properties

#### level

The level the participant reached.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### participantId

The ID of the participant who leveled up.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'LEVEL_UP'

---

