---
title: MethodRateLimitOptions
description: The rate limit config structure for methods (options).
---

## MethodRateLimitOptions interface

The rate limit config structure for methods (options).

**Signature:**

```ts
export interface MethodRateLimitOptions 
```

### Properties

#### ACCOUNT

The rate limit config for the ACCOUNT methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in AccountMethods]: RateLimitConfig[];     }

---

#### CHAMPION_MASTERY

The rate limit config for the CHAMPION_MASTERY methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in ChampionMasteryMethods]: RateLimitConfig[];     }

---

#### CHAMPION

The rate limit config for the CHAMPION methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in ChampionMethods]: RateLimitConfig[];     }

---

#### CLASH

The rate limit config for the CLASH methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in ClashMethods]: RateLimitConfig[];     }

---

#### LEAGUE_EXP

The rate limit config for the LEAGUE_EXP methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in LeagueExpMethods]: RateLimitConfig[];     }

---

#### LEAGUE

The rate limit config for the LEAGUE methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in LeagueMethods]: RateLimitConfig[];     }

---

#### LOL_CHALLENGES

The rate limit config for the LOL_CHALLENGES methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in LolChallengesMethods]: RateLimitConfig[];     }

---

#### LOL_STATUS

The rate limit config for the LOL_STATUS methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in LolStatusMethods]: RateLimitConfig[];     }

---

#### MATCH

The rate limit config for the MATCH methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in MatchMethods]: RateLimitConfig[];     }

---

#### SPECTATOR

The rate limit config for the SPECTATOR methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in SpectatorMethods]: RateLimitConfig[];     }

---

#### SUMMONER

The rate limit config for the SUMMONER methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| {         [k in SummonerMethods]: RateLimitConfig[];     }

---

