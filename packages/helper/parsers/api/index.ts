import { sleep } from 'utilities';
import { accountV1 } from './account';
import { summonerV4 } from './summoner';
import { lolChallengesV1 } from './challenges';

export async function generateApi() {
  console.log('Generating API structures...\n');

  console.log('Generating Account V1 structures...');
  await accountV1();

  await sleep(1000);

  console.log('Generating Summoner V4 structures...');
  await summonerV4();

  await sleep(1000);

  console.log('Generating Challenges V1 structures...');
  await lolChallengesV1();

  console.log('API structures generated successfully.');
}
