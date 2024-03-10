/**
 * The state of a challenge.
 *
 * - `DISABLED`: The challenge is neither visible nor tracked/calculated.
 * - `HIDDEN`: The challenge is not visible to players, but is being tracked/calculated.
 * - `ENABLED`: The challenge is visible to players and is being tracked/calculated.
 * - `ARCHIVED`: The challenge is visible to players but is no longer being tracked/calculated
 */
export type ChallengeState = 'DISABLED' | 'HIDDEN' | 'ENABLED' | 'ARCHIVED';

/**
 * The tracking type of a challenge.
 *
 * - `LIFETIME`: The challenge is tracked over the lifetime of the player's account and never resets.
 * - `SEASON`: The challenge is tracked over the current season and resets at the end of the season.
 */
export type ChallengeTracking = 'LIFETIME' | 'SEASON';
