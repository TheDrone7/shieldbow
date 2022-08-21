# Getting started

### About

Shieldbow is a powerful [Node.js](http://nodejs.org) module that enables you to easily interact with the [RIOT API](https://developer.riotgames.com/docs/portal).

Some features of shieldbow are

- Object-oriented
- Predictable
- Highly performant

### Installation

Install using your favorite package manager.

<CodeGroup>

  <CodeGroupItem title="NPM" active>

```shell:no-line-numbers
  npm install --save shieldbow
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```shell:no-line-numbers
  yarn add shieldbow
```

  </CodeGroupItem>

  <CodeGroupItem title="PNPM">

```shell:no-line-numbers
  pnpm add shieldbow
```

  </CodeGroupItem>
</CodeGroup>

### Example usage

```ts
import { Client } from 'shieldbow';

const client = new Client('MY_API_KEY');

client
  .initialize({
    region: 'euw', // defaults to 'na'
  })
  .then(async () => {
    // After initialization, you can use the client to make requests
    // For example, lets fetch the following details of a summoner
    // - Summoner name, summoner level
    // - SoloQ ranking and LP
    // - The highest champion mastery

    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    const leagueEntry = await summoner.fetchLeagueEntries();
    const championMastery = summoner.championMastery;

    const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
    const highest = await championMastery.highest();

    console.log(`Summoner name: ${summoner.name} (level: ${summoner.level}).`);
    console.log(`SoloQ: ${soloQ.tier} ${soloQ.division} (${soloQ.lp} LP).`);
    console.log(`Highest champion mastery: ${highest.champion.name} (M${highest.level} ${highest.points} points).`);
  });
```

Before you run this code, make sure you have replaced `MY_API_KEY` with your API key.
You can obtain it from [Riot Developer Portal](https://developer.riotgames.com). Whenever you are
developing something or just fiddling around with this library, you are free to use the Development API key. Once you have a complete project
you need to apply for production API key.

Anyway, you will see something similar to the following data:
```
Summoner name: TheDrone7 (level: 294).
SoloQ: BRONZE III (9 LP).
Highest champion mastery: Kayn (M7 268028 points).
```

This can obviously change a lot.

::: tip See if it correctly fetches your own data!
Replace `euw` (line 6) with the region you play in and `TheDrone7` (line 14) with your own summoner name, then run the code again.
:::

---

### Next steps

Next up, you can continue the guide and learn more about [the Client](/guide/client.md).

Or you can check out the following resources:

- [API Reference](https://thedrone7.github.io/shieldbow/api/)
- [Website](https://thedrone7.github.io/shieldbow/)
- [Github](https://github.com/TheDrone7/shieldbow)
- [Riot Games Third Party Developers Discord](https://discord.gg/riotgamesdevrel)
- [npm](https://www.npmjs.com/package/shieldbow)

### Contributing

Before creating an [issue](https://github.com/TheDrone7/shieldbow/issues), 
please ensure that it hasn't already been reported or suggested, and double-check the **documentation**.

See the [contribution guide](https://github.com/TheDrone7/shieldbow/blob/main/CONTRIBUTING.md) if you'd like to submit a PR.

### Help

If there is anything you do not understand, feel free to reach out to me (@TheDrone7#1624) on the
[Riot Games Third Party Developers Discord](https://discord.gg/riotgamesdevrel).