---
title: ItemPurchasedEvent
description: A representation of the Item Purchased event.
---

## ItemPurchasedEvent class

A representation of the Item Purchased event.

**Signature:**

```ts
export declare class ItemPurchasedEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ItemPurchasedEvent (client: Client, data: ItemPurchasedEventData)
```

Constructs a new instance of the `ItemPurchasedEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) |  |
| data | [ItemPurchasedEventData](/api/ItemPurchasedEventData.md) |  |
---

### Properties

#### item

The item that was purchased.



**Type**: [Item](/api/Item.md)

---

#### participantId

The participant who purchased the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_PURCHASED'

---

