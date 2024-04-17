import { Locale } from '@shieldbow/web';
import { Client } from 'client';
import { ChallengePercentile, ChallengeState, ChallengeTracking, IChallengeConfig } from 'types';

/**
 * Represents a League of Legends challenge.
 */
export class LolChallenge {
  #client: Client;
  #percentiles?: ChallengePercentile;
  /**
   * The ID of the challenge.
   */
  readonly id: number;
  /**
   * The localized names of the challenge.
   */
  readonly localizedNames: Record<Locale, string>;
  /**
   * The localized short descriptions of the challenge.
   */
  readonly localizedShortDescriptions: Record<Locale, string>;
  /**
   * The localized long descriptions of the challenge.
   */
  readonly localizedDescriptions: Record<Locale, string>;
  /**
   * The current state of the challenge (enabled, archived, etc).
   */
  readonly state: ChallengeState;
  /**
   * The tracking method of the challenge (seasonal, lifetime).
   */
  readonly tracking: ChallengeTracking;
  /**
   * The start timestamp of the challenge.
   */
  readonly startTimestamp?: number;
  /**
   * The end timestamp of the challenge (if applicable).
   */
  readonly endTimestamp?: number;
  /**
   * Whether the challenge has a leaderboard.
   */
  readonly hasLeaderboard: boolean;
  readonly thresholds: Record<string, number>;

  /**
   * Creates a new challenge.
   * @param client - The client that created this challenge.
   * @param data - The raw challenge data from the API.
   */
  constructor(client: Client, data: IChallengeConfig) {
    this.#client = client;
    this.id = data.id;
    this.state = data.state;
    this.tracking = data.tracking ?? 'LIFETIME';
    this.startTimestamp = data.startTimestamp;
    this.endTimestamp = data.endTimestamp;
    this.hasLeaderboard = data.leaderboard;
    this.thresholds = data.thresholds;
    this.localizedNames = {} as Record<Locale, string>;
    this.localizedShortDescriptions = {} as Record<Locale, string>;
    this.localizedDescriptions = {} as Record<Locale, string>;

    for (const locale in data.localizedNames) {
      this.localizedNames[locale as Locale] = data.localizedNames[locale as Locale].name;
      this.localizedShortDescriptions[locale as Locale] = data.localizedNames[locale as Locale].shortDescription;
      this.localizedDescriptions[locale as Locale] = data.localizedNames[locale as Locale].description;
    }
  }

  /**
   * The name of the challenge in the client's current locale.
   */
  get name(): string {
    return this.localizedNames[this.#client.locale];
  }

  /**
   * The short description of the challenge in the client's current locale.
   */
  get shortDescription(): string {
    return this.localizedShortDescriptions[this.#client.locale];
  }

  /**
   * The description of the challenge in the client's current locale.
   */
  get description(): string {
    return this.localizedDescriptions[this.#client.locale];
  }

  /**
   * The percentile by tier for the challenge.
   */
  get percentiles() {
    return this.#percentiles;
  }
}
