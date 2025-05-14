import { Collection } from '@discordjs/collection';
import { Champion, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatchParticipant, PingType } from 'types';

import { ParticipantChampion } from './champion';
import { ParticipantDamage, ParticipantDamageDealt } from './damage';
import { ParticipantVision } from './vision';
import { ParticipantMultiKills } from './multikills';
import { ParticipantGold } from './gold';
import { ParticipantPosition } from './position';
import { ParticipantMinions } from './minions';
import { ParticipantPerks } from './perks';

/**
 * Represents a participant in a match.
 */
export class MatchParticipant {
  #client: Client;
  /**
   * The number of communication pings used by the participant.
   */
  readonly pings: Record<PingType, number> = {} as Record<PingType, number>;
  /**
   * The number of kills scored by the participant.
   */
  readonly kills: number;
  /**
   * The number of deaths suffered by the participant.
   */
  readonly deaths: number;
  /**
   * The number of assists scored by the participant.
   *
   * (Assists are counted when a participant is involved in a kill,
   * but does not get the kill themselves by being the last person to hit the enemy.)
   */
  readonly assists: number;
  /**
   * The bounty level of the participant. Determines the amount of gold earned by the enemy on killing the participant.
   */
  readonly bountyLevel: number;
  /**
   * The challenges progression of the participant.
   */
  readonly challenges: Record<string, number>;
  /**
   * The details of the champion played by the participant.
   */
  readonly champion: ParticipantChampion;
  /**
   * The damage dealt by the participant.
   */
  readonly damageDealt: ParticipantDamageDealt;
  /**
   * The total damage stats of the participant.
   */
  readonly totalDamage: ParticipantDamage;
  /**
   * The physical damage stats of the participant.
   */
  readonly physicalDamage: ParticipantDamage;
  /**
   * The magic damage stats of the participant.
   */
  readonly magicDamage: ParticipantDamage;
  /**
   * The true damage stats of the participant.
   */
  readonly trueDamage: ParticipantDamage;
  /**
   * The vision stats of the participant.
   */
  readonly vision: ParticipantVision;
  /**
   * The multi-kills stats of the participant.
   */
  readonly multiKills: ParticipantMultiKills;
  /**
   * The number of baron kills scored by the participant.
   */
  readonly baronKills: number;
  /**
   * The number of dragon kills scored by the participant.
   */
  readonly dragonKills: number;
  /**
   * Whether the participant is eligible for progression.
   *
   * Further details are unclear here. Seems to be related to disconnects.
   */
  readonly eligibleForProgression: boolean;
  /**
   * Whether the participant scored the first blood kill.
   */
  readonly firstBlood: boolean;
  /**
   * Whether the participant assisted in the first blood kill.
   */
  readonly firstBloodAssist: boolean;
  /**
   * Whether the participant scored the first tower kill.
   */
  readonly firstTower: boolean;
  /**
   * Whether the participant assisted in the first tower kill.
   */
  readonly firstTowerAssist: boolean;
  /**
   * Whether the game ended in an early surrender (remake).
   */
  readonly earlySurrender: boolean;
  /**
   * Whether the game ended in a surrender (normal surrender, not remake).
   */
  readonly surrender: boolean;
  /**
   * The gold stats of the participant.
   */
  readonly gold: ParticipantGold;
  /**
   * The position of the participant in the game.
   *
   * Lane, Role, etc.
   */
  readonly position: ParticipantPosition;
  /**
   * The number of inhibitors killed by the participant.
   */
  readonly inhibitorsKilled: number;
  /**
   * The number of inhibitors takedowns scored by the participant (kills + assists).
   */
  readonly inhibitorTakedowns: number;
  /**
   * The number of inhibitors lost by the participant's team.
   */
  readonly inhibitorsLost: number;
  /**
   * The items purchased by the participant.
   *
   * The keys are the default item slots (1-7).
   */
  readonly items: Collection<1 | 2 | 3 | 4 | 5 | 6 | 7, Item | undefined>;
  /**
   * The number of items purchased by the participant.
   */
  readonly itemsPurchased: number;
  /**
   * The number of killing sprees (three or more kills without dying) scored by the participant.
   */
  readonly killingSprees: number;
  /**
   * The largest critical strike dealt by the participant.
   */
  readonly largestCriticalStrike: number;
  /**
   * The largest killing spree scored by the participant (number of kills without dying).
   */
  readonly largestKillingSpree: number;
  /**
   * The longest time spent alive by the participant.
   */
  readonly longestLife: number;
  /**
   * The missions scored by the participant.
   *
   * Unclear what this is. Might be related to eternals.
   */
  readonly missions: Record<string, number>;
  /**
   * The minions/farming stats of the participant.
   */
  readonly minions: ParticipantMinions;
  /**
   * The number of nexus kills scored by the participant.
   */
  readonly nexusKilled: number;
  /**
   * The number of nexus lost by the participant's team.
   */
  readonly nexusLost: number;
  /**
   * The number of nexus takedowns scored by the participant (kills + assists).
   */
  readonly nexusTakedown: number;
  /**
   * The number of objectives stolen by the participant.
   */
  readonly objectivesStolen: number;
  /**
   * The number of objectives steal assists scored by the participant.
   *
   * This is when the participant hit the objective and their teammate secured the steal.
   */
  readonly objectivesStolenAssists: number;
  /**
   * The ID of the participant in the match.
   */
  readonly participantId: number;
  /**
   * The perks (runes) of the participant.
   */
  readonly perks: ParticipantPerks;
  /**
   * The ID of the profile icon of the participant's account.
   */
  readonly profileIconId: number;
  /**
   * The PUUID of the participant's account.
   */
  readonly playerId: string;
  /**
   * The name of the participant's account.
   */
  readonly riotIdGameName: string;
  /**
   * The tag line of the participant's account.
   */
  readonly riotIdTagLine: string;
  /**
   * The summoner spells selected by the participant.
   *
   * The keys are the default summoner spell slots (D/F).
   */
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;
  /**
   * The number of times summoner spells were used by the participant.
   *
   * The keys are the default summoner spell slots (D/F).
   */
  readonly summonerSpellsUsed: Collection<'D' | 'F', number>;
  /**
   * The summoner ID of the participant.
   * (This should not really be used anymore and only exists for backwards compatibility.)
   *
   * The PUUID should be used instead.
   * @deprecated Use `playerId` instead.
   */
  readonly summonerId: string;
  /**
   * The summoner level of the participant.
   */
  readonly summonerLevel: number;
  /**
   * Whether the team of the participant surrendered early (remake).
   */
  readonly teamEarlySurrendered: boolean;
  /**
   * The ID of the participant's team.
   */
  readonly teamId: number;
  /**
   * The crowd control score of the participant.
   */
  readonly crowdControlScore: number;
  /**
   * The time played by the participant in the match (not dead).
   */
  readonly timePlayed: number;
  /**
   * The total amount of health healed by the participant other than the passive health regen.
   */
  readonly totalSelfHeal: number;
  /**
   * The total heal of the participant on allies.
   */
  readonly totalAllyHeal: number;
  /**
   * The total amount of damage shielded by the participant.
   */
  readonly totalShielded: number;
  /**
   * The total time the participant spent crowd controlling enemies.
   */
  readonly totalTimeCCDealt: number;
  /**
   * The total time the participant spent dead.
   */
  readonly totalTimeSpentDead: number;
  /**
   * The number of units healed by the participant.
   */
  readonly totalUnitsHealed: number;
  /**
   * The number of turret kills scored by the participant.
   */
  readonly turretKills: number;
  /**
   * The number of turret takedowns scored by the participant (kills + assists).
   */
  readonly turretTakedowns: number;
  /**
   * The number of turrets lost by the participant's team.
   */
  readonly turretsLost: number;
  /**
   * The number of unreal kills scored by the participant.
   *
   * This does not exist in the game. It hasn't existed for a long time. Should be always 0.
   */
  readonly unrealKills: number;
  /**
   * Whether the participant won the match.
   */
  readonly win: boolean;

  /**
   * Creates a new MatchParticipant instance.
   * @param client - The client instance.
   * @param data - The raw data of the participant from the API.
   * @param champions - The list of champions.
   * @param items - The list of items.
   * @param rTrees - The list of rune trees.
   * @param spells - The list of summoner spells.
   */
  constructor(
    client: Client,
    data: IMatchParticipant,
    champions: Champion[],
    items: Item[],
    rTrees: RuneTree[],
    spells: SummonerSpell[]
  ) {
    this.#client = client;
    this.pings = {
      allIn: data.allInPings ?? 0,
      assistMe: data.assistMePings ?? 0,
      bait: data.baitPings ?? 0,
      basic: data.basicPings ?? 0,
      command: data.commandPings ?? 0,
      danger: data.dangerPings ?? 0,
      enemyMissing: data.enemyMissingPings ?? 0,
      enemyVision: data.enemyVisionPings ?? 0,
      getBack: data.getBackPings ?? 0,
      hold: data.holdPings ?? 0,
      needVision: data.needVisionPings ?? 0,
      onMyWay: data.onMyWayPings ?? 0,
      push: data.pushPings ?? 0,
      visionCleared: data.visionClearedPings ?? 0
    };

    this.kills = data.kills;
    this.deaths = data.deaths;
    this.assists = data.assists;
    this.bountyLevel = data.bountyLevel;
    this.challenges = data.challenges ?? {};
    this.champion = new ParticipantChampion(data, champions);
    this.damageDealt = new ParticipantDamageDealt(data);
    this.totalDamage = new ParticipantDamage(data);
    this.physicalDamage = new ParticipantDamage(data);
    this.magicDamage = new ParticipantDamage(data);
    this.trueDamage = new ParticipantDamage(data);
    this.vision = new ParticipantVision(data);
    this.multiKills = new ParticipantMultiKills(data);
    this.baronKills = data.baronKills;
    this.dragonKills = data.dragonKills;
    this.eligibleForProgression = data.eligibleForProgression;
    this.firstBlood = data.firstBloodKill;
    this.firstBloodAssist = data.firstBloodAssist;
    this.firstTower = data.firstTowerKill;
    this.firstTowerAssist = data.firstTowerAssist;
    this.earlySurrender = data.gameEndedInEarlySurrender;
    this.surrender = data.gameEndedInSurrender;
    this.gold = new ParticipantGold(data);
    this.position = new ParticipantPosition(data);
    this.inhibitorsKilled = data.inhibitorKills;
    this.inhibitorTakedowns = data.inhibitorTakedowns;
    this.inhibitorsLost = data.inhibitorsLost;

    this.items = new Collection();
    this.items.set(
      1,
      items.find((i) => i.id === data.item0.toString())
    );
    this.items.set(
      2,
      items.find((i) => i.id === data.item1.toString())
    );
    this.items.set(
      3,
      items.find((i) => i.id === data.item2.toString())
    );
    this.items.set(
      4,
      items.find((i) => i.id === data.item3.toString())
    );
    this.items.set(
      5,
      items.find((i) => i.id === data.item4.toString())
    );
    this.items.set(
      6,
      items.find((i) => i.id === data.item5.toString())
    );
    this.items.set(
      7,
      items.find((i) => i.id === data.item6.toString())
    );

    this.itemsPurchased = data.itemsPurchased;
    this.killingSprees = data.killingSprees;
    this.largestCriticalStrike = data.largestCriticalStrike;
    this.largestKillingSpree = data.largestKillingSpree;
    this.longestLife = data.longestTimeSpentLiving;

    this.missions = data.missions ?? {
      playerScore0: data.playerScore0 ?? 0,
      playerScore1: data.playerScore1 ?? 0,
      playerScore2: data.playerScore2 ?? 0,
      playerScore3: data.playerScore3 ?? 0,
      playerScore4: data.playerScore4 ?? 0,
      playerScore5: data.playerScore5 ?? 0,
      playerScore6: data.playerScore6 ?? 0,
      playerScore7: data.playerScore7 ?? 0,
      playerScore8: data.playerScore8 ?? 0,
      playerScore9: data.playerScore9 ?? 0,
      playerScore10: data.playerScore10 ?? 0,
      playerScore11: data.playerScore11 ?? 0
    };

    this.minions = new ParticipantMinions(data);
    this.nexusKilled = data.nexusKills;
    this.nexusLost = data.nexusLost;
    this.nexusTakedown = data.nexusTakedowns;
    this.objectivesStolen = data.objectivesStolen;
    this.objectivesStolenAssists = data.objectivesStolenAssists;
    this.participantId = data.participantId;
    this.perks = new ParticipantPerks(data.perks, rTrees, client.runes.statRunes);
    this.profileIconId = data.profileIcon;
    this.playerId = data.puuid;
    this.riotIdGameName = data.riotIdGameName ?? data.riotIdName ?? data.summonerName;
    this.riotIdTagLine = data.riotIdTagLine ?? '';

    this.summonerSpells = new Collection();
    this.summonerSpells.set('D', spells.find((s) => s.id === data.summoner1Id.toString())!);
    this.summonerSpells.set('F', spells.find((s) => s.id === data.summoner2Id.toString())!);

    this.summonerSpellsUsed = new Collection();
    this.summonerSpellsUsed.set('D', data.summoner1Casts);
    this.summonerSpellsUsed.set('F', data.summoner2Casts);

    this.summonerId = data.summonerId;
    this.summonerLevel = data.summonerLevel;
    this.teamEarlySurrendered = data.teamEarlySurrendered;
    this.teamId = data.teamId;
    this.crowdControlScore = data.timeCCingOthers;
    this.timePlayed = data.timePlayed;
    this.totalSelfHeal = data.totalHeal;
    this.totalAllyHeal = data.totalHealsOnTeammates;
    this.totalShielded = data.totalDamageShieldedOnTeammates;
    this.totalTimeCCDealt = data.totalTimeCCDealt;
    this.totalTimeSpentDead = data.totalTimeSpentDead;
    this.totalUnitsHealed = data.totalUnitsHealed;
    this.turretKills = data.turretKills;
    this.turretTakedowns = data.turretsTakedowns;
    this.turretsLost = data.turretsLost;
    this.unrealKills = data.unrealKills;
    this.win = data.win;
  }

  async fetchAccount() {
    return this.#client.accounts.fetch(this.playerId);
  }
}

export {
  ParticipantChampion,
  ParticipantDamage,
  ParticipantDamageDealt,
  ParticipantVision,
  ParticipantMultiKills,
  ParticipantGold,
  ParticipantPosition,
  ParticipantMinions,
  ParticipantPerks
};
