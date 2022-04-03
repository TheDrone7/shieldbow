import type { Champion } from './index';
import type { Client } from '../client';
import type { ChampionMasteryData } from '../types';

/**
 * A representation of a summoner's mastery over a champion.
 */
export class ChampionMastery {
  /**
   * The champion these details are for.
   */
  readonly champion: Champion;
  /**
   * The mastery level, can be anywhere between 1 and 7.
   */
  readonly level: number;
  /**
   * The total number of mastery points earned by this summoner on the champion.
   */
  readonly points: number;
  /**
   * The number of mastery points earned by the summoner since they progressed from the previous level.
   */
  readonly pointsSinceLastLevel: number;
  /**
   * The number of mastery points required by the summoner to achieve the next level.
   */
  readonly pointsToNextLevel: number;
  /**
   * The time this summoner played the champion last time.
   */
  readonly lastPlayedAt: Date;
  /**
   * Whether the summoner has earned the chest for this champion this season.
   */
  readonly chestGranted: boolean;
  /**
   * This is only applicable if the mastery level is 5 or 6.
   * The number of tokens achieved for reaching the next mastery level.
   */
  readonly tokens: number;

  constructor(client: Client, data: ChampionMasteryData) {
    this.champion = client.champions.cache.find((c) => c.key === data.championId)!;
    this.level = data.championLevel;
    this.points = data.championPoints;
    this.pointsSinceLastLevel = data.championPointsSinceLastLevel;
    this.pointsToNextLevel = data.championPointsUntilNextLevel;
    this.lastPlayedAt = new Date(data.lastPlayTime);
    this.chestGranted = data.chestGranted;
    this.tokens = data.tokensEarned;
  }
}
