---
title: Item
description: A representation of an in-game item.
---

# Item class

---

A representation of an in-game item.

**Signature:**

```ts
export declare class Item 
```

---

### Constructor

```ts
new Item (client: Client, id: string, data: ItemData)
```

Constructs a new instance of the `Item` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) | The client requesting the data. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the item. |
| data | [ItemData](/api/interfaces/itemdata) | The raw item data from data dragon. |
---

### Properties

#### availability

The list of maps on which you can buy this item.



**Type**: [GameMap](/api/interfaces/gamemap)[]

---

#### consumable

Whether this item is a consumable.


Consumables give you temporary buffs or vision after consumption.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### consumeOnFull

Whether this item is automatically consumed if you do not have an available item slot.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### description

A short-description of this object. `plaintext` attribute in the data dragon file.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### details

More detailed description of the item. This is the processed details. With all the HTML-like tags removed.


See [rawDetails](/api/item#rawdetails) if you want the raw data.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### goldValue

The value of this item in terms of in-game gold.



**Type**: [ItemGoldValue](/api/interfaces/itemgoldvalue)

---

#### hideFromAll

Whether this item can be bought from the store.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### id

The 4-digit unique ID (numerical ID as a string) of the item.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### image

A link to the image assigned to this item in-game.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### inStore

Whether this item is listed in the in-game store.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### kind

The kind of item this is in-game. By default, all items are set to be `Basic`. There might be some issues with items that do not have their `depth` set in the data dragon JSON.



**Type**: 'Basic' \| 'Epic' \| 'Legendary' \| 'Mythic'

---

#### name

The displayed name of this item.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### rawDetails

More detailed description of the item. Raw details contain some html-like tags. This is the raw details from the data dragon API.


See [details](/api/item#details) if you want to see it with the tags processed out.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### requiredChampionId

If this field is defined, then this item can only be bought/owned by this champion.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### stacks

If this has a value, it means this item can be stacked in the same item slot. The value indicates the quantity of this item you can store in one slot.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### stats

A list of stats this item provides. To learn more about these stats, [documentation](https://developer.riotgames.com/docs/lol#data-dragon_items)



**Type**: {         [key: string]: number;     }

---

#### tags

Some tags assigned to this item.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

### Methods

#### .from ()

The components of this item. You need to buy these item and spend additional gold to get this item.



**Signature:**

```ts
from(): Promise<Item[]>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/classes/item)[] \>

---

#### .into ()

A collection of items the current item is a component of.



**Signature:**

```ts
into(): Promise<Item[]>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/classes/item)[] \>

---

#### .requiredChampion ()

If this is not undefined, then this item can only be bought/owned by this champion.



**Signature:**

```ts
requiredChampion(): Promise<Champion>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/classes/champion) \>

---

#### .specialRecipe ()

If this is defined, you cannot buy this item from the store. Instead, you need to buy the `specialRecipe` item and complete a quest to get it.



**Signature:**

```ts
specialRecipe(): Promise<Item | undefined>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/classes/item) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

