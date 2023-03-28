---
title: ItemDestroyedEvent
description: A representation of the Item destroyed event.
---

# ItemDestroyedEvent class

---

A representation of the Item destroyed event.

**Signature:**

```ts
export declare class ItemDestroyedEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/classes/timelineevent)

---

### Constructor

```ts
new ItemDestroyedEvent (data: ItemDestroyedEventData, item: Item)
```

Constructs a new instance of the `ItemDestroyedEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ItemDestroyedEventData](/api/interfaces/itemdestroyedeventdata) | The raw data of the event. |
| item | [Item](/api/classes/item) | The destroyed item. |
---

### Properties

#### item

The destroyed item.



**Type**: [Item](/api/classes/item)

---

#### participantId

The ID of the participant that destroyed the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_DESTROYED'

---

