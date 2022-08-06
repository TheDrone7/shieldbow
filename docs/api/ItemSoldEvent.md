---
title: ItemSoldEvent
description: A representation of the item sold event.
---

## ItemSoldEvent class

A representation of the item sold event.

**Signature:**

```ts
export declare class ItemSoldEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ItemSoldEvent (client: Client, data: ItemSoldEventData)
```

Constructs a new instance of the `ItemSoldEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that fetched the match. |
| data | [ItemSoldEventData](/api/ItemSoldEventData.md) | The raw data of the event. |
---

### Properties

#### item

The item that was sold.



**Type**: [Item](/api/Item.md)

---

#### participantId

The ID of the participant that sold the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_SOLD'

---

