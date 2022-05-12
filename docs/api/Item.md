---
title: Item
description: A representation of an in-game item.
---

## Item class

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
| client | [Client](/shieldbow/api/Client.md) | The client requesting the data. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the item. |
| data | [ItemData](/shieldbow/api/ItemData.md) | The raw item data from data dragon. |
---

### Properties

#### availability

The list of maps on which you can buy this item.



**Type**: [GameMap](/shieldbow/api/GameMap.md)[]

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


See [rawDetails](/shieldbow/api/Item.md#rawDetails) if you want the raw data.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### from

The components of this item. You need to buy these item and spend additional gold to get this item.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/shieldbow/api/Item.md) \>

---

#### goldValue

The value of this item in terms of in-game gold.



**Type**: [ItemGoldValue](/shieldbow/api/ItemGoldValue.md)

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

#### into

A collection of items the current item is a component of.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/shieldbow/api/Item.md) \>

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


See [details](/shieldbow/api/Item.md#details) if you want to see it with the tags processed out.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### requiredChampion

If this is not undefined, then this item can only be bought/owned by this champion.



**Type**: [Champion](/shieldbow/api/Champion.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### specialRecipe

If this is not undefined, you cannot buy this item from the store. Instead, you need to buy the `specialRecipe` item and complete a quest to get it.



**Type**: [Item](/shieldbow/api/Item.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

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

