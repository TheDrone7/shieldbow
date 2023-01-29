---
title: AccountManager
description: An account manager - to fetch and manage all the RIOT accounts.   Requires API key with access to `account-v1` API.
---

## AccountManager class

An account manager - to fetch and manage all the RIOT accounts.   Requires API key with access to `account-v1` API.

**Signature:**

```ts
export declare class AccountManager implements BaseManager<Account> 
```

Implements: BaseManager&lt;Account&gt;

**References:** [BaseManager](/api/BaseManager.md), [Account](/api/Account.md)

---

### Constructor

```ts
new AccountManager (client: Client)
```

Constructs a new instance of the `AccountManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this account manager belongs to. |
---

### Properties

#### client

The client this account manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch ()

Fetch a RIOT account by its unique PUUID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Account>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The PUUID of the RIOT account. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Account](/api/Account.md) \>

---

#### .fetchByNameAndTag ()

Fetch a RIOT account by its name and tag.




**Signature:**

```ts
fetchByNameAndTag(name: string, tag: string, options?: FetchOptions): Promise<Account>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of this RIOT account. |
| tag | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The tag of this RIOT account. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Account](/api/Account.md) \>

---

