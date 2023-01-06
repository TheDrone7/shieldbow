/**
 * A list of all valid locales.
 */
export const locale = [
  'cs_CZ',
  'el_GR',
  'pl_PL',
  'ro_RO',
  'hu_HU',
  'en_GB',
  'de_DE',
  'es_ES',
  'it_IT',
  'fr_FR',
  'ja_JP',
  'ko_KR',
  'es_MX',
  'es_AR',
  'pt_BR',
  'en_US',
  'en_AU',
  'ru_RU',
  'tr_TR',
  'ms_MY',
  'en_PH',
  'en_SG',
  'th_TH',
  'vn_VN',
  'id_ID',
  'zh_MY',
  'zh_CN',
  'zh_TW'
] as const;
/**
 * A valid League of Legends region.
 */
export type Region =
  | 'br'
  | 'eune'
  | 'euw'
  | 'lan'
  | 'las'
  | 'na'
  | 'oce'
  | 'ru'
  | 'tr'
  | 'jp'
  | 'kr'
  | 'pbe'
  | 'sg'
  | 'th'
  | 'tw'
  | 'vn'
  | 'ph';
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

export type { ILogger, LogLevel } from './ILogger';
export { LoggerLevel } from './ILogger';

export type { ICache } from './ICache';
export type { IStorage } from './IStorage';
export type { BaseManager } from './BaseManager';

export * from './config';
export * from './dragon';
export * from './api';

export type { Season, Queue, GameMap, GameMode, GameType } from './GameConstants';
