import { breakdown, cleanStructure, type Structure, writeToFile, typeOut } from 'utilities';

export async function parseRunes(version: string) {
  const runesUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;
  const runes = await fetch(runesUrl).then((res) => res.json());

  console.log('Parsing runes...');
  let structure: Structure = {};

  for (const rune of runes) structure = breakdown(rune, rune.id, structure);

  writeToFile('structures/rune.json', JSON.stringify(cleanStructure(structure), null, 2));
  console.log('Runes parsed successfully.');

  typeOut('structures/rune.json', 'rune');
  console.log('Rune types generated successfully.\n');
}
