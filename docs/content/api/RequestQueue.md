---
title: RequestQueue
description: A queue that can be used to queue up requests.
---

# RequestQueue class

---

A queue that can be used to queue up requests.

**Signature:**

```ts
export declare class RequestQueue 
```

---

### Constructor

```ts
new RequestQueue ()
```

Constructs a new instance of the `RequestQueue` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
---

### Methods

#### .dequeue ()

Dequeues the first action to be executed.



**Signature:**

```ts
dequeue(): Promise<boolean>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \>

---

#### .enqueue ()

Enqueues an action to be executed.




**Signature:**

```ts
enqueue(action: () => Promise<AxiosResponse>): Promise<AxiosResponse<any, any>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| action | () = \> Promise \< AxiosResponse \> | The action to execute. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< AxiosResponse \< any, any \> \>

---

