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



**Type**: [ChallengeProgressionData](/api/challengeprogressiondata)[]

---

#### preferences



**Type**: [ChallengePreferencesData](/api/challengepreferencesdata)

---

#### totalPoints



**Type**: [TotalChallengePointsData](/api/totalchallengepointsdata)

---

