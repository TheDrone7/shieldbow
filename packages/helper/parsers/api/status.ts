import { request, BASE_PLATFORM, breakdown, cleanStructure, writeToFile, typeOut, Structure } from 'utilities';

export async function lolStatusV4() {
  let structure: Structure = {};

  // League of Legends Status V4
  const url = `${BASE_PLATFORM}/lol/status/v4/platform-data`;
  const response = await request(url).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (response) {
    structure = breakdown(response, 'status', structure);
    console.log('League of Legends Status V4 parsed successfully.');
  }

  // Save the structure
  writeToFile('structures/api/lolStatus.json', JSON.stringify(cleanStructure(structure), null, 2));

  // Generate types
  typeOut('structures/api/lolStatus.json', 'lolStatus', 'the API');
  console.log('League of Legends Status V4 types generated successfully.\n');
}
