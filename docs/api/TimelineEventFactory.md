---
title: TimelineEventFactory
description: The timeline event factory - to create a timeline event from a raw data object.
---

## TimelineEventFactory class

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
static create(client: Client, data: TimelineEventData): TimelineEvent;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that fetched the event. |
| data | [TimelineEventData](/api/TimelineEventData.md) | The raw data. |

**Return type**: [TimelineEvent](/api/TimelineEvent.md)

---

