import type { Client } from 'client';
import { SummonerSpellManager as WebSSM, IDDragonSummonerSpell, SummonerSpell } from '@shieldbow/web';
import { FetchOptions } from 'types';
import { Collection } from '@discordjs/collection';
import { parseFetchOptions } from 'utilities';

/**
 * A spell manager - to fetch and manage all summoner spell data.
 */
export class SummonerSpellManager extends WebSSM {
  /**
   * The client this summoner spell manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new summoner spell manager.
   * @param client - The client this summoner spell manager belongs to.
   */
  constructor(client: Client) {
    super(client);
    this.client = client;
  }

  /**
   * Fetch all summoner spells.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summonerSpells', options);
    const { cache } = opts;

    try {
      const spells = <{ [id: string]: IDDragonSummonerSpell }>await this._fetchSpellsFromDDragon(opts);
      const result = new Collection<string, SummonerSpell>();
      for (const key of Object.keys(spells)) {
        const summonerSpell = new SummonerSpell(this.client, spells[key]);
        result.set(key, summonerSpell);
        const toCache = typeof cache === 'function' ? cache(summonerSpell) : !!cache;
        if (toCache) await this.client.cache.set(`spell:${key}`, summonerSpell);
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
      const cached = await this.client.cache.get<SummonerSpell>(`spell:${key}`);
      if (cached) {
        const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
        if (!toIgnoreCache) return cached;
      }

      const spells = await this.fetchAll(opts);
      if (spells.has(key)) return spells.get(key)!;
      else return Promise.reject('There is no spell with that ID');
    } catch (error) {
      return Promise.reject(error);
    }
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
    if (spell) {
      const toIgnoreCache = typeof opts.ignoreCache === 'function' ? opts.ignoreCache(spell) : !!opts.ignoreCache;
      if (!toIgnoreCache) return spell;
    }
    try {
      const spells = await this.fetchAll(opts);
      return spells.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected async _fetchSpellsFromDDragon(options: FetchOptions) {
    this.client.logger?.trace(`Checking storage for summoner spells`);
    try {
      const ssData = await this.client.storage.load<{ [key: string]: IDDragonSummonerSpell }>(
        `ddragon-${this.client.version}`,
        'spell'
      );
      const toIgnoreStorage =
        typeof options.ignoreStorage === 'function' ? options.ignoreStorage(ssData) : !!options.ignoreStorage;
      if (toIgnoreStorage) throw new Error('Ignoring storage');
      else return ssData;
    } catch (error) {
      this.client.logger?.trace(`Fetching summoner spells from DDragon`);
      const response = await this.client.fetch<{ data: unknown }>(
        this.client.generateUrl(`summoner.json`, 'dDragon', !!options.noVersion)
      );
      if (!response.data) return Promise.reject('Unable to fetch summoner spells from DDragon');

      const toStore = typeof options.store === 'function' ? options.store(response.data) : !!options.store;
      if (toStore) await this.client.storage.save(`ddragon-${this.client.version}`, 'spell', response.data);
      return response.data;
    }
  }
}
