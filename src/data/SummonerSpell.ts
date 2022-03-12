import type { GameMode, SummonerSpellData } from '../types';
import type { Client } from '../client';

/**
 * A class representing an in-game summoner spell.
 */
export class SummonerSpell {
  /**
   * The client this summoner spell's manager belongs to.
   */
  readonly client: Client;
  /**
   * The ID of this summoner spell.
   */
  readonly id: string;
  /**
   * The numerical ID of this summoner spell.
   */
  readonly key: number;
  /**
   * The name of this summoner spell.
   */
  readonly name: string;
  /**
   * The description of this summoner spell.
   */
  readonly description: string;
  /**
   * The raw tooltip of this summoner spell.
   * This contains some HTML-like tags to help view this better on webpages.
   *
   * Even though, these are supposed to be more detailed than the {@link description}.
   * It is not recommended using either this OR {@link tooltip}.
   * This is because they contain placeholders without values to fill them with.
   * Use {@link description} instead.
   *
   * See {@link tooltip | tooltip} to view this with the HTML-like tags stripped out.
   */
  readonly _rawTooltip: string;
  /**
   * The cooldown of this summoner spell (in seconds)
   */
  readonly cooldown: number;
  /**
   * The level of this summoner spell.
   * This is the summoner level at which you unlock this spell.
   */
  readonly summonerLevel: number;
  /**
   * The game modes you can pick this summoner spell in.
   */
  readonly modes: GameMode[];
  /**
   * Number of times you can use this spell before it goes on a cooldown.
   */
  readonly maxAmmo: number;
  /**
   * The range of this spell, i.e. how many units far away can you cast this from.
   */
  readonly range: number;
  /**
   * A link to the image that represents this summoner spell.
   */
  readonly image: string;

  constructor(client: Client, data: SummonerSpellData) {
    this.client = client;
    this.id = data.id;
    this.key = parseInt(data.key);
    this.name = data.name;
    this.description = data.description;
    this._rawTooltip = data.tooltip;
    this.cooldown = parseInt(data.cooldownBurn);
    this.summonerLevel = data.summonerLevel;
    this.modes = client.gameModes.filter((m) => data.modes.includes(m.gameMode));
    this.maxAmmo = parseInt(data.maxammo);
    this.range = parseInt(data.rangeBurn);
    this.image = client.base + client.version + `/img/spell/${data.image.full}`;
  }

  /**
   * The tooltip of this summoner spell.
   * This does not contain the HTML-like tags to help view this better on console and other output media.
   *
   * See {@link _rawTooltip | _rawTooltip} to view this with the HTML-like tags included.
   */
  get tooltip() {
    return this._rawTooltip
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }
}
