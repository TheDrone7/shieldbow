import { ShieldbowLocalStorage } from '../dist';
import { uid } from 'uid/single';

describe('STORAGE: storing', () => {
  const storage = new ShieldbowLocalStorage();
  const dir = uid(10);
  const file = uid(6);
  const data = { [uid(5)]: uid(9) };

  it('should be able to store a file', () => {
    expect(storage.save(dir, file, data)).toBeTruthy();
  });

  it('should be able to list all files', () => {
    expect(storage.keys(dir)).toContain(file);
  });
});
