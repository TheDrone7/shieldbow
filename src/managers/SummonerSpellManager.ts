import type { Client } from '../client';
import type { BaseManager, FetchOptions, SummonerSpellData } from '../types';
import { SummonerSpell } from '../structures';
import { Collection } from '@discordjs/collection';
import { parseFetchOptions } from '../util';

/**
 * A spell manager - to fetch and manage all summoner spell data.
 */
export class SummonerSpellManager implements BaseManager<SummonerSpell> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new summoner spell manager.
   * @param client - The client this manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  private async _fetchLocalSpells(options: FetchOptions) {
    const storagePath = ['spells', this.client.patch, this.client.locale].join(':');

    if (!options.ignoreStorage) {
      this.client.logger?.trace(`Fetching summoner spells from local storage`);
      const data = this.client.storage.fetch<{ data: { [id: string]: SummonerSpellData } }>(storagePath, 'spells');
      const result = data instanceof Promise ? await data.catch(() => undefined) : data;
      if (result) return result.data;
    }

    try {
      this.client.logger?.trace(`Fetching summoner spells from DDragon`);
      const response = await this.client.http.get(`${this.client.version}/data/${this.client.locale}/summoner.json`);
      if (response.status !== 200) return Promise.reject('Unable to fetch summoner spells from Data dragon');
      else {
        if (options.store) await this.client.storage.save({ data: response.data.data }, storagePath, 'spells');
        return response.data.data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summonerSpells', options);
    const { cache } = opts;

    try {
      const spells = <{ [id: string]: SummonerSpellData }>await this._fetchLocalSpells(opts);
      const result = new Collection<string, SummonerSpell>();
      for (const key of Object.keys(spells)) {
        const summonerSpell = new SummonerSpell(this.client, spells[key]);
        result.set(key, summonerSpell);
        if (cache) await this.client.cache.set(`spell:${key}`, summonerSpell);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a spell by its ID. The ID is usually something like Summoner\{Spell\}
   * For example, for the spell `Flash`, the ID is `SummonerFlash`.
   * But there are a lot of exceptions to this,
   * so it is recommended to use {@link SummonerSpellManager.fetchByName | fetchByName} instead.
   *
   * @param key - The ID of the spell to fetch.
   * @param options - The basic fetching options.
   */
  async fetch(key: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summonerSpells', options);
    const { ignoreCache } = opts;
    this.client.logger?.trace(`Fetching summoner spell ${key}`);

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`spell:${key}`);
        if (exists) return this.client.cache.get<SummonerSpell>(`spell:${key}`);
      }

      const spells = await this.fetchAll(opts);
      if (spells.has(key)) return spells.get(key)!;
      else return Promise.reject('There is no spell with that ID');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Find a spell by its name.
   *
   * @deprecated Please use {@link SummonerSpellManager.fetchByName | fetchByName} instead.
   * @param name - The name of the spell to look for.
   */
  async findByName(name: string) {
    return this.fetchByName(name);
  }

  /**
   * Fetch a spell by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the spell to look for.
   * @param options - The basic fetching options.
   */
  async fetchByName(name: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summonerSpells', options);
    const spell = await this.client.cache.find((spell: SummonerSpell) =>
      spell.name.toLowerCase().includes(name.toLowerCase())
    );
    if (spell) return spell;
    try {
      const spells = await this.fetchAll(opts);
      return spells.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
