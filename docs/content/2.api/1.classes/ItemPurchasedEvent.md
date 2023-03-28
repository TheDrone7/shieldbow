---
title: ItemPurchasedEvent
description: A representation of the Item Purchased event.
---

# ItemPurchasedEvent class

---

A representation of the Item Purchased event.

**Signature:**

```ts
export declare class ItemPurchasedEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/classes/timelineevent)

---

### Constructor

```ts
new ItemPurchasedEvent (data: ItemPurchasedEventData, item: Item)
```

Constructs a new instance of the `ItemPurchasedEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ItemPurchasedEventData](/api/interfaces/itempurchasedeventdata) | The raw data of the event. |
| item | [Item](/api/classes/item) | The item that was purchased. |
---

### Properties

#### item

The item that was purchased.



**Type**: [Item](/api/classes/item)

---

#### participantId

The participant who purchased the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_PURCHASED'

---

