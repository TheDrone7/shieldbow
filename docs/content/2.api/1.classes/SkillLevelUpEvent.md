---
title: SkillLevelUpEvent
description: A representation of the Skill Level Up event.
---

# SkillLevelUpEvent class

---

A representation of the Skill Level Up event.

**Signature:**

```ts
export declare class SkillLevelUpEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/classes/timelineevent)

---

### Constructor

```ts
new SkillLevelUpEvent (data: SkillLevelUpEventData)
```

Constructs a new instance of the `SkillLevelUpEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [SkillLevelUpEventData](/api/interfaces/skilllevelupeventdata) | The raw data of the event. |
---

### Properties

#### isUltimate

Whether the leveled up skill was the ultimate skill of the champion.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### levelUpType

The type of the level up - usually 'NORMAL'.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### participantId

The participant ID of the participant who leveled up.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### skillSlot

The skill slot that was leveled up - 1/2/3/4.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### skillSlotLetter

The skill slot that was leveled up - Q/W/E/R.



**Type**: 'Q' \| 'W' \| 'E' \| 'R'

---

#### type

The type of the event.



**Type**: 'SKILL_LEVEL_UP'

---

