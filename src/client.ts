import fetch from 'node-fetch';
import type { regions } from './types';

export class Client {
    private dDragonBase: string;
    private versions: string;
    private version: string;
    constructor() {
        this.dDragonBase = 'https://ddragon.leagueoflegends.com/cdn';
        this.versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
        this.version = 'null';
    }

    async initialize(region?: regions) {
        const response = await fetch(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this.versions);
    }
}