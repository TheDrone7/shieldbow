# Data Fetching

The shieldbow client is designed to allow you to fetch data from all sources such as the static files, data dragon, 
and the RIOT API using a single client. It is designed to allow you to fetch anything the way you want to.

### Data Dragon

Data dragon hosts files that are updated every 2 weeks (sometimes more frequently), with each patch of the game. 
It offers data about game objects such as champions, in-game items, runes, etc.

The code below, can be used to fetch the data using the shieldbow client about the champion - Kayn.

::: tip
Fetching data from the data dragon does not require a working API key.
This is all simple JSON data publicly available.

If your application needs only this, you can get away without providing a valid API Key during client construction.
:::

```ts
const kayn = await client.champions.fetch('Kayn');
```

Here, `kayn` is going to be a [Champion](/shieldbow/api/Champion.md) object.

We can use this object to get any kind of data about the champion. Some examples are shown below.

```ts
console.log(kayn.name);   // Kayn
console.log(kayn.title);  // The shadow reaper

// We can also print a list of all the skins of the champion.
console.log(kayn.skins.map(skin => skin.name).join(', ')); // Default, Soulhunter, Odyssey ...

// Or the list of all the spells (abilities) of the champion.
console.log(kayn.spells.map(spell => spell.name).join(', ')); // Reaping Slash, Blade's Reach ...

// Note that the passive is not included in the spells collection.
console.log(kayn.passive.name); // The Darkin Scythe
```

::: details Other data types from data dragon
```ts
/* Items */
const boots = await client.items.fetch('1001');

/* Summoner spells */
const flash = await client.summonerSpells.findByName('Flash');

/* Rune trees */
const domination = await client.runes.fetch('Domination');

/* Runes */
await client.runes.fetchRune('Electrocute');
```
:::

---

### Fetching data from the API.

::: tip
Before moving further, make sure you have a valid API key from the [RIOT API Dashboard](https://developer.riotgames.com/)

And also ensure that you are providing it to the client during client construction.
:::

As stated above, the shieldbow client is designed to be easy to use. 
Therefore, it is just as simple to fetch any kind of data from the API as it was from data dragon.

For instance, lets try fetching the summoner data for the summoner `TheDrone7` (region `EUW`).

```ts
const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
```

Here, we are using the client's default [Summoner Manager](/shieldbow/api/SummonerManager.md) 
to fetch the summoner using their summoner name.

As specified in the API docs, you can also use the summoner ID, account ID, or the puuid (referred to as playerId in shieldbow)
to fetch a summoner's details.

The returned object is a [Summoner](/shieldbow/api/Summoner.md) object.

Again, thanks to the design choices, you can also fetch other information about the summoner,
such as their league rankings, by simply accessing the `summoner.league` property.

```ts
const leagues = await summoner.league;
```

This will return a promise that will resolve to a collection of [LeagueEntry](/shieldbow/api/LeagueEntry.md) object.

A [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) is an extension of the 
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) builtin class.

It stores data in a key-value pair and provides additional methods to manipulate the data better.

In the returned collection of league entries, the entries are mapped using the type of queue they belong to.

For example, to get their solo queue standings, you can use the key `RANKED_SOLO_5x5` or for the flex queue, `RANKED_FLEX_SR`.

```ts
const soloQ = leagues.get('RANKED_SOLO_5x5');
const flex = leagues.get('RANKED_FLEX_SR');

console.log(soloQ.tier); // IRON (or DIAMOND, etc.)
console.log(flex.tier); // IRON (or DIAMOND, etc.)
```

---

### Regional fetching.

Now, for no reason, lets extend [the example from getting started page](/shieldbow/guide/getting-started.md#example-usage) 
and compare the noob's details to the GOAT's.

If we try the following
```ts
const summoner = await client.summoners.fetchBySummonerName('hide on bush');
const leagueEntry = await summoner.league; 
const championMastery = summoner.championMastery;
  
const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
const highest = await championMastery.highest();
```
Unfortunately, we will get errors because we initialized the client with the `euw` region. But `hide on bush` plays in the `kr` region.

To avoid these errors, we can simply just provide additional options while fetching the summoner and include a region option as follows.

```ts
const summoner = await client.summoners.fetchBySummonerName('hide on bush', { region: 'kr' });
const leagueEntry = await summoner.league; 
const championMastery = summoner.championMastery;
  
const soloQ = leagueEntry.get('RANKED_SOLO_5x5');
const highest = await championMastery.highest();
```

Shieldbow, will only use the region `kr` when fetching the summoner and any related details.

To explain this further, lets take the above code and combine it with the code from the getting started page.

We would get
```ts
import { Client } from 'shieldbow';

const client = new Client('MY_API_KEY');

client.initialize({
  region: 'euw' // defaults to 'na'
}).then(async () => {
  // After initialization, you can use the client to make requests
  const summoner1 = await client.summoners.fetchBySummonerName('TheDrone7');
  const summoner2 = await client.summoners.fetchBySummonerName('hide on bush', { region: 'kr' });

  const leagueEntry1 = await summoner1.league;
  const leagueEntry2 = await summoner2.league;

  const championMastery1 = summoner1.championMastery;
  const championMastery2 = summoner2.championMastery;

  const soloQ1 = leagueEntry1.get('RANKED_SOLO_5x5');
  const soloQ2 = leagueEntry2.get('RANKED_SOLO_5x5');

  const highest1 = await championMastery1.highest();
  const highest2 = await championMastery2.highest();

  console.log(`Summoner name: ${summoner1.name} (level: ${summoner1.level}).`);
  console.log(`SoloQ: ${soloQ1.tier} ${soloQ1.division} (${soloQ1.lp} LP).`);
  console.log(`Highest champion mastery: ${highest1.champion.name} (M${highest1.level} ${highest1.points} points).`);
  console.log('\n\n');
  console.log(`Summoner name: ${summoner2.name} (level: ${summoner2.level}).`);
  console.log(`SoloQ: ${soloQ2.tier} ${soloQ2.division} (${soloQ2.lp} LP).`);
  console.log(`Highest champion mastery: ${highest2.champion.name} (M${highest2.level} ${highest2.points} points).`);
});
```

::: details Sample output
```
Summoner name: TheDrone7 (level: 261).
SoloQ: BRONZE III (9 LP).
Highest champion mastery: Kayn (M7 255687 points).



Summoner name: Hide on bush (level: 565).
SoloQ: CHALLENGER I (900 LP).
Highest champion mastery: LeBlanc (M7 492301 points).
```
:::

As stated above, the client will by default use the region it was initialized with, in this case `euw`.

Therefore, when fetching the summoner 1 - `TheDrone7`, the request is sent to `euw`.

However, while fetching summoner 2 - `hide on bush`, the request is sent to `kr`, as specified.

Now when we fetch any related details for summoner 2, such as the league entry, 
the shieldbow client learns the summoner's region and sends the request is sent to `kr` automatically.

Therefore, you only need to specify the region while fetching the summoner and 
the related details are automatically fetched from the appropriate region.

This is also why it works fine for both summoners.

NOTE: Since the region is still set to `euw`, the client will still send all requests 
without a summoner or region specified to `euw`.

To change the default region of the client, you can simply use the following line of code.

```ts
client.region = 'na';
```

Which will set the default region to `na`. You can also use any other region similarly to change the default region
of the shieldbow client.

---

### Supported APIs

The client has other managers to fetch other kinds of data from the API.

1. [Account Manager](/shieldbow/api/AccountManager.md) - `client.accounts`.
2. [Clash Manager](/shieldbow/api/ClashManager.md) - `client.clash`.
3. [Leagues Manager](/shieldbow/api/LeagueManager.md) - `client.leagues`.
4. [Match Manager](/shieldbow/api/MatchManager.md) - `client.matches`.
5. [Summoner Manager](/shieldbow/api/SummonerManager.md) - `client.summoners`.
6. [Current Game manager](/shieldbow/api/CurrentGameManager.md) - `client.spectator`.

---

### Unsupported APIs

Currently, unsupported (under development) API features are:

- [Match timeline](https://developer.riotgames.com/apis#match-v5/GET_getTimeline)
- [Tournament v4](https://developer.riotgames.com/apis#tournament-v4)
- [Tournament stub v4](https://developer.riotgames.com/apis#tournament-stub-v4)

---

### Extending the client

::: danger
Using the client with other unsupported APIs is not recommended but is possible.
:::

For this example, we will simply fetch the match timelines.

The shieldbow client uses an `ApiHandler` to fetch the data from the API.
This take cares of stuff such as ratelimiting but needs additional parameters to provided proper errors when encountered.

Below is how you would use the client to fetch the match timelines.
```ts
const matchId = 'some match ID here';
const response = await client.api.makeApiRequest(`/lol/match/v5/matches/${matchId}/timeline`, {
  name: 'Fetch match timeline by match ID',
  params: `Match ID: ${matchId}`,
  regional: true
}).catch(error => {
  // Some error ocurred while fetching the data.
});

if (response && response.data) {
  console.log(response.data); // Logs the match timeline data.
}
```

Here, in the additional options, we provide
1. `name` - A text that indicates what request you were making.
2. `params` - A text that indicates the parameters that were used.
3. `regional` - A boolean that indicates if the request is regional or not.
Regional requests are requests that are ones that are made to regions such as `Americas`, `Europe`, etc.
Keep it false if you want to use the base urls for regions such as `euw`, `na`, etc.

---

### The End

This is the end of the guide. Feel free to check out the [API documentation](/shieldbow/api/)
for more detailed information about the package.

Also feel free to create a [Github issue](https://github.com/TheDrone7/shieldbow/issues) 
if you have any suggestions or questions.

If you use discord, you can always reach out to me on 
[Riot games third party developers server](https://discord.gg/riotgamesdevrel).
My username and tag is `@TheDrone7#1624`.