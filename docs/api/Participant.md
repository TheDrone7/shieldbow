---
title: Participant
description: A representation of a participant in a match.
---

## Participant class

A representation of a participant in a match.

**Signature:**

```ts
export declare class Participant 
```

---

### Constructor

```ts
new Participant (client: Client, data: ParticipantData)
```

Constructs a new instance of the `Participant` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [ParticipantData](/api/ParticipantData.md) | The raw participant data from the API. |
---

### Properties

#### assists

The number of kills the participant assisted a teammate with.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### baronKills

The number of times this participant killed the baron nashor.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### basicPings

The number of times this participant used the basic pings.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### bounty

The bounty on this participant's head.



**Type**: [Bounty](/api/Bounty.md)

---

#### champion

The stats of the champion being played by this participant.



**Type**: [ParticipantChampion](/api/ParticipantChampion.md)

---

#### consumablesPurchased

The number of consumable items purchased by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### creepScore

The creep score (CS) of the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### crowdControlScore

The CC score earned by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### crowdControlTime

The amount of time (in seconds) the participant inflicted crowd control on the enemy team.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### deaths

The number of deaths of the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### dragonKills

The number of dragons killed by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### firstBloodAssist

Whether the participant assisted in the first kill of the game.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### firstBloodKill

Whether the participant was the first to score a kill.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### firstTowerAssist

Whether the participant assisted in taking down the first turret.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### firstTowerKill

Whether the participant was the first to destroy a turret.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### goldEarned

The amount of gold earned by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### goldSpent

The amount of gold spent by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### healing

An overview of the healing done by the participant.



**Type**: [ParticipantHealingStats](/api/ParticipantHealingStats.md)

---

#### id

The participant ID.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### inhibitors

The number of inhibitors killed/lost.



**Type**: [ParticipantInhibitorStats](/api/ParticipantInhibitorStats.md)

---

#### items

The items in the participant's inventory.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Item](/api/Item.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### itemsPurchased

The number of items purchased by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### jungleCampsKilled

The number of jungle creeps killed by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killingSprees

The number of times the participant went on a killing spree.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### kills

The number of kills scored by this participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### largestCriticalStrike

The largest amount of damage dealt with a critical strike by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### largestKillingSpree

The largest killing spree of the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### largestMultiKill

The largest multi-kill of the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### longestTimeSpentLiving

The longest time the participant was alive on the rift (in seconds).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### magicDamage

An overview of the magic damage dealt/taken by the participant.



**Type**: [ParticipantDamageStats](/api/ParticipantDamageStats.md)

---

#### minionsKilled

The number of enemy minions killed by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### multiKills

The number of multi-kills scored by this participant.



**Type**: [ParticipantMultkills](/api/ParticipantMultkills.md)

---

#### nexusKilled

Whether the participant killed the nexus.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### nexusLost

Whether the participant's team lost their nexus.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### nexusTakedown

Whether the participant helped to take down the enemy nexus.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### objectivesStolen

The number of objectives such as dragon or barn nashor stolen by the participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### objectivesStolenAssists

The number of objectives such as dragon or baron nashor the participant helped to steal.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### perks

The perks (runes) selected by the participant.



**Type**: [Perks](/api/Perks.md)

---

#### physicalDamage

An overview of the physical damage dealt/taken by the participant.



**Type**: [ParticipantDamageStats](/api/ParticipantDamageStats.md)

---

#### position

The participant's position in the team.



**Type**: [ParticipantPosition](/api/ParticipantPosition.md)

---

#### remake

Whether the game ended in early surrender - a remake.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### summoner

The summoner acting as the participant.



**Type**: [Summoner](/api/Summoner.md)

---

#### summonerSpells

The summoner spells the participant chose for the match.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'D' \| 'F', [SummonerSpell](/api/SummonerSpell.md) \>

---

#### summonerSpellsCasts

The number of times each of the summoner spells was used.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'D' \| 'F', [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

#### surrender

Whether one of the teams surrendered before the match ended.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### timeAlive

The amount of time (in seconds) the participant stayed alive.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### timeDead

The amount of time (in seconds) that the participant stayed dead.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### timePlayed

The amount of time (in seconds) the participant spent playing the game.


If this is lower than the game duration, the participant was AFK for that duration.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### totalDamage

An overview of the damage dealt/taken/shielded by the participant.



**Type**: [ParticipantTotalDamage](/api/ParticipantTotalDamage.md)

---

#### trueDamage

An overview of the true damage dealt/taken by the participant.



**Type**: [ParticipantDamageStats](/api/ParticipantDamageStats.md)

---

#### turrets

The number of turrets destroyed/lost.



**Type**: [ParticipantTurretStats](/api/ParticipantTurretStats.md)

---

#### vision

The vision control stats of the participant.



**Type**: [ParticipantVision](/api/ParticipantVision.md)

---

#### win

Whether the participant won the game.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

