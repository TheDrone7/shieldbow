import type {
  CategoryName,
  ChallengeCategoryData,
  ChallengePreferencesData,
  ChallengeProgressionData,
  SummonerChallengeData,
  TierType,
  TotalChallengePointsData
} from '../types';
import { Collection } from '@discordjs/collection';
import type { Client } from '../client';

/**
 * A representation of the overview of a summoner's challenge data.
 */
export class TotalChallengePoints {
  /**
   * The tier this summoner has reached in challenges.
   */
  readonly tier: TierType;
  /**
   * The current progression of this summoner in challenges.
   */
  readonly current: number;
  /**
   * The maximum progression of this summoner in challenges.
   */
  readonly max: number;
  /**
   * The percentile of this summoner in challenges. (0-100 %)
   */
  readonly percentile: number;

  constructor(data: TotalChallengePointsData) {
    this.tier = data.level;
    this.current = data.current;
    this.max = data.max;
    this.percentile = data.percentile * 100;
  }
}

/**
 * A representation of a summoner's challenge category data.
 */
export class ChallengeCategory {
  /**
   * The name of this challenge category.
   */
  readonly name: string;
  /**
   * The tier this summoner has reached in this challenge category.
   */
  readonly tier: TierType;
  /**
   * The current progression of this summoner in this challenge category.
   */
  readonly current: number;
  /**
   * The maximum progression of this summoner in this challenge category.
   */
  readonly max: number;
  /**
   * The percentile of this summoner in this challenge category. (0-100 %)
   */
  readonly percentile: number;

  constructor(name: CategoryName, data: ChallengeCategoryData) {
    this.name = name;
    this.tier = data.level;
    this.current = data.current;
    this.max = data.max;
    this.percentile = data.percentile * 100;
  }
}

/**
 * A representation of a summoner's challenge progression data.
 */
export class ChallengeProgression {
  /**
   * The ID of this challenge.
   */
  readonly id: number;
  /**
   * The percentile of this summoner in this challenge. (0-100 %)
   */
  readonly percentile: number;
  /**
   * The tier this summoner has reached in this challenge.
   */
  readonly tier: TierType;
  /**
   * The current progression of this summoner in this challenge.
   */
  readonly value: number;
  /**
   * The timestamp of when this challenge tier was achieved by the summoner.
   */
  readonly achievedTimestamp: number;

  constructor(data: ChallengeProgressionData) {
    this.id = data.challengeId;
    this.percentile = data.percentile * 100;
    this.tier = data.level;
    this.value = data.value;
    this.achievedTimestamp = data.achievedTime;
  }

  /**
   * The time of when this challenge was achieved.
   */
  get achievedAt() {
    return new Date(this.achievedTimestamp);
  }
}

export class ChallengePreferences {
  /**
   * The client that instantiated this challenge preferences.
   * @private
   */
  private readonly client: Client;
  /**
   * The banner accent of this summoner.
   */
  readonly bannerAccent: string;
  /**
   * The title of this summoner.
   */
  readonly title: string;
  /**
   * The IDs of the challenges this summoner has put on display.
   */
  readonly displayedChallengeIds: number[];

  constructor(client: Client, data: ChallengePreferencesData) {
    this.client = client;
    this.bannerAccent = data.bannerAccent;
    this.title = data.title;
    this.displayedChallengeIds = data.challengeIds;
  }

  /**
   * The challenges that this summoner has put on display.
   */
  async fetchDisplayedChallenges() {
    if (!this.client.challenges.cache.hasAll(...this.displayedChallengeIds)) await this.client.challenges.fetchAll();
    return this.client.challenges.cache.filter((challenge) => this.displayedChallengeIds.includes(challenge.id));
  }
}

/**
 * A representation of a summoner's challenge data.
 */
export class SummonerChallenge {
  /**
   * The overview of this summoner in challenges.
   */
  totalPoints: TotalChallengePoints;
  /**
   * The challenge categories overview of this summoner.
   */
  categoryPoints: Collection<CategoryName, ChallengeCategory>;
  /**
   * Individual challenge progression stats of this summoner.
   */
  challenges: Collection<number, ChallengeProgression>;
  /**
   * The preferences of this summoner.
   */
  preferences: ChallengePreferences;

  constructor(client: Client, data: SummonerChallengeData) {
    this.totalPoints = new TotalChallengePoints(data.totalPoints);
    this.categoryPoints = new Collection<CategoryName, ChallengeCategory>();
    this.challenges = new Collection<number, ChallengeProgression>();
    this.preferences = new ChallengePreferences(client, data.preferences);

    for (const key in data.categoryPoints) {
      const cName = key as CategoryName;
      this.categoryPoints.set(cName, new ChallengeCategory(cName, data.categoryPoints[cName]));
    }
    data.challenges.map((c) => new ChallengeProgression(c)).forEach((c) => this.challenges.set(c.id, c));
  }
}
