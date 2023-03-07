import type { AxiosResponse } from 'axios';

/**
 * A queue that can be used to queue up requests.
 */
export class RequestQueue {
  private readonly _items: any[];
  private _pendingPromise: boolean;

  constructor() {
    this._items = [];
    this._pendingPromise = false;
  }

  /**
   * Enqueues an action to be executed.
   * @param action - The action to execute.
   */
  enqueue(action: () => Promise<AxiosResponse>) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this._items.push({ action, resolve, reject });
      this.dequeue();
    });
  }

  /**
   * Dequeues the first action to be executed.
   */
  async dequeue() {
    if (this._pendingPromise) return false;

    const item = this._items.shift();

    if (!item) return false;

    try {
      this._pendingPromise = true;

      const payload = await item.action(this);

      this._pendingPromise = false;
      item.resolve(payload);
    } catch (e) {
      this._pendingPromise = false;
      item.reject(e);
    } finally {
      this.dequeue();
    }

    return true;
  }
}
