import { request, BASE_PLATFORM, breakdown, cleanStructure, writeToFile, typeOut, Structure } from 'utilities';

export async function spectatorV5() {
  let featuredStructure: Structure = {};
  let currentStructure: Structure = {};

  // Spectator V5 featured games
  const url = `${BASE_PLATFORM}/lol/spectator/v5/featured-games`;
  const responseFeaturedGames = await request(url).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseFeaturedGames) {
    featuredStructure = breakdown(responseFeaturedGames, 'featuredGames', featuredStructure);
    console.log('Spectator V5 featured games parsed successfully.');

    const PUUID = responseFeaturedGames.gameList[0]?.participants[0]?.puuid;

    // Spectator V5 active games by PUUID
    const urlByPuuid = `${BASE_PLATFORM}/lol/spectator/v5/active-games/by-summoner/${PUUID}`;
    const responseByPuuid = await request(urlByPuuid).catch((err) => {
      console.error(err);
      return undefined;
    });
    if (responseByPuuid) {
      currentStructure = breakdown(responseByPuuid, 'activeGamesByPuuid', currentStructure);
      console.log('Spectator V5 active games by PUUID parsed successfully.');
    }

    writeToFile('structures/api/spectator/featured.json', JSON.stringify(cleanStructure(featuredStructure), null, 2));
    writeToFile('structures/api/spectator/active.json', JSON.stringify(cleanStructure(currentStructure), null, 2));

    // Generate types
    typeOut('structures/api/spectator/featured.json', 'featuredGame', 'the API');
    typeOut('structures/api/spectator/active.json', 'currentGame', 'the API');
    console.log('Spectator V5 types generated successfully.\n');
  }
}
