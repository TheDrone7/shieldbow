import {
  request,
  BASE_PLATFORM,
  PUUID,
  LEAGUE_DIVISION,
  LEAGUE_QUEUE,
  LEAGUE_TIER,
  LEAGUE_ID,
  breakdown,
  cleanStructure,
  writeToFile,
  typeOut,
  Structure
} from 'utilities';

export async function leagueV4() {
  // League V4
  let listStructure: Structure = {};
  let entryStructure: Structure = {};

  // League V4 challenger leagues
  const urlChallenger = `${BASE_PLATFORM}/lol/league/v4/challengerleagues/by-queue/${LEAGUE_QUEUE}`;
  const responseChallenger = await request(urlChallenger).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseChallenger) {
    listStructure = breakdown(responseChallenger, 'challenger', listStructure);
    console.log('League V4 challenger leagues parsed successfully.');
  }

  // League V4 grandmaster leagues
  const urlGrandmaster = `${BASE_PLATFORM}/lol/league/v4/grandmasterleagues/by-queue/${LEAGUE_QUEUE}`;
  const responseGrandmaster = await request(urlGrandmaster).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseGrandmaster) {
    listStructure = breakdown(responseGrandmaster, 'grandmaster', listStructure);
    console.log('League V4 grandmaster leagues parsed successfully.');
  }

  // League V4 master leagues
  const urlMaster = `${BASE_PLATFORM}/lol/league/v4/masterleagues/by-queue/${LEAGUE_QUEUE}`;
  const responseMaster = await request(urlMaster).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseMaster) {
    listStructure = breakdown(responseMaster, 'master', listStructure);
    console.log('League V4 master leagues parsed successfully.');
  }

  // League V4 list by ID
  const urlList = `${BASE_PLATFORM}/lol/league/v4/leagues/${LEAGUE_ID}`;
  const responseList = await request(urlList).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseList) {
    listStructure = breakdown(responseList, 'custom', listStructure);
    console.log('League V4 list by ID parsed successfully.');
  }

  writeToFile('structures/api/leagueList.json', JSON.stringify(cleanStructure(listStructure), null, 2));
  typeOut('structures/api/leagueList.json', 'leagueList', 'the API');
  console.log('League V4 list types generated successfully.\n');

  // League V4 entries by puuid
  const urlEntries = `${BASE_PLATFORM}/lol/league/v4/entries/by-puuid/${PUUID}`;
  const responseEntries = await request(urlEntries).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseEntries) {
    for (const entry of responseEntries) entryStructure = breakdown(entry, 'puuid', entryStructure);
    console.log('League V4 entries by puuid parsed successfully.');
  }

  // League V4 entries by queue, tier, division
  const urlEntriesByQueue = `${BASE_PLATFORM}/lol/league/v4/entries/${LEAGUE_QUEUE}/${LEAGUE_TIER}/${LEAGUE_DIVISION}`;
  const responseEntriesByQueue = await request(urlEntriesByQueue).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (responseEntriesByQueue) {
    for (const entry of responseEntriesByQueue) entryStructure = breakdown(entry, 'queue', entryStructure);
    console.log('League V4 entries by queue, tier, division parsed successfully.');
  }

  writeToFile('structures/api/leagueEntry.json', JSON.stringify(cleanStructure(entryStructure), null, 2));
  typeOut('structures/api/leagueEntry.json', 'leagueEntry', 'the API');
  console.log('League V4 entry types generated successfully.\n');
}
