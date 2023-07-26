/**
 * Meraki Champion Stat Structure
 */
export interface IMerakiChampionStat {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
}

/**
 * Meraki Champion Ability Effect Structure
 */
export interface IMerakiChampionAbilityEffect {
  description: string;
  leveling: {
    attribute: string;
    modifiers: {
      values: number[];
      units: string[];
    }[];
  }[];
}

/**
 * Meraki Champion Ability Structure
 */
export interface IMerakiChampionAbility {
  name: string;
  icon: string;
  effects: IMerakiChampionAbilityEffect[];
  cost: null;
  cooldown: {
    modifiers: {
      values: number[];
      units: string[];
    }[];
    affectedByCdr: boolean;
  };
  targeting: string;
  affects: string;
  spellshieldable: string;
  resource: null;
  damageType: string;
  spellEffects: string;
  projectile: null;
  onHitEffects: null;
  occurrence: null;
  notes: string;
  blurb: string;
  missileSpeed: null;
  rechargeRate: null;
  collisionRadius: null;
  tetherRadius: null;
  onTargetCdStatic: null;
  innerRadius: null;
  speed: null;
  width: null;
  angle: null;
  castTime: null;
  effectRadius: null;
  targetRange: null;
}

/**
 * Meraki Champion Skin Chroma Structure
 */
export interface IMerakiChampionSkinChroma {
  name: string;
  id: number;
  chromaPath: string;
  colors: string[];
  descriptions: {
    description: null | string;
    region: null | string;
  }[];
  rarities: {
    rarity: number;
    region: string;
  }[];
}

/**
 * Meraki Champion Skin Structure
 */
export interface IMerakiChampionSkin {
  name: string;
  id: number;
  isBase: boolean;
  availability: string;
  formatName: string;
  lootEligible: boolean;
  cost: number;
  sale: number;
  distribution: null;
  rarity: string;
  chromas: IMerakiChampionSkinChroma[];
  lore: string;
  release: string;
  set: string[];
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  loadScreenVintagePath: null | string;
  newEffects: boolean;
  newAnimations: boolean;
  newRecall: boolean;
  newVoice: boolean;
  newQuotes: boolean;
  voiceActor: string[];
  splashArtist: string[];
}

/**
 * Meraki Champion Structure
 */
export interface IMerakiChampion {
  id: number;
  key: string;
  name: string;
  title: string;
  fullName: string;
  icon: string;
  resource: string;
  attackType: 'MELEE' | 'RANGED';
  adaptiveType: string;
  stats: {
    health: IMerakiChampionStat;
    healthRegen: IMerakiChampionStat;
    mana: IMerakiChampionStat;
    manaRegen: IMerakiChampionStat;
    armor: IMerakiChampionStat;
    magicResistance: IMerakiChampionStat;
    attackDamage: IMerakiChampionStat;
    movespeed: IMerakiChampionStat;
    acquisitionRadius: IMerakiChampionStat;
    selectionRadius: IMerakiChampionStat;
    pathingRadius: IMerakiChampionStat;
    gameplayRadius: IMerakiChampionStat;
    criticalStrikeDamage: IMerakiChampionStat;
    criticalStrikeDamageModifier: IMerakiChampionStat;
    attackSpeed: IMerakiChampionStat;
    attackSpeedRatio: IMerakiChampionStat;
    attackCastTime: IMerakiChampionStat;
    attackTotalTime: IMerakiChampionStat;
    attackDelayOffset: IMerakiChampionStat;
    attackRange: IMerakiChampionStat;
    aramDamageTaken: IMerakiChampionStat;
    aramDamageDealt: IMerakiChampionStat;
    aramHealing: IMerakiChampionStat;
    aramShielding: IMerakiChampionStat;
    urfDamageTaken: IMerakiChampionStat;
    urfDamageDealt: IMerakiChampionStat;
    urfHealing: IMerakiChampionStat;
    urfShielding: IMerakiChampionStat;
  };
  roles: string[];
  attributeRatings: {
    damage: number;
    toughness: number;
    control: number;
    mobility: number;
    utility: number;
    abilityReliance: number;
    difficulty: number;
  };
  abilities: {
    [k in 'P' | 'Q' | 'W' | 'E' | 'R']: IMerakiChampionAbility[];
  };
  releaseDate: string;
  releasePatch: string;
  patchLastChanged: string;
  price: {
    blueEssence: number;
    rp: number;
    saleRp: number;
  };
  lore: string;
  faction: string;
  skins: IMerakiChampionSkin[];
}
