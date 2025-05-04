import { singular } from 'pluralize';
import { readFromFile, writeToFile, CleanStructure } from 'utilities';

export type GenerateStructure = {
  [key: string]: CleanStructure;
};

export function generateDocstring(key: string, source: string) {
  return `/**\n * The raw ${key.toWords()} data from ${source}.\n */\n`;
}

export function generateInterfaces(object: CleanStructure, key: string, source: string) {
  let output = '';

  const toGenerate: GenerateStructure[] = [];
  toGenerate.push({
    [key]: object
  });

  while (toGenerate.length > 0) {
    const current = toGenerate.pop();
    if (!current) continue;
    const [curKey, curObject] = Object.entries(current)[0];
    if (Object.entries(curObject).length === 0) continue;

    output += generateDocstring(curKey, source);
    output += `export interface I${curKey.capitalize()} {\n`;

    for (const [k, v] of Object.entries(curObject).sort((a, b) =>
      a[0].toLowerCase().localeCompare(b[0].toLowerCase())
    )) {
      if (v.substructure && Object.keys(v.substructure).length < 1) continue;

      let type = v.type;
      const optional = v.optional ? '?' : '';

      if (type.includes('object'))
        type = type.replaceAll('object', `I${curKey.capitalize()}${singular(k).capitalize()}`);

      const finalK = k.at(0)?.isAlpha() ? k : `'${k}'`;

      // Images are always the same, avoid duplication
      if (k === 'image') type = 'IImage';
      output += `  ${finalK}${optional}: ${type};\n`;

      if (v.substructure && k !== 'image') {
        const newKey = `${curKey}${singular(k).capitalize()}`;
        toGenerate.push({
          [newKey]: v.substructure
        });
      }
    }

    output += '}\n\n';
  }

  return output.trimEnd() + '\n';
}

export function typeOut(filename: string, key: string, source: string = 'data dragon') {
  const fileContent = readFromFile(filename);
  const object: CleanStructure = JSON.parse(fileContent);

  const output = generateInterfaces(object, key, source);
  const outputFilename = filename.replace('.json', '.ts').replace('structures', 'types');
  writeToFile(outputFilename, output);
}
