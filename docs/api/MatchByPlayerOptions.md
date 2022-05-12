---
title: MatchByPlayerOptions
description: Additional options for filtering a specific summoner's matches.
---

## MatchByPlayerOptions interface

Additional options for filtering a specific summoner's matches.

**Signature:**

```ts
export interface MatchByPlayerOptions 
```

### Properties

#### count

The maximum number of matches to return.



**Type**: number

---

#### endTime

Only return matches before the specified timestamp.



**Type**: number

---

#### queue

Only return matches with the specified queue type (numerical queue ID).



**Type**: number

---

#### start

Return the matches starting at the specified index..



**Type**: number

---

#### startTime

Only return matches after the specified timestamp.



**Type**: number

---

#### type

Only return matches with the specified game type.



**Type**: 'ranked' \| 'normal' \| 'tourney' \| 'tutorial'

---

