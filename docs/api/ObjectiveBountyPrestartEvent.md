---
title: ObjectiveBountyPrestartEvent
description: A representation of the objective bounty prestart event.
---

## ObjectiveBountyPrestartEvent class

A representation of the objective bounty prestart event.

**Signature:**

```ts
export declare class ObjectiveBountyPrestartEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ObjectiveBountyPrestartEvent (data: ObjectiveBountyPrestartEventData)
```

Constructs a new instance of the `ObjectiveBountyPrestartEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)iveBountyPrestartEventData |  |
---

### Properties

#### actualStartTime

The timestamp at which the objective bounty will actually start.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### teamId

The ID of the team that is going to get the objective bounty.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'OBJECTIVE_BOUNTY_PRESTART'

---

