---
title: AccountManager
description: An account manager - to fetch and manage all the RIOT accounts.
---

## AccountManager class

An account manager - to fetch and manage all the RIOT accounts.

**Signature:**

```ts
export declare class AccountManager implements BaseManager<Account> 
```

Implements: [BaseManager](/shieldbow/api/BaseManager.html)<[Account](/shieldbow/api/Account.html)>

**References:** [BaseManager](/shieldbow/api/BaseManager.html), [Account](/shieldbow/api/Account.html)

---

### Constructor

```ts
new AccountManager (client: Client)
```

Constructs a new instance of the `AccountManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
---

### Properties

#### cache

The accounts cached in the memory.



**Type**: Collection\<string, [Account](/shieldbow/api/Account.html)\>

---

#### client

The client this accounts manager belongs to.



**Type**: [Client](/shieldbow/api/Client.html)

---

### Methods

#### .fetch (id, options)

Fetch a RIOT account by its unique PUUID.




**Signature:**

```ts
fetch(id: string, options?: {
        force: boolean;
    }): Promise<Account>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | string | The PUUID of the RIOT account. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Account](/shieldbow/api/Account.html)\>

---

#### .fetchByNameAndTag (name, tag, options)

Fetch a RIOT account by its name and tag.




**Signature:**

```ts
fetchByNameAndTag(name: string, tag: string, options?: {
        force: boolean;
    }): Promise<Account>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | string | The name of this RIOT account. |
| tag | string | The tag of this RIOT account. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Account](/shieldbow/api/Account.html)\>

---

