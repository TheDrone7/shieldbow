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

export type { ILogger, LogLevel } from './ILogger';
export { LoggerLevel } from './ILogger';

export type { ICache } from './ICache';
export type { IStorage } from './IStorage';
export type { BaseManager } from './BaseManager';

export * from './config';
export * from './dragon';
export * from './api';

export type { Season, Queue, GameMap, GameMode, GameType } from './GameConstants';
