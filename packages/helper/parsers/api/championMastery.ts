import { request, BASE_PLATFORM, PUUID, breakdown, cleanStructure, writeToFile, typeOut, Structure } from 'utilities';

export async function championMasteryV4() {
  let structure: Structure = {};

  // Champion Mastery V4
  const url = `${BASE_PLATFORM}/lol/champion-mastery/v4/champion-masteries/by-puuid/${PUUID}`;
  const response = await request(url).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (response) {
    for (const item of response) structure = breakdown(item, item.championId, structure);
    console.log('Champion Mastery V4 parsed successfully.');
  }

  // Save the structure
  writeToFile('structures/api/championMastery.json', JSON.stringify(cleanStructure(structure), null, 2));

  // Generate types
  typeOut('structures/api/championMastery.json', 'championMastery', 'the API');
  console.log('Champion Mastery V4 types generated successfully.\n');
}
