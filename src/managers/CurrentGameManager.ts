import type { BaseManager } from '../types';
import type { Client } from '../client';
import { CurrentGame } from '../structures';
import Collection from '@discordjs/collection';

export class CurrentGameManager implements BaseManager<CurrentGame> {
  readonly cache: Collection<string, CurrentGame>;
  readonly client: Client;

  constructor(client: Client) {
    this.cache = new Collection<string, CurrentGame>();
    this.client = client;
  }

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
}
