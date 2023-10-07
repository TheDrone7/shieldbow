import { Collection } from '@discordjs/collection';
import type { ICDragonChampion, IDataDragonChampion, IMerakiChampion, StatName } from 'types';
import { ChampionSkin } from './skin';
import { ChampionStat } from './stat';
import { ChampionInfo } from './info';
import { ChampionSpell } from './ability';
import { ChampionPassive } from './passive';
import { Client } from 'client';

/**
 * Represents the pricing of a champion.
 */
export interface ChampionPricing {
  /**
   * The price of the champion in Blue Essence.
   */
  readonly be: number;
  /**
   * The price of the champion in Riot Points.
   */
  readonly rp: number;
  /**
   * The sale price of the champion in Riot Points (if the champion is on sale).
   */
  readonly sale: number;
}

/**
 * Represents a champion in League of Legends.
 */
export class Champion {
  /**
   * The ID of the champion.
   */
  readonly id: string;
  /**
   * The key of the champion.
   */
  readonly key: number;
  /**
   * The name of the champion.
   */
  readonly name: string;
  /**
   * The title of the champion.
   */
  readonly title: string;
  /**
   * The tags of the champion.
   */
  readonly tags: string[];
  /**
   * The lore of the champion.
   */
  readonly lore: string;
  /**
   * The blurb of the champion.
   */
  readonly blurb: string;
  /**
   * The ally tips of the champion.
   */
  readonly allyTips: string[];
  /**
   * The enemy tips of the champion.
   */
  readonly enemyTips: string[];
  /**
   * The partype of the champion.
   */
  readonly partype: string;
  /**
   * The skins of the champion.
   */
  readonly skins: ChampionSkin[];
  /**
   * The stats of the champion.
   */
  readonly stats: Collection<StatName, ChampionStat>;
  /**
   * The info of the champion.
   */
  readonly info: ChampionInfo;
  /**
   * The attack type of the champion.
   */
  readonly attackType: 'MELEE' | 'RANGED';
  /**
   * The adaptive type of the champion.
   */
  readonly adaptiveType: 'PHYSICAL_DAMAGE' | 'MAGIC_DAMAGE';
  /**
   * The release date of the champion.
   */
  readonly releaseDate: Date;
  /**
   * The patch the champion was last changed in.
   */
  readonly patchLastChanged: string;
  /**
   * The patch the champion was released in.
   */
  readonly releasePatch: string;
  /**
   * The pricing of the champion.
   */
  readonly pricing: ChampionPricing;
  /**
   * The faction that the champion is associated with.
   */
  readonly faction: string;
  /**
   * The passive of the champion.
   */
  readonly passive: ChampionPassive;
  /**
   * The spells of the champion.
   */
  readonly spells: Collection<'Q' | 'W' | 'E' | 'R', ChampionSpell>;

  /**
   * Creates a new Champion instance.
   * @param client - The client.
   * @param dDragon - The Data Dragon champion data.
   * @param cDragon - The Community Dragon champion data.
   * @param meraki - The Meraki champion data.
   */
  constructor(client: Client, dDragon: IDataDragonChampion, cDragon: ICDragonChampion, meraki: IMerakiChampion) {
    this.id = dDragon.id;
    this.key = parseInt(dDragon.key);
    this.name = dDragon.name;
    this.title = dDragon.title;
    this.tags = dDragon.tags;
    this.lore = dDragon.lore;
    this.blurb = dDragon.blurb;
    this.allyTips = dDragon.allytips;
    this.enemyTips = dDragon.enemytips;
    this.partype = dDragon.partype;
    this.skins = dDragon.skins.map(
      (skin) => new ChampionSkin(skin, meraki.skins.find((ms) => ms.id.toString() === skin.id)!)
    );
    this.stats = new Collection<StatName, ChampionStat>();
    this.info = new ChampionInfo(dDragon.info);
    this.attackType = meraki.attackType;
    this.adaptiveType = meraki.adaptiveType;
    this.releaseDate = new Date(meraki.releaseDate);
    this.patchLastChanged = meraki.patchLastChanged;
    this.releasePatch = meraki.releasePatch;
    this.pricing = {
      be: meraki.price.blueEssence,
      rp: meraki.price.rp,
      sale: meraki.price.saleRp
    };
    this.faction = meraki.faction;
    this.passive = new ChampionPassive(client, dDragon.passive, meraki.abilities.P);
    this.spells = new Collection<'Q' | 'W' | 'E' | 'R', ChampionSpell>();

    // Set the champion's stats.
    this.stats.set('hp', new ChampionStat(dDragon.stats.hp, dDragon.stats.hpperlevel));
    this.stats.set('mp', new ChampionStat(dDragon.stats.mp, dDragon.stats.mpperlevel));
    this.stats.set('moveSpeed', new ChampionStat(dDragon.stats.movespeed, 0));
    this.stats.set('armor', new ChampionStat(dDragon.stats.armor, dDragon.stats.armorperlevel));
    this.stats.set('magicResist', new ChampionStat(dDragon.stats.spellblock, dDragon.stats.spellblockperlevel));
    this.stats.set('attackRange', new ChampionStat(dDragon.stats.attackrange, 0));
    this.stats.set('hpRegen', new ChampionStat(dDragon.stats.hpregen, dDragon.stats.hpregenperlevel));
    this.stats.set('mpRegen', new ChampionStat(dDragon.stats.mpregen, dDragon.stats.mpregenperlevel));
    this.stats.set('crit', new ChampionStat(dDragon.stats.crit, dDragon.stats.critperlevel));
    this.stats.set('attackDamage', new ChampionStat(dDragon.stats.attackdamage, dDragon.stats.attackdamageperlevel));
    this.stats.set('attackSpeed', new ChampionStat(dDragon.stats.attackspeed, dDragon.stats.attackspeedperlevel));

    // Set the champion's spells.
    this.spells.set('Q', new ChampionSpell(client, this, dDragon.spells[0], cDragon, meraki.abilities.Q));
    this.spells.set('W', new ChampionSpell(client, this, dDragon.spells[1], cDragon, meraki.abilities.W));
    this.spells.set('E', new ChampionSpell(client, this, dDragon.spells[2], cDragon, meraki.abilities.E));
    this.spells.set('R', new ChampionSpell(client, this, dDragon.spells[3], cDragon, meraki.abilities.R));
  }
}
