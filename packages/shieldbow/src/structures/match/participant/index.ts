import { Collection } from '@discordjs/collection';
import { Champion, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatchParticipant, PingType } from 'types';
import { ParticipantBounty } from './bounty';
import { ParticipantChampion } from './champion';
import { ParticipantDamage, ParticipantDamageDealt } from './damage';
import { ParticipantVision } from './vision';
import { ParticipantMultiKills } from './multikills';
import { ParticipantGold } from './gold';
import { ParticipantPosition } from './position';
import { ParticipantMinions } from './minions';

export class MatchParticipant {
  #client: Client;
  readonly pings: Record<PingType, number> = {} as Record<PingType, number>;
  readonly kills: number;
  readonly deaths: number;
  readonly assists: number;
  readonly bounty: ParticipantBounty;
  readonly challenges: Record<string, number>;
  readonly champion: ParticipantChampion;
  readonly damageDealt: ParticipantDamageDealt;
  readonly totalDamage: ParticipantDamage;
  readonly physicalDamage: ParticipantDamage;
  readonly magicDamage: ParticipantDamage;
  readonly trueDamage: ParticipantDamage;
  readonly vision: ParticipantVision;
  readonly multiKills: ParticipantMultiKills;
  readonly baronKills: number;
  readonly dragonKills: number;
  readonly eligibleForProgression: boolean;
  readonly firstBlood: boolean;
  readonly firstBloodAssist: boolean;
  readonly firstTower: boolean;
  readonly firstTowerAssist: boolean;
  readonly earlySurrender: boolean;
  readonly surrender: boolean;
  readonly gold: ParticipantGold;
  readonly position: ParticipantPosition;
  readonly inhibitorsKilled: number;
  readonly inhibitorTakedowns: number;
  readonly inhibitorsLost: number;
  readonly items: Collection<1 | 2 | 3 | 4 | 5 | 6 | 7, Item | undefined>;
  readonly itemsPurchased: number;
  readonly killingSprees: number;
  readonly largestCriticalStrike: number;
  readonly largestKillingSpree: number;
  readonly longestLife: number;
  readonly missions: Record<string, number>;
  readonly minions: ParticipantMinions;
  readonly nexusKilled: number;
  readonly nexusLost: number;
  readonly nexusTakedown: number;
  readonly objectivesStolen: number;
  readonly objectivesStolenAssists: number;
  readonly participantId: number;
  readonly perks: ParticipantPerks;
  readonly profileIconId: number;
  readonly playerId: string;
  readonly riotIdGameName: string;
  readonly riotIdTagLine: string;
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;
  readonly summonerSpellsUsed: Collection<'D' | 'F', number>;
  readonly summonerId: string;
  readonly summonerLevel: number;
  readonly teamEarlySurrendered: boolean;
  readonly teamId: number;
  readonly crowdControlScore: number;
  readonly timePlayed: number;
  readonly totalSelfHeal: number;
  readonly totalAllyHeal: number;
  readonly totalShielded: number;
  readonly totalTimeCCDealt: number;
  readonly totalTimeSpentDead: number;
  readonly totalUnitsHealed: number;
  readonly turretKills: number;
  readonly turretTakedowns: number;
  readonly turretsLost: number;
  readonly unrealKills: number;
  readonly win: boolean;

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
    this.bounty = new ParticipantBounty(data.bountyLevel);
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
    this.perks = new ParticipantPerks(data, rTrees);
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
}
