---
title: Account
description: A representation of a RIOT account.
---

## Account class

A representation of a RIOT account.

**Signature:**

```ts
export declare class Account 
```

---

### Constructor

```ts
new Account (data: AccountData)
```

Constructs a new instance of the `Account` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [AccountData](/shieldbow/api/AccountData.md) | The raw account data from the API. |
---

### Properties

#### identifier

The username#tag format of user's RIOT account.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### playerId

The unique ID for this account. This is also called the PUUID.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### username

The RIOT account username of this user.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### userTag

The RIOT account tag of this user.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

