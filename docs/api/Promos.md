---
title: Promos
description: The league entry promotion series information.
---

## Promos interface

The league entry promotion series information.

**Signature:**

```ts
export interface Promos 
```

### Properties

#### losses

The number of times the summoner lost (during this promotion series).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### progress

The summoner's promotion progression - eg: `LLWNN`.


`L` means a loss.


`W` means a win.


`N` means no data (the summoner needs to play more games).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### target

The number of wins the summoner needs to advance to the next tier.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### wins

The number of times the summoner won (during this promotion series).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

