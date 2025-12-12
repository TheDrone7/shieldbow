import { breakdown, cleanStructure, type Structure, writeToFile, typeOut } from 'utilities';

export async function parseItems(version: string) {
  const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;
  const allItems = await fetch(itemUrl).then((res) => res.json());
  const items = allItems.data;

  console.log('Parsing items...');
  let structure: Structure = {};

  for (const itemId in items) {
    const item = items[itemId];
    structure = breakdown(item, itemId, structure);
  }

  writeToFile('structures/item.json', JSON.stringify(cleanStructure(structure), null, 2));
  console.log('Items parsed successfully.');

  typeOut('structures/item.json', 'item');
  console.log('Item types generated successfully.\n');
}
