import { IMatchParticipantPerks } from './perks';

/**
 * The raw match participant data from the API.
 */
export interface IMatchParticipant {
  allInPings: number;
  assistMePings: number;
  assists: number;
  baitPings?: number; // Recently removed.
  baronKills: number;
  basicPings: number;
  bountyLevel: number;
  challenges?: Record<string, number>; // Recently added
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  commandPings: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  dangerPings: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  eligibleForProgression: boolean;
  enemyMissingPings: number;
  enemyVisionPings: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  getBackPings: number;
  goldEarned: number;
  goldSpent: number;
  holdPings: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  missions?: Record<string, number>; // Recently added
  needVisionPings: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  nexusTakedowns: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  onMyWayPings: number;
  participantId: number;
  pentaKills: number;
  perks: IMatchParticipantPerks;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  placement?: number;
  playerAugment1?: number;
  playerAugment2?: number;
  playerAugment3?: number;
  playerAugment4?: number;
  playerAugment5?: number; // Only in new cherry (v3)
  playerAugment6?: number; // ...
  playerScore0?: number; // Only in old cherry (v2)
  playerScore1?: number; // ...
  playerScore2?: number; // ...
  playerScore3?: number; // ...
  playerScore4?: number; // ...
  playerScore5?: number; // ...
  playerScore6?: number; // ...
  playerScore7?: number; // ...
  playerScore8?: number; // ...
  playerScore9?: number; // ...
  playerScore10?: number; // ...
  playerScore11?: number; // ...
  playerSubteamId?: number; // Only in old cherry (v2)
  profileIcon: number;
  pushPings: number;
  puuid: string;
  quadraKills: number;
  riotIdName?: string; // Only in old cherry (v1)
  riotIdGameName?: string; // Other modes.
  riotIdTagLine: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  subteamPlacement?: 0;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalAllyJungleMinionsKilled: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalEnemyJungleMinionsKilled: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretsLost: number;
  turretsTakedowns: number;
  unrealKills: number;
  visionClearedPings: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}
