import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_DIR = process.cwd();

export function writeToFile(fileName: string, data: string) {
  const filePath = join(BASE_DIR, 'output', fileName);
  const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
  mkdirSync(dirPath, { recursive: true });
  writeFileSync(filePath, data, 'utf-8');
}

export function readFromFile(fileName: string) {
  const filePath = join(BASE_DIR, 'output', fileName);
  return readFileSync(filePath, 'utf-8');
}
