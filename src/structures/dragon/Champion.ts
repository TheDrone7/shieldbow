import type {
  ChampionData,
  ChampionPassive,
  ChampionPricing,
  ChampionRating,
  ChampionSprite,
  MerakiChampion,
  MerakiSkin,
  SpellDamageData,
  SpellData,
  Stats
} from '../../types';
import type { Client } from '../../client';
import { Collection } from '@discordjs/collection';
import { ChampionSkin, ChampionSpell, ChampionStat } from '../index';

/**
 * A representation of a League of Legends champion.
 */
export class Champion {
  /**
   * The name of the champion.
   */
  readonly name: string;
  /**
   * The ID of the champion. To get the ID, in the champion's name
   *
   * - Capitalize the words
   *
   * - Remove any spaces and special characters
   *
   * - The words after a `'` - such as in Kai'sa, remain lowercase.
   *
   * Examples:
   *
   * - Kayn -\> Kayn
   *
   * - Cho'Gath -\> Chogath
   *
   * - Dr. Mundo -\> DrMundo
   *
   * There are 2 exceptions to this rule.
   *
   * 1. Wukong -\> MonkeyKing
   *
   * 2. Renata Glasc -\> Renata
   */
  readonly id: string;
  /**
   * The key - a 3-digit number, that is used to identify the champion.
   */
  readonly key: number;
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
  readonly ratings: ChampionRating;
  /**
   * The champion's passive ability summarized.
   */
  readonly passive: ChampionPassive;
  /**
   * The in-game pricing of the champion.
   */
  readonly pricing: ChampionPricing;
  /**
   * The sprite information of the champion.
   */
  readonly sprite: ChampionSprite;
  /**
   * The type of this champion's basic attacks - RANGED or MELEE.
   */
  readonly attackType: string;
  /**
   * The date this champion was released on.
   */
  readonly releaseDate: string;
  /**
   * The patch this champion was introduced to the live servers.
   */
  readonly releasePatch: string;

  /**
   * Creates a new champion instance.
   * @param client - The client creating this instance.
   * @param data - The raw champion data from data dragon.
   * @param damage - The raw champion data from community dragon
   * @param meraki - The raw champion data from meraki analytics
   */
  constructor(client: Client, data: ChampionData, damage: SpellDamageData, meraki: MerakiChampion) {
    this.name = data.name;
    this.id = data.id;
    this.key = parseInt(data.key);
    this.title = data.title;
    this.icon = `${client.cdnBase}${client.version}/img/champion/${data.image.full}`;
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
    this.attackType = meraki.attackType;
    this.releaseDate = meraki.releaseDate;
    this.releasePatch = meraki.releasePatch;
    this.pricing = {
      be: meraki.price.blueEssence,
      rp: meraki.price.rp,
      sale: meraki.price.saleRp
    };

    data.skins
      .filter((s: { id: string }) => meraki.skins.find((ms: MerakiSkin) => ms.id.toString() === s.id))
      .map((s: { id: string; name: string; num: number; chromas: boolean }) =>
        this.skins.set(
          s.num,
          new ChampionSkin(this, s, meraki.skins.find((ms: MerakiSkin) => ms.id.toString() === s.id)!)
        )
      );
    data.spells.map((s: SpellData, i: number) => {
      const keys = ['Q', 'W', 'E', 'R'] as const;
      const key = keys[i];
      this.spells.set(key, new ChampionSpell(client, this, s, damage));
    });

    this.ratings = data.info;

    this.passive = {
      name: data.passive.name,
      description: data.passive.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\.(?=\w\D)/g, '.\n\n'),
      icon: `${client.cdnBase}${client.version}/img/passive/${data.passive.image.full}`
    };

    this.sprite = {
      coordinate: { x: data.image.x, y: data.image.y },
      image: `${client.cdnBase}${client.version}/img/sprite/${data.image.sprite}`,
      size: { h: data.image.h, w: data.image.w }
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
