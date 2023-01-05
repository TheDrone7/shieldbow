/**
 * Additional options for filtering a specific summoner's matches.
 */
export interface MatchByPlayerOptions {
  /**
   * Only return matches after the specified timestamp.
   */
  startTime?: number;
  /**
   * Only return matches before the specified timestamp.
   */
  endTime?: number;
  /**
   * Only return matches with the specified queue type (numerical queue ID).
   */
  queue?: number;
  /**
   * Only return matches with the specified game type.
   */
  type?: 'ranked' | 'normal' | 'tourney' | 'tutorial';
  /**
   * Return the matches starting at the specified index..
   */
  start?: number;
  /**
   * The maximum number of matches to return.
   */
  count?: number;
}
