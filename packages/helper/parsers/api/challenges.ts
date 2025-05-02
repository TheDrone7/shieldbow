import {
  request,
  BASE_PLATFORM,
  CHALLENGE_ID,
  LEADERBOARD_LEVEL,
  PUUID,
  breakdown,
  cleanStructure,
  writeToFile,
  typeOut,
  Structure
} from 'utilities';

export async function lolChallengesV1() {
  let configStructure: Structure = {};
  let percentileStructure: Structure = {};
  let leaderboardStructure: Structure = {};
  let playerStructure: Structure = {};

  // Config
  const configUrl = `${BASE_PLATFORM}/lol/challenges/v1/challenges/config`;
  const configResponse = await request(configUrl).catch((err) => {
    console.error(err);
    return undefined;
  });

  if (configResponse) {
    for (const config of configResponse) configStructure = breakdown(config, config.id, configStructure);
    console.log('Challenges V1 Config parsed successfully.');
  }

  writeToFile('structures/api/challenges/config.json', JSON.stringify(cleanStructure(configStructure), null, 2));
  typeOut('structures/api/challenges/config.json', 'challengesConfig', 'the API');
  console.log('Challenges V1 Config types generated successfully.\n');

  // Percentile
  const percentileUrl = `${BASE_PLATFORM}/lol/challenges/v1/challenges/percentiles`;
  const percentileResponse = await request(percentileUrl).catch((err) => {
    console.error(err);
    return undefined;
  });

  if (percentileResponse) {
    for (const id in percentileResponse)
      percentileStructure = breakdown(percentileResponse[id], id, percentileStructure);
    console.log('Challenges V1 Percentiles parsed successfully.');
  }

  writeToFile(
    'structures/api/challenges/percentiles.json',
    JSON.stringify(cleanStructure(percentileStructure), null, 2)
  );
  typeOut('structures/api/challenges/percentiles.json', 'challengesPercentiles', 'the API');
  console.log('Challenges V1 Percentiles types generated successfully.\n');

  // Leaderboard
  const leaderboardUrl = `${BASE_PLATFORM}/lol/challenges/v1/challenges/${CHALLENGE_ID}/leaderboards/by-level/${LEADERBOARD_LEVEL}`;
  const leaderboardResponse = await request(leaderboardUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (leaderboardResponse) {
    for (const leaderboard of leaderboardResponse)
      leaderboardStructure = breakdown(leaderboard, leaderboard.puuid, leaderboardStructure);
    console.log('Challenges V1 Leaderboard parsed successfully.');
  }

  writeToFile(
    'structures/api/challenges/leaderboard.json',
    JSON.stringify(cleanStructure(leaderboardStructure), null, 2)
  );
  typeOut('structures/api/challenges/leaderboard.json', 'challengesLeaderboard', 'the API');
  console.log('Challenges V1 Leaderboard types generated successfully.\n');

  // Player data
  const playerUrl = `${BASE_PLATFORM}/lol/challenges/v1/player-data/${PUUID}`;
  const playerResponse = await request(playerUrl).catch((err) => {
    console.error(err);
    return undefined;
  });

  if (playerResponse) {
    playerStructure = breakdown(playerResponse, PUUID, playerStructure);
    console.log('Challenges V1 Player data parsed successfully.');
  }

  writeToFile('structures/api/challenges/player.json', JSON.stringify(cleanStructure(playerStructure), null, 2));
  typeOut('structures/api/challenges/player.json', 'challengesPlayer', 'the API');
  console.log('Challenges V1 Player data types generated successfully.\n');
}
