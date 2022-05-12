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
| client | [Client](/shieldbow/api/Client.md) |  |
| data | [ParticipantData](/shieldbow/api/ParticipantData.md) |  |
---

### Properties

#### assists

The number of kills the participant assisted a teammate with.



**Type**: number

---

#### baronKills

The number of times this participant killed the baron nashor.



**Type**: number

---

#### bounty

The bounty on this participant's head.



**Type**: [Bounty](/shieldbow/api/Bounty.md)

---

#### champion

The stats of the champion being played by this participant.



**Type**: {         key: number;         id: string;         champ: Champion;         level: number;         xp: number;         abilitiesCasted: Collection\<'Q' \| 'W' \| 'E' \| 'R', number\>;         form?: number;     }

---

#### consumablesPurchased

The number of consumable items purchased by the participant.



**Type**: number

---

#### creepScore

The creep score (CS) of the participant.



**Type**: number

---

#### crowdControlScore

The CC score earned by the participant.



**Type**: number

---

#### crowdControlTime

The amount of time (in seconds) the participant inflicted crowd control on the enemy team.



**Type**: number

---

#### deaths

The number of deaths of the participant.



**Type**: number

---

#### dragonKills

The number of dragons killed by the participant.



**Type**: number

---

#### firstBloodAssist

Whether the participant assisted in the first kill of the game.



**Type**: boolean

---

#### firstBloodKill

Whether the participant was the first to score a kill.



**Type**: boolean

---

#### firstTowerAssist

Whether the participant assisted in taking down the first turret.



**Type**: boolean

---

#### firstTowerKill

Whether the participant was the first to destroy a turret.



**Type**: boolean

---

#### goldEarned

The amount of gold earned by the participant.



**Type**: number

---

#### goldSpent

The amount of gold spent by the participant.



**Type**: number

---

#### healing

An overview of the healing done by the participant.



**Type**: {         total: number;         onTeam: number;         units: number;     }

---

#### id

The participant ID.



**Type**: number

---

#### inhibitors

The number of inhibitors killed/lost.



**Type**: {         lost: number;         killed: number;         takenDown: number;     }

---

#### items

The items in the participant's inventory.



**Type**: Collection\<number, [Item](/shieldbow/api/Item.md) \| undefined\>

---

#### itemsPurchased

The number of items purchased by the participant.



**Type**: number

---

#### jungleCampsKilled

The number of jungle creeps killed by the participant.



**Type**: number

---

#### killingSprees

The number of times the participant went on a killing spree.



**Type**: number

---

#### kills

The number of kills scored by this participant.



**Type**: number

---

#### largestCriticalStrike

The largest amount of damage dealt with a critical strike by the participant.



**Type**: number

---

#### largestKillingSpree

The largest killing spree of the participant.



**Type**: number

---

#### largestMultiKill

The largest multi-kill of the participant.



**Type**: number

---

#### longestTimeSpentLiving

The longest time the participant was alive on the rift (in seconds).



**Type**: number

---

#### magicDamage

An overview of the magic damage dealt/taken by the participant.



**Type**: {         taken: number;         dealt: number;         toChampions: number;     }

---

#### minionsKilled

The number of enemy minions killed by the participant.



**Type**: number

---

#### multiKills

The number of multi-kills scored by this participant.



**Type**: {         doubleKills: number;         tripleKills: number;         quadraKills: number;         pentaKills: number;         unrealKills: number;     }

---

#### nexusKilled

Whether the participant killed the nexus.



**Type**: boolean

---

#### nexusLost

Whether the participant's team lost their nexus.



**Type**: boolean

---

#### nexusTakedown

Whether the participant helped to take down the enemy nexus.



**Type**: boolean

---

#### objectivesStolen

The number of objectives such as dragon or barn nashor stolen by the participant.



**Type**: number

---

#### objectivesStolenAssists

The number of objectives such as dragon or baron nashor the participant helped to steal.



**Type**: number

---

#### perks

The perks (runes) selected by the participant.



**Type**: [Perks](/shieldbow/api/Perks.md)

---

#### physicalDamage

An overview of the physical damage dealt/taken by the participant.



**Type**: {         taken: number;         dealt: number;         toChampions: number;     }

---

#### position

The participant's position in the team.



**Type**: {         individual: string;         team: string;     }

---

#### remake

Whether the game ended in early surrender - a remake.



**Type**: boolean

---

#### summoner

The summoner acting as the participant.



**Type**: [Summoner](/shieldbow/api/Summoner.md)

---

#### summonerSpells

The summoner spells the participant chose for the match.



**Type**: Collection\<'D' \| 'F', [SummonerSpell](/shieldbow/api/SummonerSpell.md)\>

---

#### summonerSpellsCasts

The number of times each of the summoner spells was used.



**Type**: Collection\<'D' \| 'F', number\>

---

#### surrender

Whether one of the teams surrendered before the match ended.



**Type**: boolean

---

#### timeAlive

The amount of time (in seconds) the participant stayed alive.



**Type**: number

---

#### timeDead

The amount of time (in seconds) that the participant stayed dead.



**Type**: number

---

#### timePlayed

The amount of time (in seconds) the participant spent playing the game.


If this is lower than the game duration, the participant was AFK for that duration.



**Type**: number

---

#### totalDamage

An overview of the damage dealt/taken/shielded by the participant.



**Type**: {         dealt: number;         taken: number;         shielded: number;         toBuildings: number;         toChampions: number;         toTurrets: number;         toObjectives: number;         mitigated: number;     }

---

#### trueDamage

An overview of the true damage dealt/taken by the participant.



**Type**: {         taken: number;         dealt: number;         toChampions: number;     }

---

#### turrets

The number of turrets destroyed/lost.



**Type**: {         lost: number;         killed: number;         takenDown: number;     }

---

#### vision

The vision control stats of the participant.



**Type**: {         controlWardsUsed: number;         sightWardsBought: number;         controlWardsBought: number;         wardsKilled: number;         wardsPlaced: number;         score: number;     }

---

#### win

Whether the participant won the game.



**Type**: boolean

---

