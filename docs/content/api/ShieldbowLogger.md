---
title: ShieldbowLogger
description: Basic built-in debugging logger?.
---

# ShieldbowLogger class

---

Basic built-in debugging logger?.

**Signature:**

```ts
export declare class ShieldbowLogger implements ILogger 
```

Implements: ILogger

**References:** [ILogger](/api/ilogger)

---

### Constructor

```ts
new ShieldbowLogger (level?: LogLevel)
```

Constructs a new instance of the `ShieldbowLogger` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | [LogLevel](/api/loglevel) | The logger's level. |
---

### Properties

#### level

The logger's level, only messages above or equal to this level will be logged.



**Type**: [LoggerLevel](/api/loggerlevel)

---

### Methods

#### .critical ()

Log a message at the CRITICAL level.




**Signature:**

```ts
critical(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

#### .debug ()

Log a message at the DEBUG level.




**Signature:**

```ts
debug(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

#### .error ()

Log a message at the ERROR level.




**Signature:**

```ts
error(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

#### .hasLevel ()

Check whether a certain level is enabled.




**Signature:**

```ts
hasLevel(level: LoggerLevel): boolean;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | [LoggerLevel](/api/loggerlevel) | The level to check. |

**Return type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### .info ()

Log a message at the INFO level.




**Signature:**

```ts
info(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

#### .log ()

The base logging function.




**Signature:**

```ts
log(level: LoggerLevel, ...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | [LoggerLevel](/api/loggerlevel) | The level at which the message should be logged. |
| message | any[] | The message to log. |

**Return type**: void

---

#### .trace ()

Log a message at the TRACE level.




**Signature:**

```ts
trace(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

#### .warn ()

Log a message at the WARN level.




**Signature:**

```ts
warn(...message: any[]): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| message | any[] | The message to log. |

**Return type**: void

---

