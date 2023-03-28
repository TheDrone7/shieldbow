---
title: ItemSoldEvent
description: A representation of the item sold event.
---

# ItemSoldEvent class

---

A representation of the item sold event.

**Signature:**

```ts
export declare class ItemSoldEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/timelineevent)

---

### Constructor

```ts
new ItemSoldEvent (data: ItemSoldEventData, item: Item)
```

Constructs a new instance of the `ItemSoldEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ItemSoldEventData](/api/itemsoldeventdata) | The raw data of the event. |
| item | [Item](/api/item) | The item that was sold. |
---

### Properties

#### item

The item that was sold.



**Type**: [Item](/api/item)

---

#### participantId

The ID of the participant that sold the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_SOLD'

---

