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



**Type**: [ChallengeProgressionData](/api/interfaces/challengeprogressiondata)[]

---

#### preferences



**Type**: [ChallengePreferencesData](/api/interfaces/challengepreferencesdata)

---

#### totalPoints



**Type**: [TotalChallengePointsData](/api/interfaces/totalchallengepointsdata)

---

