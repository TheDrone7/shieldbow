---
title: DragonSoulGivenEvent
description: A representation of the dragon soul given event.
---

## DragonSoulGivenEvent class

A representation of the dragon soul given event.

**Signature:**

```ts
export declare class DragonSoulGivenEvent 
```

---

### Constructor

```ts
new DragonSoulGivenEvent (data: DragonSoulGivenEventData)
```

Constructs a new instance of the `DragonSoulGivenEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [DragonSoulGivenEventData](/api/DragonSoulGivenEventData.md) | The raw data of the event. |
---

### Properties

#### name

The name of the dragon soul that was earned.



**Type**: 'Mountain' \| 'Ocean' \| 'Infernal' \| 'Hextech' \| 'Cloud'

---

#### team

The team that received the dragon soul.



**Type**: "blue" \| "red"

---

#### teamId

The ID of the team that received the dragon soul.



**Type**: 100 \| 200

---

#### type

The type of the event.



**Type**: 'DRAGON_SOUL_GIVEN'

---

