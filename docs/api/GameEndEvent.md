---
title: GameEndEvent
description: A representation of the game end event.
---

## GameEndEvent class

A representation of the game end event.

**Signature:**

```ts
export declare class GameEndEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new GameEndEvent (data: GameEndEventData)
```

Constructs a new instance of the `GameEndEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [GameEndEventData](/api/GameEndEventData.md) | The raw data of the event. |
---

### Properties

#### gameId

The ID of the game.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### realTime

The real time at which the game ended.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

#### realTimestamp

The real world timestamp at which the game ended.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'GAME_END'

---

#### winningTeam

The winning team.



**Type**: "red" \| "blue"

---

#### winningTeamId

The ID of the winning team.



**Type**: 100 \| 200

---

