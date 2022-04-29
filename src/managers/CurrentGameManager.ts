import type { BaseManager, CurrentGameData } from '../types';
import type { Client } from '../client';
import { CurrentGame } from '../structures';
import Collection from '@discordjs/collection';

/**
 * A current game manager - to fetch and manage the live games.
 */
export class CurrentGameManager implements BaseManager<CurrentGame> {
  /**
   * The cached live games (mapped by summoner IDs).
   */
  readonly cache: Collection<string, CurrentGame>;
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.cache = new Collection<string, CurrentGame>();
    this.client = client;
  }

  /**
   * Fetches the live game for the given summoner ID.
   *
   * This method is a special case where the cache is ignored by default.
   *
   * @param id The summoner ID to fetch the live game for.
   * @param options The basic fetching options.
   */
  fetch(id: string, options: { force: boolean } = { force: true }) {
    return new Promise<CurrentGame>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/spectator/v4/active-games/by-summoner/' + id, {
            regional: false,
            name: 'Current match by summoner ID',
            params: 'Summoner ID: ' + id
          })
          .catch(reject);
        if (response) {
          const game = new CurrentGame(this.client, response.data);
          this.cache.set(id, game);
          resolve(game);
        }
      }
    });
  }

  /**
   * Fetch a list of featured games.
   * These games are not cached.
   */
  fetchFeatured() {
    return new Promise<CurrentGame[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest('/lol/spectator/v4/featured-games', {
          regional: false,
          name: 'Featured matches',
          params: 'no params'
        })
        .catch(reject);
      if (response) {
        const games = response.data.gameList.map((g: CurrentGameData) => new CurrentGame(this.client, g));
        resolve(games);
      }
    });
  }
}
