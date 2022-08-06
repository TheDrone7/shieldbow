---
title: ItemUndoEvent
description: A representation of the Item Undo event.
---

## ItemUndoEvent class

A representation of the Item Undo event.

**Signature:**

```ts
export declare class ItemUndoEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ItemUndoEvent (client: Client, data: ItemUndoEventData)
```

Constructs a new instance of the `ItemUndoEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) |  |
| data | [ItemUndoEventData](/api/ItemUndoEventData.md) |  |
---

### Properties

#### after

The item in the item slot after the undo.



**Type**: [Item](/api/Item.md)

---

#### before

The item in the item slot before the undo.



**Type**: [Item](/api/Item.md)

---

#### goldGain

The amount of gold that was gained by the undo.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### participantId

The participant who undid the item.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'ITEM_UNDO'

---

