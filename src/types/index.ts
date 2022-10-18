/**
 * A list of all valid locales.
 */
export const locale = [
  'en_US',
  'cs_CZ',
  'de_DE',
  'el_GR',
  'en_AU',
  'en_GB',
  'en_PH',
  'en_SG',
  'es_AR',
  'es_ES',
  'es_MX',
  'fr_FR',
  'hu_HU',
  'id_ID',
  'it_IT',
  'ja_JP',
  'ko_KR',
  'pl_PL',
  'pt_BR',
  'ro_RO',
  'ru_RU',
  'th_TH',
  'tr_TR',
  'vn_VN',
  'zh_CN',
  'zh_MY',
  'zh_TW'
] as const;
/**
 * A valid League of Legends region.
 */
export type Region = 'br' | 'eune' | 'euw' | 'lan' | 'las' | 'na' | 'oce' | 'ru' | 'tr' | 'jp' | 'kr' | 'pbe';
/**
 * A valid champion stat that affects their in-game interactions.
 */
export type Stats =
  | 'hp'
  | 'mp'
  | 'ms'
  | 'armor'
  | 'spellBlock'
  | 'attackRange'
  | 'hpRegen'
  | 'mpRegen'
  | 'crit'
  | 'attackDamage'
  | 'attackSpeed';
/**
 * A valid locale to fetch the data in.
 */
export type Locales = typeof locale[number];

export * from './LeagueConstants';

export type { ClientConfig, CacheConfig, PreFetchConfig } from './ClientConfig';
export type { MatchByPlayerOptions } from './MatchByPlayerOptions';
export type { FetchOptions } from './FetchOptions';

export type { AccountData } from './Account';
export type { SummonerData } from './Summoner';
export type { ChampionMasteryData } from './ChampionMastery';
export type { LeagueEntryData } from './LeagueEntry';
export type { LeagueListData } from './LeagueList';
export type { MatchData } from './Match';
export type { TeamData, TeamObjectiveData, TeamObjectivesData } from './Team';
export type { CurrentGameBanData, TeamBanData } from './ChampionBan';
export type { ParticipantData } from './Participant';
export type { PerksData, StatPerk } from './Perks';
export type { CurrentGameData } from './CurrentGame';
export type { CurrentGameParticipantData } from './CurrentGameParticipant';
export type { CurrentGamePerksData } from './CurrentGamePerks';
export type { TournamentData, TournamentScheduleData } from './Tournament';
export type { TournamentPlayerData, TournamentPlayerFullData } from './TournamentPlayer';
export type { TournamentTeamData } from './TournamentTeam';
export type {
  MatchTimelineData,
  MatchTimelineInfo,
  MatchTimelineMetadata,
  MatchTimelineFrameData
} from './MatchTimeline';
export type {
  ParticipantFrameData,
  ParticipantChampionStatsData,
  ParticipantDamageStatsData
} from './ParticipantFrame';
export type {
  TimelineEventData,
  PositionData,
  BuildingKillEventData,
  ChampionKillEventData,
  ChampionSpecialKillEventData,
  EliteMonsterKillEventData,
  WardKillEventData,
  WardPlacedEventData,
  DamageDealtData,
  LevelUpEventData,
  SkillLevelUpEventData,
  GameEndEventData,
  PauseEndEventData,
  ItemDestroyedEventData,
  ItemPurchasedEventData,
  ItemUndoEventData,
  ItemSoldEventData,
  TurretPlateDestroyedEventData,
  ObjectiveBountyPrestartEventData,
  ChampionTransformEventData,
  DragonSoulGivenEventData
} from './TimelineEvent';
export type { ChallengeConfigData, LocalizedChallengeData, LocalizedChallengeNameData } from './ChallengeConfig';
export type { ChallengeRankData } from './ChallengeRank';
export type {
  SummonerChallengeData,
  ChallengePreferencesData,
  ChallengeCategoryData,
  ChallengeProgressionData,
  TotalChallengePointsData,
  CategoryName
} from './SummonerChallenge';

export type { ChampionData, MerakiChampion, ChampionRating, ChampionPassive, ChampionPricing } from './Champion';
export type { ChampionSkinData, MerakiSkin, SkinPricing, SkinChroma, MerakiSkinChroma } from './ChampionSkin';
export type { SpellData, SpellDamageData } from './ChampionSpell';
export type { ChampionSprite, SpriteSize, SpriteCoordinate } from './ChampionSprite';
export type { ImageData } from './Image';
export type { BaseManager } from './BaseManager';
export type { ItemData } from './Item';
export type { RuneData, RuneTreeData } from './Rune';
export type { SummonerSpellData } from './SummonerSpell';
export type { Season, Queue, GameMap, GameMode, GameType } from './GameConstants';
