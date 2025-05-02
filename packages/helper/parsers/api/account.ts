import {
  request,
  BASE_REGIONAL,
  GAME_NAME,
  TAG_LINE,
  PUUID,
  breakdown,
  cleanStructure,
  writeToFile,
  typeOut,
  Structure
} from 'utilities';

export async function accountV1() {
  let structure: Structure = {};

  // Account V1 by Riot ID
  const url = `${BASE_REGIONAL}/riot/account/v1/accounts/by-riot-id/${GAME_NAME}/${TAG_LINE}`;
  const responseByRiotId = await request(url).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseByRiotId) {
    structure = breakdown(responseByRiotId, 'riotId', structure);
    console.log('Account V1 by Riot ID parsed successfully.');
  }

  // Account V1 by PUUID
  const urlByPuuid = `${BASE_REGIONAL}/riot/account/v1/accounts/by-puuid/${PUUID}`;
  const responseByPuuid = await request(urlByPuuid).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseByPuuid) {
    structure = breakdown(responseByPuuid, 'puuid', structure);
    console.log('Account V1 by PUUID parsed successfully.');
  }

  // Save the structure
  writeToFile('structures/account.json', JSON.stringify(cleanStructure(structure), null, 2));

  // Generate types
  typeOut('structures/account.json', 'account', 'the API');
  console.log('Account V1 types generated successfully.\n');
}
