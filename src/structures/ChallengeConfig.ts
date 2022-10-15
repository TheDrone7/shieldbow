import { Collection } from '@discordjs/collection';
import type { ChallengeConfigData, Locales, TierType } from '../types';
import type { Client } from '../client';

/**
 * A class representing the details of a challenge.
 */
export class ChallengeConfig {
  private readonly client: Client;
  /**
   * The ID of the challenge.
   */
  readonly id: string;
  /**
   * The names of the challenge mapped by locale.
   */
  readonly names: Collection<Locales, string>;
  /**
   * The long descriptions of the challenge mapped by locale.
   */
  readonly descriptions: Collection<Locales, string>;
  /**
   * The short descriptions of the challenge mapped by locale.
   */
  readonly shortDescriptions: Collection<Locales, string>;
  /**
   * The state of the challenge.
   */
  readonly state: 'ENABLED' | 'DISABLED';
  /**
   * Whether the challenge has a leaderboard.
   */
  readonly leaderboard: boolean;
  /**
   * The thresholds of the challenge mapped by tier.
   */
  readonly thresholds: Collection<TierType, number>;

  constructor(client: Client, data: ChallengeConfigData) {
    this.client = client;
    this.id = data.id;
    this.state = data.state;
    this.leaderboard = data.leaderboard;

    this.names = new Collection<Locales, string>();
    this.descriptions = new Collection<Locales, string>();
    this.shortDescriptions = new Collection<Locales, string>();

    this.thresholds = new Collection<TierType, number>();

    for (const locale in data.localizedNames) {
      const key = locale as Locales;
      const nameData = data.localizedNames[key];
      this.names.set(key, nameData.name);
      this.descriptions.set(key, nameData.description);
      this.shortDescriptions.set(key, nameData.shortDescription);
    }

    for (const tier in data.thresholds) {
      const key = tier as TierType;
      this.thresholds.set(key, data.thresholds[key]);
    }
  }

  /**
   * The name of the challenge (as per the client's locale).
   */
  get name() {
    return this.names.get(this.client.locale);
  }

  /**
   * The long description of the challenge (as per the client's locale).
   */
  get description() {
    return this.descriptions.get(this.client.locale);
  }

  /**
   * The short description of the challenge (as per the client's locale).
   */
  get shortDescription() {
    return this.shortDescriptions.get(this.client.locale);
  }
}
