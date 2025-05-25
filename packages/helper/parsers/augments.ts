import { breakdown, cleanStructure, type Structure, writeToFile, typeOut } from 'utilities';

export async function parseAugments() {
  const augmentsUrl = `https://raw.communitydragon.org/latest/cdragon/arena/en_us.json`;
  const allAugments = await fetch(augmentsUrl).then((res) => res.json());
  const augments = allAugments.augments;

  console.log('Parsing cherry augments...');
  let structure: Structure = {};

  for (const augment of augments) {
    const augmentId = augment.id;
    structure = breakdown(augment, augmentId, structure);
  }

  writeToFile('structures/augment.json', JSON.stringify(cleanStructure(structure), null, 2));
  console.log('Cherry augments parsed successfully.');

  typeOut('structures/augment.json', 'augment');
  console.log('Cherry augments types generated successfully.\n');
}
