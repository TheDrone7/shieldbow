---
title: TimelineEventFactory
description: The timeline event factory - to create a timeline event from a raw data object.
---

# TimelineEventFactory class

---

The timeline event factory - to create a timeline event from a raw data object.

**Signature:**

```ts
export declare class TimelineEventFactory 
```

---

### Methods

#### .create ()

Creates a timeline event from the given data.




**Signature:**

```ts
static create(data: TimelineEventData, items: Collection<string, Item>): TimelineEvent;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TimelineEventData](/api/timelineeventdata) | The raw data. |
| items | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/item) \> | A collection of all items. |

**Return type**: [TimelineEvent](/api/timelineevent)

---

