import type { StatPerk } from '../types';

export const constants = {
  defaultDDragonBase: 'https://ddragon.leagueoflegends.com/cdn/',
  defaultCDragonBase: 'https://raw.communitydragon.org/',
  defaultMerakiABase: 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/',
  versionsUrl: 'https://ddragon.leagueoflegends.com/realms/',
  allVersionsUrl: 'https://ddragon.leagueoflegends.com/api/versions.json',
  gameModesUrl: 'https://static.developer.riotgames.com/docs/lol/gameModes.json',
  gameTypesUrl: 'https://static.developer.riotgames.com/docs/lol/gameTypes.json',
  mapsUrl: 'https://static.developer.riotgames.com/docs/lol/maps.json',
  queuesUrl: 'https://static.developer.riotgames.com/docs/lol/queues.json',
  seasonsUrl: 'https://static.developer.riotgames.com/docs/lol/seasons.json'
};

/**
 * An array of all possible statistics needed for spell math.
 */
export const Stat = [
  'AP',
  'Armor',
  'AD',
  'AS',
  'AWT',
  'MR',
  'MS',
  'Crit Chance',
  'Crit',
  'CDR',
  'AH',
  'Health',
  'Current HP',
  '% Missing HP',
  'Unknown',
  'Life steal',
  'Unknown',
  'Omnivamp',
  'Physical Vamp',
  'Magic Pen',
  '% Magic Pen',
  '% Bonus Magic Pen',
  'Magic Lethality',
  'Armor Pen',
  '% Armor Pen',
  '% Bonus Armor Pen',
  'Lethality',
  'Tenacity',
  'Attack Range',
  'Health Regen Rate',
  'Resource Regen Rate',
  'Unknown',
  'Unknown',
  'Dodge Chance'
];

/**
 * The available stat perks.
 */
export const rawStatPerks: { [key: number]: StatPerk } = {
  5003: {
    name: 'MagicResist',
    id: 5003,
    description: '+8 Magic Resist'
  },
  5002: {
    name: 'Armor',
    id: 5002,
    description: '+6 Armor'
  },
  5008: {
    name: 'Adaptive',
    id: 5008,
    description: '+9 Adaptive Force'
  },
  5001: {
    name: 'HealthScaling',
    id: 5001,
    description: '+15-140 Health (based on champion level)'
  },
  5007: {
    name: 'CDRScaling',
    id: 5007,
    description: '+8 Ability Haste'
  },
  5005: {
    name: 'AttackSpeed',
    id: 5005,
    description: '+10% Attack Speed'
  }
};

/**
 * The part of the stat that needs to be considered during spell math.
 */
export const StatFormula = ['Base', 'Bonus', 'Total'];
