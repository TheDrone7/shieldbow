---
title: ManagersConfig
description: Managers configuration is a means to enable/disable storage/caching of the library across the different managers.
---

## ManagersConfig interface

Managers configuration is a means to enable/disable storage/caching of the library across the different managers.

**Signature:**

```ts
export interface ManagersConfig 
```

### Properties

#### api

Whether to enable cache/storage for the API (requires API key) data. Can be set to true to enable for all, or false to disable for all.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| {         account?: boolean;         challenge?: boolean;         championMastery?: boolean;         clash?: boolean;         currentGame?: boolean;         league?: boolean;         match?: boolean;         summoner?: boolean;     }

---

#### dragon

Whether to enable cache/storage for the DDragon/CDragon json data. Can be set to true to enable for all, or false to disable for all.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| {         champions?: boolean;         items?: boolean;         runes?: boolean;         summonerSpells?: boolean;     }

---

