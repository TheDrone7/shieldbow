import { accountV1 } from './account';
import { summonerV4 } from './summoner';
import { sleep } from 'utilities';

export async function generateApi() {
  console.log('Generating API structures...\n');

  console.log('Generating Account V1 structures...');
  await accountV1();

  await sleep(1000);

  console.log('Generating Summoner V4 structures...');
  await summonerV4();

  console.log('API structures generated successfully.');
}
