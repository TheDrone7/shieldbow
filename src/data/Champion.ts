import type { ChampionData, stats } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { ChampionStat, ChampionSkin, ChampionSpell } from './index';

export class Champion {
  readonly client: Client;
  readonly name: string;
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly lore: string;
  readonly blurb: string;
  readonly enemyTips: string[];
  readonly allyTips: string[];
  readonly classes: string[];
  readonly barType: string;
  readonly stats: Collection<stats, ChampionStat>;
  readonly skins: Collection<number, ChampionSkin>;
  readonly spells: Collection<string, ChampionSpell>;
  readonly ratings: { magic: number; difficulty: number; defense: number; attack: number };
  readonly passive: { name: string; icon: string; description: string };

  constructor(client: Client, data: ChampionData) {
    this.client = client;
    this.name = data.name;
    this.id = data.key;
    this.title = data.title;
    this.icon = `${client.base}${client.version}/img/champion/${data.image.full}`;
    this.lore = data.lore;
    this.blurb = data.blurb;
    this.enemyTips = data.enemytips;
    this.allyTips = data.allytips;
    this.classes = data.tags;
    this.barType = data.partype;
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
    this.skins = new Collection();
    this.spells = new Collection();

    data.skins.map((s) => this.skins.set(s.num, new ChampionSkin(this, s)));
    data.spells.map((s) => {
      const key = s.id.includes(this.name + 'Q') ? 'Q' : s.id.includes(this.name + 'W') ? 'W' : s.id.includes(this.name + 'E') ? 'E' : 'R';
      this.spells.set(key, new ChampionSpell(this, s));
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

  get defaultSplashArt() {
    return this.skins.get(0)!.splashArt;
  }

  get defaultLoadingScreen() {
    return this.skins.get(0)!.loadingScreen;
  }
}
