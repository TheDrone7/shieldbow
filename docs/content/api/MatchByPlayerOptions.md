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



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### endTime

Only return matches before the specified timestamp.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### queue

Only return matches with the specified queue type (numerical queue ID).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### start

Return the matches starting at the specified index..



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### startTime

Only return matches after the specified timestamp.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

Only return matches with the specified game type.



**Type**: 'ranked' \| 'normal' \| 'tourney' \| 'tutorial'

---

