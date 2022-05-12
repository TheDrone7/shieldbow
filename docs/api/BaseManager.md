---
title: BaseManager
description: A base for any manager classes.
---

## BaseManager interface

A base for any manager classes.

**Signature:**

```ts
export interface BaseManager<T> 
```

### Properties

#### cache

The cache to store any data that can be avoided fetching repeatedly.



**Type**: Collection\<any, T\>

---

#### client

The client this manager is being used by.



**Type**: [Client](/shieldbow/api/Client.html)

---

#### fetch

The method to actually fetch the data.




**Type**: (id: any, options: {         force: boolean;     }) =\> Promise\<T\>

---

