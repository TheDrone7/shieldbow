---
title: Rune
description: A representation of an in-game rune.
---

## Rune class

A representation of an in-game rune.

**Signature:**

```ts
export declare class Rune 
```

---

### Constructor

```ts
new Rune (client: Client, data: RuneData)
```

Constructs a new instance of the `Rune` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [RuneData](/shieldbow/api/RuneData.html) |  |
---

### Properties

#### description

The description (short version) of this rune provided by Data Dragon. This does not contain the HTML-like tags to help view this better on console or other output media.


See [rawDescription](/shieldbow/api/Rune.html#rawDescription) to view the description with the HTML-like tags included.



**Type**: string

---

#### details

The details (long version) about this rune provided by Data Dragon. This does not contain the HTML-like tags to help view this better on console or other output media.


See [rawDetails](/shieldbow/api/Rune.html#rawDetails) to view the details with all the HTML-like tags included.



**Type**: string

---

#### icon

A link to the rune's icon.



**Type**: string

---

#### id

The numerical unique ID of this rune.



**Type**: number

---

#### key

The worded key for this rune.



**Type**: string

---

#### name

The name of this rune.



**Type**: string

---

#### rawDescription

The raw description (short version) provided by Data Dragon. This contains some HTML-like tags that help to display it on webpages.


See [description](/shieldbow/api/Rune.html#description) to view the description with all the HTML-like tags stripped out.



**Type**: string

---

#### rawDetails

The details (long version) about this rune provided by Data Dragon. This contains some HTML-like tags that help to display it on webpages.


See [details](/shieldbow/api/Rune.html#details) to view the details with all the HTML-like tags stripped out.



**Type**: string

---

