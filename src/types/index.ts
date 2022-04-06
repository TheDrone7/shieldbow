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

export type { AccountData } from './Account';
export type { SummonerData } from './Summoner';
export type { ChampionMasteryData } from './ChampionMastery';

export type { ChampionData, SpellData, SpellDamageData, MerakiSkin, MerakiChampion } from './Champion';
export type { ImageData } from './Image';
export type { BaseManager } from './BaseManager';
export type { ClientConfig } from './ClientConfig';
export type { ItemData } from './Item';
export type { RuneData, RuneTreeData } from './Rune';
export type { SummonerSpellData } from './SummonerSpell';
export type { Season, Queue, GameMap, GameMode, GameType } from './GameConstants';
export type { LeagueEntryData } from './LeagueEntry';
export type { LeagueListData } from './LeagueList';
