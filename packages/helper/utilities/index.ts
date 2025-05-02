declare global {
  interface String {
    capitalize(): string;
    toWords(): string;
  }
}

String.prototype.capitalize = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toWords = function (): string {
  return this.replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { breakdown, cleanStructure, Structure, StructureData, CleanStructure, CleanStructureData } from './structure';

export { writeToFile, readFromFile } from './files';

export { request } from './request';

export * from './constants';

export { typeOut } from './typer';
