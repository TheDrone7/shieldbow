import { Champion, GameMap, GameMode, GameType, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatch } from 'types';
import { Team } from './team';

/**
 * Represents a match in League of Legends.
 */
export class Match {
  /**
   * The unique identifier for the match.
   */
  readonly id: string;
  /**
   * The version of the data used during the match. (Data Dragon version)
   */
  readonly dataVersion: string;
  /**
   * The result of the game at the end of the match.
   */
  readonly endOfGameResult: string;
  /**
   * The timestamp when the game was created (lobby created).
   */
  readonly gameCreationTimestamp: number;
  /**
   * The duration of the game in seconds.
   */
  readonly gameDuration: number;
  /**
   * The timestamp when the game ended.
   */
  readonly gameEndTimestamp: number;
  /**
   * The unique identifier for the game.
   */
  readonly gameId: number;
  /**
   * The mode of the game (e.g., CLASSIC, ARAM).
   */
  readonly gameMode: GameMode;
  /**
   * The name of the game.
   */
  readonly gameName: string;
  /**
   * The timestamp when the game started (loading finished).
   */
  readonly gameStartTimestamp: number;
  /**
   * The type of the game (e.g., MATCHED_GAME, TUTORIAL_GAME).
   */
  readonly gameType: GameType;
  /**
   * The version of the game client used during the match.
   */
  readonly gameVersion: string;
  /**
   * The map on which the game was played.
   */
  readonly map: GameMap;
  /**
   * The teams that participated in the match.
   */
  readonly teams: Team[];
  /**
   * The tournament code for the match, if applicable.
   */
  readonly tournamentCode: string;

  /**
   * Creates a new Match instance.
   * @param client - The client instance.
   * @param data - The match data from the API.
   * @param champions - The list of champions.
   * @param items - The list of items.
   * @param rTrees - The list of rune trees.
   * @param spells - The list of summoner spells.
   */
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
