import { request, BASE_PLATFORM, PUUID, breakdown, cleanStructure, writeToFile, typeOut, Structure } from 'utilities';

export async function summonerV4() {
  let structure: Structure = {};

  // Summoner V4 by PUUID
  const urlByPuuid = `${BASE_PLATFORM}/lol/summoner/v4/summoners/by-puuid/${PUUID}`;
  const responseByPuuid = await request(urlByPuuid).catch((err) => {
    console.error(err);
    return undefined;
  });

  if (responseByPuuid) {
    structure = breakdown(responseByPuuid, 'puuid', structure);
    console.log('Summoner V4 by PUUID parsed successfully.');
  }

  // Save the structure
  writeToFile('structures/api/summoner.json', JSON.stringify(cleanStructure(structure), null, 2));

  // Generate types
  typeOut('structures/api/summoner.json', 'summoner', 'the API');
  console.log('Summoner V4 types generated successfully.\n');
}
