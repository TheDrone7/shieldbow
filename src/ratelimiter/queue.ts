import type { AxiosResponse } from 'axios';

export class Queue {
  private readonly _items: any[];
  private _pendingPromise: boolean;
  constructor() {
    this._items = [];
    this._pendingPromise = false;
  }

  enqueue(action: () => Promise<AxiosResponse>) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      this._items.push({ action, resolve, reject });
      this.dequeue();
    });
  }

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
