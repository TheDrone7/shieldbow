---
title: ChallengeConfigData
description: The raw challenge config data.
---

## ChallengeConfigData interface

The raw challenge config data.

**Signature:**

```ts
export interface ChallengeConfigData 
```

### Properties

#### id



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### leaderboard



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### localizedNames



**Type**: [LocalizedChallengeNameData](/api/LocalizedChallengeNameData.md)

---

#### state



**Type**: 'ENABLED' \| 'DISABLED'

---

#### thresholds



**Type**: {         [key in TierType]: number;     }

---

