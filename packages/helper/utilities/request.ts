import { config } from 'dotenv';
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

  return response.json();
}
