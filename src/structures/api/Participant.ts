import type { PartialSummoner, ParticipantData } from '../../types';
import type { Champion, Item, RuneTree, SummonerSpell } from '../dragon';
import { Bounty } from './Bounty';
import { Collection } from '@discordjs/collection';
import { Perks } from './Perks';

/**
 * The participant's turret interaction information.
 */
export interface ParticipantTurretStats {
  /**
   * The number of turrets lost by the participant.
   */
  lost: number;
  /**
   * The number of turrets killed by the participant.
   */
  killed: number;
  /**
   * The number of turrets taken down by the participant.
   */
  takenDown: number;
}

/**
 * The participant's inhibitor interaction information.
 */
export interface ParticipantInhibitorStats {
  /**
   * The number of allied inhibitors killed by enemy team.
   */
  lost: number;
  /**
   * The number of enemy inhibitors killed by the participant.
   */
  killed: number;
  /**
   * The number of enemy inhibitors taken down by the participant.
   */
  takenDown: number;
}

/**
 * The participant's vision details.
 */
export interface ParticipantVision {
  /**
   * The number of control wards placed on the map.
   */
  controlWardsUsed: number;
  /**
   * The number of sight wards bought from the shop.
   */
  sightWardsBought: number;
  /**
   * The number of control wards bought from the shop.
   */
  controlWardsBought: number;
  /**
   * The number of wards destroyed.
   */
  wardsKilled: number;
  /**
   * The number of wards placed.
   */
  wardsPlaced: number;
  /**
   * The vision score earned by the participant.
   */
  score: number;
}

/**
 * The participant's champion details.
 */
export interface ParticipantChampion {
  /**
   * The numerical ID of the champion.
   */
  key: number;
  /**
   * The name of the champion.
   */
  id: string;
  /**
   * A reference to the actual champion.
   */
  champ: Champion;
  /**
   * The level of the champion.
   */
  level: number;
  /**
   * The amount of experience earned by this champion.
   */
  xp: number;
  /**
   * The count of how many times did the participant case each of the champion's abilities.
   */
  abilitiesCasted: Collection<'Q' | 'W' | 'E' | 'R', number>;
  /**
   * ONLY APPLICABLE FOR KAYN.
   *
   * 0 = No form. 1 = Darkin Slayer. 2 = Shadow Assassin.
   */
  form?: number;
}

/**
 * The participant's damage stats.
 */
export interface ParticipantDamageStats {
  /**
   * The amount of damage taken from the enemies.
   */
  taken: number;
  /**
   * The amount of damage dealt by the participant.
   */
  dealt: number;
  /**
   * The amount of damage inflicted upon the enemy champions.
   */
  toChampions: number;
}

/**
 * The participant's total damage stats.
 */
export interface ParticipantTotalDamage {
  /**
   * The total amount of damage dealt.
   */
  dealt: number;
  /**
   * The total amount of damage taken.
   */
  taken: number;
  /**
   * The total amount of damage shielded on allies.
   */
  shielded: number;
  /**
   * The total amount of damage dealt to buildings - inhibitors/nexus.
   */
  toBuildings: number;
  /**
   * The total amount of damage dealt to enemy champions.
   */
  toChampions: number;
  /**
   * The total amount of damage dealt to turrets.
   */
  toTurrets: number;
  /**
   * The total amount of damage dealt to objectives - drakes, rift heralds, etc.
   */
  toObjectives: number;
  /**
   * The total amount of self mitigated damage.
   */
  mitigated: number;
}

/**
 * The participant's healing stats.
 */
export interface ParticipantHealingStats {
  /**
   * The total amount healed.
   */
  total: number;
  /**
   * The amount of healing by the participant to allies.
   */
  onTeam: number;
  /**
   * The number of units healed by the participant.
   */
  units: number;
}

/**
 * The participant's multikill details.
 */
export interface ParticipantMultkills {
  /**
   * The number of double kills.
   */
  doubleKills: number;
  /**
   * The number of triple kills.
   */
  tripleKills: number;
  /**
   * The number of quadra kills.
   */
  quadraKills: number;
  /**
   * The number of penta kills.
   */
  pentaKills: number;
  /**
   * The number of 5+ kills (higher than penta).
   */
  unrealKills: number;
}

/**
 * The participant position details.
 */
export interface ParticipantPosition {
  /**
   * The individual position, ignoring any constraints.
   */
  individual: string;
  /**
   * The position of the participant in the team.
   * Assuming there must be at least one person in each role - TOP, JG, MID, etc.
   */
  team: string;
}

/**
 * A representation of a participant in a match.
 */
export class Participant {
  /**
   * The participant ID.
   */
  readonly id: number;
  /**
   * The perks (runes) selected by the participant.
   */
  readonly perks: Perks;
  /**
   * The number of times this participant used the basic pings.
   */
  readonly basicPings: number;
  /**
   * The number of kills scored by this participant.
   */
  readonly kills: number;
  /**
   * The number of deaths of the participant.
   */
  readonly deaths: number;
  /**
   * The number of kills the participant assisted a teammate with.
   */
  readonly assists: number;
  /**
   * The number of times this participant killed the baron nashor.
   */
  readonly baronKills: number;
  /**
   * The number of dragons killed by the participant.
   */
  readonly dragonKills: number;
  /**
   * The bounty on this participant's head.
   */
  readonly bounty: Bounty;
  /**
   * The stats of the champion being played by this participant.
   */
  readonly champion: ParticipantChampion;
  /**
   * The number of consumable items purchased by the participant.
   */
  readonly consumablesPurchased: number;
  /**
   * An overview of the damage dealt/taken/shielded by the participant.
   */
  readonly totalDamage: ParticipantTotalDamage;
  /**
   * The vision control stats of the participant.
   */
  readonly vision: ParticipantVision;
  /**
   * Whether the participant won the game.
   */
  readonly win: boolean;
  /**
   * The number of multi-kills scored by this participant.
   */
  readonly multiKills: ParticipantMultkills;
  /**
   * Whether the participant was the first to score a kill.
   */
  readonly firstBloodKill: boolean;
  /**
   * Whether the participant assisted in the first kill of the game.
   */
  readonly firstBloodAssist: boolean;
  /**
   * Whether the participant was the first to destroy a turret.
   */
  readonly firstTowerKill: boolean;
  /**
   * Whether the participant assisted in taking down the first turret.
   */
  readonly firstTowerAssist: boolean;
  /**
   * Whether the game ended in early surrender - a remake.
   */
  readonly remake: boolean;
  /**
   * Whether one of the teams surrendered before the match ended.
   */
  readonly surrender: boolean;
  /**
   * The amount of gold earned by the participant.
   */
  readonly goldEarned: number;
  /**
   * The amount of gold spent by the participant.
   */
  readonly goldSpent: number;
  /**
   * The participant's position in the team.
   */
  readonly position: ParticipantPosition;
  /**
   * The number of turrets destroyed/lost.
   */
  readonly turrets: ParticipantTurretStats;
  /**
   * The number of inhibitors killed/lost.
   */
  readonly inhibitors: ParticipantInhibitorStats;
  /**
   * The items in the participant's inventory.
   */
  readonly items: Collection<number, Item | undefined>;
  /**
   * The number of items purchased by the participant.
   */
  readonly itemsPurchased: number;
  /**
   * The number of times the participant went on a killing spree.
   */
  readonly killingSprees: number;
  /**
   * The largest killing spree of the participant.
   */
  readonly largestKillingSpree: number;
  /**
   * The largest multi-kill of the participant.
   */
  readonly largestMultiKill: number;
  /**
   * The longest time the participant was alive on the rift (in seconds).
   */
  readonly longestTimeSpentLiving: number;
  /**
   * The largest amount of damage dealt with a critical strike by the participant.
   */
  readonly largestCriticalStrike: number;
  /**
   * An overview of the magic damage dealt/taken by the participant.
   */
  readonly magicDamage: ParticipantDamageStats;
  /**
   * An overview of the physical damage dealt/taken by the participant.
   */
  readonly physicalDamage: ParticipantDamageStats;
  /**
   * Whether the participant killed the nexus.
   */
  readonly nexusKilled: boolean;
  /**
   * Whether the participant's team lost their nexus.
   */
  readonly nexusLost: boolean;
  /**
   * Whether the participant helped to take down the enemy nexus.
   */
  readonly nexusTakedown: boolean;
  /**
   * The number of jungle creeps killed by the participant.
   */
  readonly jungleCampsKilled: number;
  /**
   * The number of objectives such as dragon or barn nashor stolen by the participant.
   */
  readonly objectivesStolen: number;
  /**
   * The number of objectives such as dragon or baron nashor the participant helped to steal.
   */
  readonly objectivesStolenAssists: number;
  /**
   * The summoner acting as the participant.
   */
  readonly summoner: PartialSummoner;
  /**
   * The summoner spells the participant chose for the match.
   */
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;

  /**
   * The number of times each of the summoner spells was used.
   */
  readonly summonerSpellsCasts: Collection<'D' | 'F', number>;
  /**
   * The amount of time (in seconds) the participant inflicted crowd control on the enemy team.
   */
  readonly crowdControlTime: number;
  /**
   * The CC score earned by the participant.
   */
  readonly crowdControlScore: number;
  /**
   * The amount of time (in seconds) the participant spent playing the game.
   *
   * If this is lower than the game duration, the participant was AFK for that duration.
   */
  readonly timePlayed: number;
  /**
   * An overview of the healing done by the participant.
   */
  readonly healing: ParticipantHealingStats;
  /**
   * The number of enemy minions killed by the participant.
   */
  readonly minionsKilled: number;
  /**
   * The creep score (CS) of the participant.
   */
  readonly creepScore: number;
  /**
   * The amount of time (in seconds) the participant stayed alive.
   */
  readonly timeAlive: number;
  /**
   * The amount of time (in seconds) that the participant stayed dead.
   */
  readonly timeDead: number;
  /**
   * An overview of the true damage dealt/taken by the participant.
   */
  readonly trueDamage: ParticipantDamageStats;
  /**
   * The challenges progression data for this participant.
   */
  readonly challenges: { [key: string]: number };

  /**
   * Creates a new participant instance.
   * @param data - The raw participant data from the API.
   * @param champ - The champion played by the participant.
   * @param items - The items purchased by the participant.
   * @param runeTrees - The rune trees in the game.
   * @param summonerSpells - The summoner spells in the game.
   */
  constructor(
    data: ParticipantData,
    champ: Champion,
    items: Collection<string, Item>,
    runeTrees: Collection<string, RuneTree>,
    summonerSpells: Collection<string, SummonerSpell>
  ) {
    this.id = data.participantId;
    this.perks = new Perks(runeTrees, data.perks);

    this.challenges = data.challenges;

    this.basicPings = data.basicPings;

    this.kills = data.kills;
    this.deaths = data.deaths;
    this.assists = data.assists;

    this.bounty = new Bounty(data.bountyLevel);
    this.champion = {
      key: data.championId,
      id: data.championName,
      champ,
      level: data.champLevel,
      xp: data.champExperience,
      form: data.championTransform,
      abilitiesCasted: new Collection<'Q' | 'W' | 'E' | 'R', number>()
    };

    this.champion.abilitiesCasted.set('Q', data.spell1Casts);
    this.champion.abilitiesCasted.set('W', data.spell2Casts);
    this.champion.abilitiesCasted.set('E', data.spell3Casts);
    this.champion.abilitiesCasted.set('R', data.spell4Casts);

    this.consumablesPurchased = data.consumablesPurchased;
    this.win = data.win;

    this.firstBloodKill = data.firstBloodKill;
    this.firstBloodAssist = data.firstBloodAssist;
    this.firstTowerKill = data.firstTowerKill;
    this.firstTowerAssist = data.firstTowerAssist;

    this.vision = {
      controlWardsBought: data.visionWardsBoughtInGame,
      sightWardsBought: data.sightWardsBoughtInGame,
      controlWardsUsed: data.detectorWardsPlaced,
      score: data.visionScore,
      wardsPlaced: data.wardsPlaced,
      wardsKilled: data.wardsKilled
    };

    this.multiKills = {
      doubleKills: data.doubleKills,
      tripleKills: data.tripleKills,
      quadraKills: data.quadraKills,
      pentaKills: data.pentaKills,
      unrealKills: data.unrealKills
    };

    this.totalDamage = {
      dealt: data.totalDamageDealt,
      taken: data.totalDamageTaken,
      shielded: data.totalDamageShieldedOnTeammates,
      toChampions: data.totalDamageDealtToChampions,
      toBuildings: data.damageDealtToBuildings,
      toObjectives: data.damageDealtToObjectives,
      toTurrets: data.damageDealtToTurrets,
      mitigated: data.damageSelfMitigated
    };

    this.magicDamage = {
      dealt: data.magicDamageDealt,
      taken: data.magicDamageTaken,
      toChampions: data.magicDamageDealtToChampions
    };

    this.physicalDamage = {
      dealt: data.physicalDamageDealt,
      taken: data.physicalDamageTaken,
      toChampions: data.physicalDamageDealtToChampions
    };

    this.trueDamage = {
      dealt: data.trueDamageDealt,
      taken: data.trueDamageTaken,
      toChampions: data.trueDamageDealtToChampions
    };

    this.remake = data.gameEndedInEarlySurrender;
    this.surrender = data.gameEndedInSurrender;

    this.goldEarned = data.goldEarned;
    this.goldSpent = data.goldSpent;

    this.position = {
      individual: data.individualPosition,
      team: data.teamPosition
    };

    this.turrets = {
      killed: data.turretKills,
      takenDown: data.turretTakedowns,
      lost: data.turretsLost
    };

    this.inhibitors = {
      killed: data.inhibitorKills,
      takenDown: data.inhibitorTakedowns,
      lost: data.inhibitorsLost
    };

    this.nexusKilled = data.nexusKills > 0;
    this.nexusLost = data.nexusLost > 0;
    this.nexusTakedown = data.nexusTakedowns > 0;

    this.items = new Collection<number, Item | undefined>();
    this.items.set(1, items.get(data.item0.toString()));
    this.items.set(2, items.get(data.item1.toString()));
    this.items.set(3, items.get(data.item2.toString()));
    this.items.set(4, items.get(data.item3.toString()));
    this.items.set(5, items.get(data.item4.toString()));
    this.items.set(6, items.get(data.item5.toString()));
    this.items.set(7, items.get(data.item6.toString()));
    this.itemsPurchased = data.itemsPurchased;

    this.killingSprees = data.killingSprees;
    this.largestKillingSpree = data.largestKillingSpree;
    this.largestMultiKill = data.largestMultiKill;
    this.longestTimeSpentLiving = data.longestTimeSpentLiving;
    this.largestCriticalStrike = data.largestCriticalStrike;

    this.jungleCampsKilled = data.neutralMinionsKilled;
    this.minionsKilled = data.totalMinionsKilled;
    this.creepScore = data.neutralMinionsKilled + data.totalMinionsKilled;
    this.objectivesStolen = data.objectivesStolen;
    this.objectivesStolenAssists = data.objectivesStolenAssists;
    this.baronKills = data.baronKills;
    this.dragonKills = data.dragonKills;

    this.summoner = {
      id: data.summonerId,
      name: data.summonerName,
      profileIconId: data.profileIcon,
      playerId: data.puuid,
      summonerLevel: data.summonerLevel
    };

    this.summonerSpells = new Collection<'D' | 'F', SummonerSpell>();
    this.summonerSpellsCasts = new Collection<'D' | 'F', number>();

    this.summonerSpells.set('D', summonerSpells.find((spell) => spell.key === data.summoner1Id)!);
    this.summonerSpells.set('F', summonerSpells.find((spell) => spell.key === data.summoner2Id)!);

    this.summonerSpellsCasts.set('D', data.summoner1Casts);
    this.summonerSpellsCasts.set('F', data.summoner2Casts);

    this.crowdControlScore = data.timeCCingOthers;
    this.crowdControlTime = data.totalTimeCCDealt;
    this.timePlayed = data.timePlayed;
    this.timeAlive = data.timePlayed - data.totalTimeSpentDead;
    this.timeDead = data.totalTimeSpentDead;

    this.healing = {
      total: data.totalHeal,
      onTeam: data.totalHealsOnTeammates,
      units: data.totalUnitsHealed
    };
  }
}
