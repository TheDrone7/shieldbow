---
title: LoggerConfig
description: Client's logging utility configuration.
---

## LoggerConfig interface

Client's logging utility configuration.

**Signature:**

```ts
export interface LoggerConfig 
```

### Properties

#### custom

The custom logger to use, if you don't want to use the built-in one. This must implement the `ILogger` interface.



**Type**: [ILogger](/api/ilogger)

---

#### enable

Whether to enable logging (defaults to `true`). If set to `false`, all other options are ignored.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### level

The log level to use (defaults to `WARN`). Only logs with a level equal to or higher than this will be logged.



**Type**: [LogLevel](/api/loglevel)

---

