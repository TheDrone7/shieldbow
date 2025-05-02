import { parseChampions, parseItems, parseRunes, parseSummoners, generateApi } from 'parsers';

(async () => {
  const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => res.json());
  const latestVersion = versions[0];

  console.log(`Latest version: ${latestVersion}`);

  await parseChampions(latestVersion);
  await parseItems(latestVersion);
  await parseRunes(latestVersion);
  await parseSummoners(latestVersion);

  await generateApi();

  await console.log('All parsers completed successfully.');
})();
