import type { ChampionData, SpellDamageData, Stats } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { ChampionStat, ChampionSkin, ChampionSpell } from './index';

/**
 * The representation of a League of Legends champion.
 */
export class Champion {
  readonly client: Client;
  /**
   * The name of the champion.
   */
  readonly name: string;
  /**
   * The ID of the champion. To get the ID, in the champion's name
   * - Capitalize the words
   * - Remove any spaces and special characters
   * - The words after a `'` - such as in Kai'sa, remain lowercase.
   *
   * Examples:
   * - Kayn -> Kayn
   * - Cho'Gath -> Chogath
   * - Dr. Mundo -> DrMundo
   *
   * There are 2 exceptions to this rule.
   * 1. Wukong -> MonkeyKing
   * 2. Renata Glasc -> Renata
   */
  readonly id: string;
  /**
   * The key - a 3-digit number, that is used to identify the champion.
   */
  readonly key: string;
  /**
   * A title given to the champion based on their lore.
   */
  readonly title: string;
  /**
   * A URL to the champion's icon.
   */
  readonly icon: string;
  /**
   * The complete lore of the champion.
   */
  readonly lore: string;
  /**
   * A shortened version of the champion's lore.
   */
  readonly blurb: string;
  /**
   * An array of tips to play against this champion.
   */
  readonly enemyTips: string[];
  /**
   * An array of tips to play as/along this champion.
   */
  readonly allyTips: string[];
  /**
   * The champion classes this champion belongs to, such as - Fighter, Tank, Assassin, etc.
   */
  readonly classes: string[];
  /**
   * The resource represented by the bar below this champion's health bar in game.
   */
  readonly resource: string;
  /**
   * A collection of the champion's base stats.
   */
  readonly stats: Collection<Stats, ChampionStat>;
  /**
   * A collection of the available skins for this champion.
   * The default skin always has the id - `0`.
   */
  readonly skins: Collection<number, ChampionSkin>;
  /**
   * The champion's spells (abilities), mapped by the key they are assigned to, by default - Q, W, E, R, respectively.
   */
  readonly spells: Collection<'Q' | 'W' | 'E' | 'R', ChampionSpell>;
  /**
   * The champion's magic, defense, attack, difficulty ratings.
   */
  readonly ratings: { magic: number; difficulty: number; defense: number; attack: number };
  /**
   * The champion's passive ability summarized.
   */
  readonly passive: { name: string; icon: string; description: string };

  constructor(client: Client, data: ChampionData, damage: SpellDamageData) {
    this.client = client;
    this.name = data.name;
    this.id = data.id;
    this.key = data.key;
    this.title = data.title;
    this.icon = `${client.base}${client.version}/img/champion/${data.image.full}`;
    this.lore = data.lore;
    this.blurb = data.blurb;
    this.enemyTips = data.enemytips;
    this.allyTips = data.allytips;
    this.classes = data.tags;
    this.resource = data.partype;
    this.stats = new Collection();
    this.stats.set('hp', new ChampionStat(data.stats.hp, data.stats.hpperlevel));
    this.stats.set('mp', new ChampionStat(data.stats.mp, data.stats.mpperlevel));
    this.stats.set('ms', new ChampionStat(data.stats.movespeed, 0));
    this.stats.set('armor', new ChampionStat(data.stats.armor, data.stats.armorperlevel));
    this.stats.set('spellBlock', new ChampionStat(data.stats.spellblock, data.stats.spellblockperlevel));
    this.stats.set('hpRegen', new ChampionStat(data.stats.hpregen, data.stats.hpregenperlevel));
    this.stats.set('mpRegen', new ChampionStat(data.stats.mpregen, data.stats.mpregenperlevel));
    this.stats.set('attackRange', new ChampionStat(data.stats.attackrange, 0));
    this.stats.set('attackDamage', new ChampionStat(data.stats.attackdamage, data.stats.attackdamageperlevel));
    this.stats.set('attackSpeed', new ChampionStat(data.stats.attackspeed, data.stats.attackspeedperlevel / 100));
    this.stats.set('crit', new ChampionStat(data.stats.crit, data.stats.critperlevel));
    this.skins = new Collection<number, ChampionSkin>();
    this.spells = new Collection<'Q' | 'W' | 'E' | 'R', ChampionSpell>();

    data.skins.map((s) => this.skins.set(s.num, new ChampionSkin(this, s)));
    data.spells.map((s, i) => {
      const keys = ['Q', 'W', 'E', 'R'] as const;
      const key = keys[i];
      this.spells.set(key, new ChampionSpell(this, s, damage));
    });

    this.ratings = {
      attack: data.info.attack,
      defense: data.info.defense,
      magic: data.info.magic,
      difficulty: data.info.difficulty
    };

    this.passive = {
      name: data.passive.name,
      description: data.passive.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\.(?=\w\D)/g, '.\n\n'),
      icon: `${client.base}${client.version}/img/passive/${data.passive.image.full}`
    };
  }

  /**
   * The champion's default skin splash art.
   */
  get defaultSplashArt() {
    return this.skins.get(0)!.splashArt;
  }

  /**
   * The champion's default skin loading screen art.
   */
  get defaultLoadingScreen() {
    return this.skins.get(0)!.loadingScreen;
  }
}
