import { breakdown, cleanStructure, type Structure, writeToFile } from 'utilities';
import { typeOut } from 'typers';

export async function parseSummoners(version: string) {
  const summonerUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`;
  const allSummoners = await fetch(summonerUrl).then((res) => res.json());
  const summoners = allSummoners.data;

  console.log('Parsing summoner spells...');
  let structure: Structure = {};

  for (const summonerId in summoners) {
    const summoner = summoners[summonerId];
    structure = breakdown(summoner, summonerId, structure);
  }

  writeToFile('structures/summoner.json', JSON.stringify(cleanStructure(structure), null, 2));
  console.log('Summoner spells parsed successfully.');

  typeOut('structures/summoner.json', 'summonerSpell');
  console.log('Summoner spell types generated successfully.\n');
}
