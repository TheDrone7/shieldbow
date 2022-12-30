---
title: StorageConfig
description: Client's storage plugin configuration.
---

## StorageConfig interface

Client's storage plugin configuration.

**Signature:**

```ts
export interface StorageConfig 
```

### Properties

#### custom

The custom storage plugin to use. This will override the default local storage plugin.



**Type**: [IStorage](/api/IStorage.md)

---

#### enable

Whether to enable storing fetched data. Can be set to true to enable for all, or false to disable for all.


By default, this is enabled for DDragon/CDragon data, and disabled for API data.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [ManagersConfig](/api/ManagersConfig.md)

---

#### root

The root directory for the local storage plugin. Defaults to 'data'. This will be ignored if a custom storage plugin is used.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

