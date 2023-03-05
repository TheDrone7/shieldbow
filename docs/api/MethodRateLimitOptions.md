---
title: MethodRateLimitOptions
description: 
---

## MethodRateLimitOptions interface



**Signature:**

```ts
export interface MethodRateLimitOptions 
```

### Properties

#### ACCOUNT



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in AccountMethods]: RateLimitConfig[];     }

---

#### CHAMPION_MASTERY



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in ChampionMasteryMethods]: RateLimitConfig[];     }

---

#### CHAMPION



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in ChampionMethods]: RateLimitConfig[];     }

---

#### CLASH



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in ClashMethods]: RateLimitConfig[];     }

---

#### LEAGUE_EXP



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in LeagueExpMethods]: RateLimitConfig[];     }

---

#### LEAGUE



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in LeagueMethods]: RateLimitConfig[];     }

---

#### LOL_CHALLENGES



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in LolChallengesMethods]: RateLimitConfig[];     }

---

#### LOL_STATUS



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in LolStatusMethods]: RateLimitConfig[];     }

---

#### MATCH



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in MatchMethods]: RateLimitConfig[];     }

---

#### SPECTATOR



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in SpectatorMethods]: RateLimitConfig[];     }

---

#### SUMMONER



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| {         [k in SummonerMethods]: RateLimitConfig[];     }

---

