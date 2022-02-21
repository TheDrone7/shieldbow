import type { BaseManager } from '../../types';
import type { Client } from '../../client';
import Collection from '@discordjs/collection';
import path from 'path';
import fs from 'fs-extra';

export class StorageManager implements BaseManager {
  private _pathName: string;
  readonly cache: Collection<string, any>;
  readonly client: Client;

  constructor(client: Client, pathName: string) {
    this.client = client;
    this._pathName = path.join(process.cwd(), pathName);
    this.cache = new Collection<string, any>();
  }

  fetch(id: string) {
    if (this.cache.has(id)) return this.cache.get(id);
    const contentPath = path.join(this._pathName, id + '.json');
    const exists = fs.existsSync(contentPath);
    if (!exists) return;
    return JSON.parse(fs.readFileSync(contentPath).toString());
  }

  store(id: string, data: any) {
    const contentPath = path.join(this._pathName, id + '.json');
    const exists = fs.existsSync(contentPath);
    if (exists) throw new Error('The data already exists. A redundant request is being made.');
    else {
      fs.ensureFileSync(contentPath);
      fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));
      this.cache.set(id, data);
    }
  }

  set pathName(newPath: string) {
    this._pathName = path.join(process.cwd(), newPath);
  }
}
