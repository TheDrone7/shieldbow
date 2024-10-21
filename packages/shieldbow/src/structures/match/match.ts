import { Champion, GameMap, GameMode, GameType, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatch } from 'types';
import { Team } from './team';

export class Match {
  readonly id: string;
  readonly dataVersion: string;
  readonly endOfGameResult: string;
  readonly gameCreationTimestamp: number;
  readonly gameDuration: number;
  readonly gameEndTimestamp: number;
  readonly gameId: number;
  readonly gameMode: GameMode;
  readonly gameName: string;
  readonly gameStartTimestamp: number;
  readonly gameType: GameType;
  readonly gameVersion: string;
  readonly map: GameMap;
  readonly teams: Team[];
  readonly tournamentCode: string;

  constructor(
    client: Client,
    data: IMatch,
    champions: Champion[],
    items: Item[],
    rTrees: RuneTree[],
    spells: SummonerSpell[]
  ) {
    this.id = data.metadata.matchId;
    this.dataVersion = data.metadata.dataVersion;
    this.endOfGameResult = data.info.endOfGameResult ?? 'GameComplete';
    this.gameCreationTimestamp = data.info.gameCreation;
    this.gameDuration = data.info.gameDuration;
    this.gameEndTimestamp = data.info.gameEndTimestamp;
    this.gameId = data.info.gameId;
    this.gameMode = client.gameModes.find((type) => type.gameMode === data.info.gameMode)!;
    this.gameName = data.info.gameName;
    this.gameStartTimestamp = data.info.gameStartTimestamp;
    this.gameType = client.gameTypes.find((type) => type.gametype === data.info.gameType)!;
    this.gameVersion = data.info.gameVersion;
    this.map = client.maps.find((map) => map.mapId === data.info.mapId)!;
    this.teams = data.info.teams.map(
      (team) =>
        new Team(
          client,
          team,
          data.info.participants.filter((p) => p.teamId === team.teamId),
          champions,
          items,
          rTrees,
          spells
        )
    );
    this.tournamentCode = data.info.tournamentCode ?? '';
  }
}
