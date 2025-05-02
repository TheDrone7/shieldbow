import { accountV1 } from './account';

export async function generateApi() {
  console.log('Generating API structures...\n');

  // Call the accountV1 function
  console.log('Generating Account V1 structures...');
  await accountV1();

  console.log('API structures generated successfully.');
}
