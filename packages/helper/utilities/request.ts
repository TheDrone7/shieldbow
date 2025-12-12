import { config } from 'dotenv';
import { sleep } from '.';
config();

export async function request(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Riot-Token': process.env.API_KEY || '',
      'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });

  if (!response.ok) return Promise.reject(`HTTP error! status: ${response.status}`);

  const appLimit = parseInt(response.headers.get('X-App-Rate-Limit-Count')?.split(':')[0] || '0');
  if (appLimit > 90) await sleep(1000);

  return response.json();
}
