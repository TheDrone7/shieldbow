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
export type regions = 'br' | 'eune' | 'euw' | 'lan' | 'las' | 'na' | 'oce' | 'ru' | 'tr' | 'jp' | 'kr' | 'pbe';
export type stats =
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
export type locales = typeof locale[number];

export type { ChampionData, SpellData, SpellDamageData } from './champion';
export type { ImageData } from './image';
export type { BaseManager } from './BaseManager';
