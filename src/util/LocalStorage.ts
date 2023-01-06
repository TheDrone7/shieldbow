import type { IStorage } from '../types';
import { Collection } from '@discordjs/collection';
import type { Client } from '../client';
import path from 'node:path';
import fs from 'fs-extra';

/**
 * A basic storage plugin that stores data to the local file system.
 */
export class LocalStorage implements IStorage {
  private readonly _pathName: string;

  private readonly cache: Collection<string, any>;
  private readonly client: Client;

  /**
   * Creates a new LocalStorage instance.
   * @param client - The client to use.
   * @param root - The root path to use.
   */
  constructor(client: Client, root: string) {
    this.client = client;
    this._pathName = path.join(process.cwd(), root);
    this.cache = new Collection<string, any>();
  }

  /**
   * Fetches a value from storage.
   * @param id - The file name of the value to fetch.
   * @param key - The path to the value to fetch.
   */
  async fetch<T>(key: string, id: string) {
    return new Promise<T>((resolve, reject) => {
      if (this.cache.has(key + id)) resolve(this.cache.get(key + id));
      key = path.join(...key.split(':'));
      const contentPath = path.join(this._pathName, key, id + '.json');
      const exists = fs.existsSync(contentPath);
      this.client.logger?.trace(`(Local fetch) File path: ${contentPath}, exists: ${exists}.`);
      if (!exists) reject('File does not exist.');
      else {
        const content = fs.readFileSync(contentPath).toString();
        if (content.trim().length === 0) {
          // Detect file corruption #6
          fs.unlinkSync(contentPath);
          reject('File is empty.');
        } else
          try {
            resolve(JSON.parse(content));
          } catch (e: any) {
            reject(`Invalid JSON file in cache encountered: ${contentPath}`);
          }
      }
    });
  }

  /**
   * Deletes a value from storage.
   * @param key - The path to the value to delete.
   * @param id - The file name of the value to delete.
   */
  remove(key: string, id: string): void {
    key = path.join(...key.split(':'));
    const contentPath = path.join(this._pathName, key, id + '.json');
    const exists = fs.existsSync(contentPath);
    this.client.logger?.trace(`(Local remove) File path: ${contentPath}, exists: ${exists}.`);
    if (exists) fs.unlinkSync(contentPath);
  }

  /**
   * Saves a value to storage.
   * @param value - The value to save.
   * @param key - The path to the value to save.
   * @param id - The file name of the value to save.
   */
  async save<T>(value: T, key: string, id: string) {
    return new Promise<T>((resolve) => {
      key = path.join(...key.split(':'));
      const contentPath = path.join(this._pathName, key, id + '.json');
      const exists = fs.existsSync(contentPath);
      this.client.logger?.trace(`(Local save) File path: ${contentPath}, exists: ${exists}.`);
      if (exists) {
        // This should not happen, but just in case.
        // v1 used to throw an error here. In v2, we will just overwrite the file.
        // This is because the file may have been corrupted, and we want to make sure.
        this.client.logger?.warn(`(Local save) File already exists: ${contentPath}. This should not happen.
        If you can reproduce this, please enable logging at 'TRACE' level and create a GitHub issue and paste the trace there.`);
        fs.unlinkSync(contentPath);
      }
      fs.ensureFileSync(contentPath);
      fs.writeFileSync(contentPath, JSON.stringify(value, null, 2));
      this.cache.set(key + id, value);
      resolve(value);
    });
  }

  async search<T>(key: string, query: { [key: string]: any }) {
    return new Promise<T[]>((resolve, reject) => {
      key = path.join(...key.split(':'));
      const contentPath = path.join(this._pathName, key);
      const exists = fs.existsSync(contentPath);
      this.client.logger?.trace(`(Local search) File path: ${contentPath}, exists: ${exists}.`);
      const result: T[] = [];
      if (!exists) resolve(result);
      else {
        for (const file of fs.readdirSync(contentPath)) {
          const content = JSON.parse(fs.readFileSync(path.join(contentPath, file)).toString());
          if (content) {
            let found = true;
            for (const [k, v] of Object.entries(query))
              if (!content[k] || content[k] !== v) {
                found = false;
                break;
              }

            if (found) {
              result.push(content as T);
              break;
            }
          }
        }
        if (result) resolve(result);
        else reject('No results found.');
      }
    });
  }
}
