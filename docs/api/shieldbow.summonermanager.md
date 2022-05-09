<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [shieldbow](./shieldbow.md) &gt; [SummonerManager](./shieldbow.summonermanager.md)

## SummonerManager class

A summoner manager - to fetch and manage all the summoner data.

<b>Signature:</b>

```typescript
export declare class SummonerManager implements BaseManager<Summoner> 
```
<b>Implements:</b> [BaseManager](./shieldbow.basemanager.md)<!-- -->&lt;[Summoner](./shieldbow.summoner.md)

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(client)](./shieldbow.summonermanager._constructor_.md) |  | Constructs a new instance of the <code>SummonerManager</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [cache](./shieldbow.summonermanager.cache.md) |  | Collection&lt;string, [Summoner](./shieldbow.summoner.md)<!-- -->&gt; | The summoners cached in the memory. |
|  [client](./shieldbow.summonermanager.client.md) |  | [Client](./shieldbow.client.md) | The client this manager belongs to. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [fetch(id, options)](./shieldbow.summonermanager.fetch.md) |  | Fetch a summoner by its summoner ID. |
|  [fetchByAccount(account, options)](./shieldbow.summonermanager.fetchbyaccount.md) |  | Fetch a summoner by a RIOT account associated to it. |
|  [fetchByAccountId(id, options)](./shieldbow.summonermanager.fetchbyaccountid.md) |  | Fetch a summoner by its account ID. |
|  [fetchByPlayerId(id, options)](./shieldbow.summonermanager.fetchbyplayerid.md) |  | Fetch a summoner by its unique PUUID. |
|  [fetchBySummonerName(name, options)](./shieldbow.summonermanager.fetchbysummonername.md) |  | Fetch a summoner by its summoner name. |
