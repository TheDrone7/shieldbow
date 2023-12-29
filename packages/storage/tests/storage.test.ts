import { ShieldbowLocalStorage } from '../dist';
import { uid } from 'uid/single';

describe('STORAGE: storing', () => {
  const storage = new ShieldbowLocalStorage();
  const dir = uid(10);
  const file = uid(6);
  const key = uid(5);
  const data = { [key]: uid(9) };

  type Data = typeof data;

  it('should be able to store a file', () => {
    expect(storage.save(dir, file, data)).toBeTruthy();
  });

  it('should be able to list all files', () => {
    expect(storage.keys(dir)).toContain(file);
  });

  it("should be able to check for a file's existence", () => {
    expect(storage.has(dir, file)).toBeTruthy();
  });

  it('should be able to list all dirs', () => {
    expect(storage.collections()).toContain(dir);
  });

  it('should be able to list all files in a dir', () => {
    expect(storage.keys(dir)).toContain(file);
  });

  it('should be able to read a file', () => {
    expect(storage.load(dir, file)).toEqual(data);
  });

  it('should be able to load all files', () => {
    const dir1 = uid(10);
    const data1 = { [uid(5)]: uid(9) };
    const data2 = { [uid(5)]: uid(9) };
    const data3 = { [uid(5)]: uid(9) };

    storage.save(dir1, uid(6), data1);
    storage.save(dir1, uid(6), data2);
    storage.save(dir1, uid(6), data3);

    const loaded = storage.loadAll(dir1);
    expect(loaded).toContainEqual(data1);
    expect(loaded).toContainEqual(data2);
    expect(loaded).toContainEqual(data3);
  });

  it('should be able to find a file', () => {
    expect(storage.find(dir, (d: Data) => d[key] === data[key])).toEqual(data);
  });

  it('should be able to filter files', () => {
    expect(storage.filter(dir, (d: Data) => d[key] === data[key])).toEqual([data]);
  });

  it('should be able to delete a file', () => {
    expect(storage.delete(dir, file)).toBeTruthy();
    expect(storage.has(dir, file)).toBeFalsy();
  });

  it('should be able to delete a dir', () => {
    const dir1 = uid(10);

    const data1 = { [uid(5)]: uid(9) };
    const data2 = { [uid(5)]: uid(9) };
    const data3 = { [uid(5)]: uid(9) };

    storage.save(dir1, uid(6), data1);
    storage.save(dir1, uid(6), data2);
    storage.save(dir1, uid(6), data3);

    expect(storage.keys(dir1)).toHaveLength(3);
    expect(storage.clear(dir1)).toBeTruthy();
    expect(storage.keys(dir1)).toHaveLength(0);
  });

  it('should be able to clear the storage', () => {
    expect(storage.clearAll()).toBeTruthy();

    expect(storage.collections()).toEqual([]);
  });
});
