import type { BaseManager } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import path from 'path';
import fs from 'fs-extra';

/**
 * A basic manager for storing and fetching the local cached JSON files.
 */
export class StorageManager implements BaseManager {
  private readonly _root: string;
  private _pathName: string;
  /**
   * An in-memory cache that stores the JSON data to serve data faster.
   */
  readonly cache: Collection<string, any>;
  /**
   * The client this Manager belongs to.
   */
  readonly client: Client;

  constructor(client: Client, pathName: string, root: string) {
    this.client = client;
    this._root = root;
    this._pathName = path.join(process.cwd(), root, pathName);
    this.cache = new Collection<string, any>();
  }

  /**
   * Fetch the locally stored JSON file by its name.
   * @param id The name of the JSON file.
   */
  fetch(id: string) {
    if (this.cache.has(id)) return this.cache.get(id);
    const contentPath = path.join(this._pathName, id + '.json');
    const exists = fs.existsSync(contentPath);
    if (!exists) return;
    return JSON.parse(fs.readFileSync(contentPath).toString());
  }

  /**
   * Store a JSON file locally.
   *
   * @param id The name of the JSON file.
   * @param data The JSON data that needs to be stored.
   */
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

  /**
   * The path of the base directory to fetch/store files from/in.
   * @param newPath The new path.
   */
  set pathName(newPath: string) {
    this._pathName = path.join(process.cwd(), this._root, newPath);
  }
}
