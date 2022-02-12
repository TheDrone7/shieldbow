import fetch from 'node-fetch';
import type { regions } from './types';

export class Client {
  private readonly dDragonBase: string;
  private readonly versions: string;
  private version: string;
  private language: string;
  constructor() {
    this.dDragonBase = 'https://ddragon.leagueoflegends.com/cdn/';
    this.versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this.version = 'null';
    this.language = 'en_US';
  }

  async initialize(region?: regions) {
    const response = await fetch(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this.versions);
    if (response.status !== 200) throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
    else {
      const result = <string[] | { v: string, l: string }>await response.json();
      if (Array.isArray(result)) this.version = result[0];
      else {
        this.version = result.v;
        this.language = result.l;
      }
    }
  }

  async fetchAllChampions() {
    return new Promise((resolve, reject) => {
      if (this.version === 'null') reject('Please initialize the client first.');
      else {
        const response = fetch(this.dDragonBase + '')
      }
    });
  }
}