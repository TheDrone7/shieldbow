import type { ILocalStorageConfig } from 'config';
import type { IStorage } from 'interface';
import { existsSync, writeFileSync, readFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

/**
 * A memory cache implementation using the node-cache package.
 */
export class ShieldbowLocalStorage implements IStorage {
  /**
   * The root directory where the data will be stored.
   */
  private readonly root: string;

  /**
   * Whether to preserve whitespace in the data.
   */
  preserveWhitespace: boolean;

  /**
   * The constructor for the local file storage.
   *
   * @param config - The configuration for the local file storage.
   */
  constructor(config?: ILocalStorageConfig) {
    this.root = join(process.cwd(), config?.root ?? 'data');
    this.preserveWhitespace = config?.preserveWhitespace ?? false;
  }

  /**
   * Check if a file exists within the specified directory.
   * @param directory - The directory to check.
   * @param file - The file to look for.
   */
  has(directory: string, file: string): boolean | Promise<boolean> {
    return existsSync(`${this.root}/${directory}/${file}.json`);
  }

  /**
   * Load the data from the file.
   * @param directory - The directory to load the file from.
   * @param fileName - The name of the file to load.
   */
  load<T>(directory: string, fileName: string): T | Promise<T> | undefined {
    const path = `${this.root}/${directory}/${fileName}.json`;

    if (!existsSync(path)) return Promise.reject('File does not exist.');
    else return JSON.parse(readFileSync(path, 'utf-8'));
  }

  /**
   * Fetches all available directories under data.
   */
  collections(): string[] | Promise<string[]> {
    const entries = readdirSync(this.root, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  }

  /**
   * Fetches all available files under the specified directory.
   * @param directory - The directory to fetch the files from.
   */
  keys(directory: string): string[] | Promise<string[]> {
    const entries = readdirSync(`${this.root}/${directory}`, { withFileTypes: true, recursive: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => entry.name.replace('.json', ''));
  }

  /**
   * Load all files from the specified directory.
   * @param directory - The directory to load the files from.
   */
  loadAll(directory: string): unknown[] | Promise<unknown[]> {
    const entries = readdirSync(`${this.root}/${directory}`, { withFileTypes: true, recursive: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => JSON.parse(readFileSync(`${this.root}/${directory}/${entry.name}`, 'utf-8')));
  }

  /**
   * Find a file in the specified directory using a predicate and a filter.
   * @param directory - The directory to find the file in.
   * @param predicate - The predicate to use to find the file.
   */
  find<T>(directory: string, predicate: (t: T) => boolean): T | Promise<T> | undefined {
    const entries = readdirSync(`${this.root}/${directory}`, { withFileTypes: true, recursive: true });
    for (const entry of entries)
      if (entry.isFile() && entry.name.endsWith('.json')) {
        const file = JSON.parse(readFileSync(`${this.root}/${directory}/${entry.name}`, 'utf-8'));
        if (predicate(file)) return file;
      }

    return undefined;
  }

  /**
   * Filter the files in the specified directory using a predicate.
   * @param directory - The directory to filter the files in.
   * @param predicate - The predicate to use to filter the cache.
   */
  filter<T>(directory: string, predicate: (t: T) => boolean): T[] | Promise<T[]> {
    const entries = readdirSync(`${this.root}/${directory}`, { withFileTypes: true, recursive: true });
    const files = [];
    for (const entry of entries)
      if (entry.isFile() && entry.name.endsWith('.json')) {
        const file = JSON.parse(readFileSync(`${this.root}/${directory}/${entry.name}`, 'utf-8'));
        if (predicate(file)) files.push(file);
      }

    return files;
  }

  /**
   * Store a file in the specified directory.
   * @param directory - The directory to store the file in.
   * @param fileName - The name of the file to store.
   * @param value - The value to store.
   */
  save<T>(directory: string, fileName: string, value: T): boolean | Promise<boolean> {
    const data = JSON.stringify(value, null, this.preserveWhitespace ? 2 : undefined);
    writeFileSync(`${this.root}/${directory}/${fileName}.json`, data, 'utf-8');

    if (!existsSync(`${this.root}/${directory}/${fileName}.json`)) return Promise.reject('File was not written.');
    else return true;
  }

  /**
   * Delete a file from the specified directory.
   * @param directory - The directory to delete the file from.
   * @param fileName - The name of the file to delete.
   */
  delete(directory: string, fileName: string): boolean | Promise<boolean> {
    try {
      unlinkSync(join(this.root, directory, `${fileName}.json`));
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Delete all files from the specified directory.
   * @param collection - The directory to delete the files from.
   */
  clear(collection: string): boolean | Promise<boolean> {
    const entries = readdirSync(`${this.root}/${collection}`, { withFileTypes: true });

    for (const entry of entries)
      if (entry.isFile() && entry.name.endsWith('.json')) unlinkSync(`${this.root}/${collection}/${entry.name}`);

    return true;
  }

  /**
   * Delete all files from the storage.
   */
  clearAll(): boolean | Promise<boolean> {
    const entries = readdirSync(this.root, { withFileTypes: true });

    for (const entry of entries) if (entry.isDirectory()) this.clear(entry.name);

    return true;
  }
}
