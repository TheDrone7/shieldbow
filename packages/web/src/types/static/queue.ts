/**
 * A representation of a game queue (e.g. Ranked Solo/Duo)
 */
export interface Queue {
  /**
   * The ID of the queue.
   */
  queueId: number;
  /**
   * The map on which the queue is played.
   */
  map: string;
  /**
   * A text description of the queue.
   */
  description?: string;
  /**
   * Additional notes about the queue.
   */
  notes?: string;
}
