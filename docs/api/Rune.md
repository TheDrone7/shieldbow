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
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [RuneData](/api/RuneData.md) | The raw rune data from data dragon. |
---

### Properties

#### description

The description (short version) of this rune provided by Data Dragon. This does not contain the HTML-like tags to help view this better on console or other output media.


See [rawDescription](/api/Rune.md#rawDescription) to view the description with the HTML-like tags included.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### details

The details (long version) about this rune provided by Data Dragon. This does not contain the HTML-like tags to help view this better on console or other output media.


See [rawDetails](/api/Rune.md#rawDetails) to view the details with all the HTML-like tags included.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### icon

A link to the rune's icon.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### id

The numerical unique ID of this rune.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### key

The worded key for this rune.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name

The name of this rune.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### rawDescription

The raw description (short version) provided by Data Dragon. This contains some HTML-like tags that help to display it on webpages.


See [description](/api/Rune.md#description) to view the description with all the HTML-like tags stripped out.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### rawDetails

The details (long version) about this rune provided by Data Dragon. This contains some HTML-like tags that help to display it on webpages.


See [details](/api/Rune.md#details) to view the details with all the HTML-like tags stripped out.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

