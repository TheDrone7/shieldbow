# [Client](/api/client.md)

### Client constructor

```ts
const client = new Client('API_KEY');
```

Here, your `API_KEY` is the key you want to use to make requests to the API.

This will create a new instance of the client, but it won't be ready for use yet.
To make it usable, we move on towards the next section - [Client initialization](#client-initialization).

### Client initialization

```ts
client.initialize({
  // Client options
});
```

Below are the details of the initialization options.

1. `region`: The region you want to make requests to. This defaults to `na`.
2. `locale`: The locale you want to use. This defaults to `en-US`. 
All regions also have a default locale. 
When you set the region, the locale will be set to the default locale for that region.
3. `version`: The version of the data dragon files you want to use. This defaults to the latest (as per the region).
4. `cache`: (Very basic) The caching settings.
   1. `enabled`: Whether caching is enabled. This defaults to `true`.
   2. `localRoot`: The root directory for the local cache. This defaults to `./data`.
Currently, only the data dragon (and community dragon/meraki) files can be cached locally.

Additionally, (and this is not configurable), the client will automatically cache (in memory) 
any data you fetch from the APIs.

5. `fetch`: The fetcher settings - the data you want to prefetch during initialization to avoid having to fetch it later.
   1. `champions`: Whether to prefetch champions data. This defaults to `true`.
   2. `items`: Whether to prefetch items data. This defaults to `true`.
   3. `runes`: Whether to prefetch runes data. This defaults to `true`.
   4. `summonerSpells`: Whether to prefetch summoner spells data. This defaults to `true`.

This is the part that slows down your initialization. 
Most of which, is due to champions being fetched from 3 different sources and then being combined.
This is done to have all sorts of data available about the champions.

This can be sped up by either disabling the prefetching or enabling the cache.
If the cache is enabled, the first initialization will still be slow but the requests will be handled significantly faster.

::: warning

The data dragon files are fetched automatically when making a request to one of the following APIs.

- Spectator v4
- Match v5
- Champion Mastery v4

Therefore, it is recommended to prefetch them to avoid having to delay these requests.

:::

::: details A sample configuration

```ts
const client = new Client('API_KEY');
client.initialize({ 
   region: 'euw', 
   cache: { 
     enabled: true,
     localRoot: 'shieldbow/data' 
   }, 
   fetch: {
     champions: false
   }
});
```

With this config, our client will be initialized quickly, the default region will be set to `euw`, 
the locale will be set to `en-GB`, which is the default locale for the region.

The data dragon files will be fetched from the API, but the champions will not be fetched.

The fetched files will be stored locally under the `<root>/shieldbow/data` directory.
`<root>` is the root directory of your project.

:::

### Updating locale and patch/version

League of Legends is a global, constantly-evolving game. There are players from a lot of different regions.
To allow fetching data in locales of all these various regions, the shieldbow client has the `updateLocale` utility.

It can be used as follows
```ts
await client.updateLocale('ko_KR', false);
```
Here, the first argument is the new locale you want to use. `ko_KR` is the default Korean locale.
The second argument (optional), is a `refetch` option. This defaults to `true` and will fetch all the data dragon data
right away using the new locale. This can take a while (almost the same amount as initialization)
if the data has not already been fetched and cached.

Similarly, every 2 weeks, the game is updated and all the values are updated. If you do not want to restart your app,
you can simply use the `updatePatch` method which works in a similar way.

```ts
await client.updatePatch('11.10', false);
```

Here, the first argument is the new patch you want the information from.
It must be the patch number and not the data dragon version.
The second argument is the `refetch` option that works in the same way as `updateLocale`.

### Rate limiting

As of now, the client can handle rate limiting automatically. But it is very limited.
The known caveats are as follows.

- If you restart the client, it will reset the rate limiting, and you might go over the rate limit again.
- If your app is huge, and you have different machines with different memories running the app
the rate limiting is not shared and can cause issues.
- It is only stored in memory so any case such as the above two where the client needs to be restarted or doesn't have access to the memory,
rate limiting won't be able to work properly.

But, if you are just getting started, you can ignore these caveats.
You probably won't have these issues in a development environment.

> The library is still heavily in development. So this is a known issue being worked on.

---

### Next steps

From this point onwards, in the guide's code examples, we will be assuming, 
we have initialized the client already as in the example above.

You can move on to the next part of the guide - [Fetching data](/guide/fetching.md).