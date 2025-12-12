/**
 * The available tiers in League of Legends.
 */
export type TierType =
  | 'CHALLENGER'
  | 'GRANDMASTER'
  | 'MASTER'
  | 'DIAMOND'
  | 'EMERALD'
  | 'PLATINUM'
  | 'GOLD'
  | 'SILVER'
  | 'BRONZE'
  | 'IRON';

/**
 * The available divisions for non-apex tiers (Diamond and below) in League of Legends.
 */
export type DivisionType = 'I' | 'II' | 'III' | 'IV';

/**
 * The types of queues in League of Legends, league-v4 API.
 */
export type QueueType = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | 'RANKED_FLEX_TT';
