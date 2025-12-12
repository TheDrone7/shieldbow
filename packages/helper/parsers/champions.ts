import { breakdown, cleanStructure, type Structure, writeToFile, typeOut } from 'utilities';

export async function parseChampions(version: string) {
  const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/championFull.json`;
  const allChampions = await fetch(championUrl).then((res) => res.json());
  const champions = allChampions.data;

  console.log('Parsing champions...');
  let structure: Structure = {};

  for (const champId in champions) {
    const champ = champions[champId];
    structure = breakdown(champ, champId, structure);
  }

  writeToFile('structures/champion.json', JSON.stringify(cleanStructure(structure), null, 2));
  console.log('Champions parsed successfully.');

  typeOut('structures/champion.json', 'champion');
  console.log('Champion types generated successfully.\n');
}
