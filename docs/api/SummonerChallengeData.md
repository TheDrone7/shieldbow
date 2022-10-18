---
title: SummonerChallengeData
description: The raw challenge data for a summoner.
---

## SummonerChallengeData interface

The raw challenge data for a summoner.

**Signature:**

```ts
export interface SummonerChallengeData 
```

### Properties

#### categoryPoints



**Type**: {         [key in CategoryName]: ChallengeCategoryData;     }

---

#### challenges



**Type**: [ChallengeProgressionData](/api/ChallengeProgressionData.md)[]

---

#### preferences



**Type**: [ChallengePreferencesData](/api/ChallengePreferencesData.md)

---

#### totalPoints



**Type**: [TotalChallengePointsData](/api/TotalChallengePointsData.md)

---

