import { Champion, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatchParticipant, IMatchTeam, TeamObjective } from 'types';
import { MatchParticipant } from './participant';

/**
 * Represents a team in a League of Legends match.
 */
export class Team {
  /**
   * The unique identifier for the team.
   */
  readonly id: number;
  /**
   * The name of the team (either 'blue' or 'red').
   * This is determined by the team ID (100 for blue, 200 for red).
   */
  readonly name: 'blue' | 'red';
  /**
   * Indicates whether the team won the match.
   */
  readonly win: boolean;
  /**
   * The champions banned by the team.
   */
  readonly bans: Champion[];
  /**
   * The number of objectives killed by the team.
   */
  readonly objectiveKills: Record<TeamObjective, number>;
  /**
   * Indicates whether the team secured the first objective of each type.
   */
  readonly firstObjectives: Record<TeamObjective, boolean>;
  /**
   * The members of the team.
   */
  readonly members: MatchParticipant[];

  /**
   * Creates a new instance of the Team class.
   * @param client - The client instance used to fetch data.
   * @param data - The data for the team.
   * @param participants - The participants in the match.
   * @param champions - The list of champions.
   * @param items - The list of items.
   * @param rTrees - The list of rune trees.
   * @param spells - The list of summoner spells.
   */
  constructor(
    client: Client,
    data: IMatchTeam,
    participants: IMatchParticipant[],
    champions: Champion[],
    items: Item[],
    rTrees: RuneTree[],
    spells: SummonerSpell[]
  ) {
    this.id = data.teamId;
    this.name = data.teamId === 100 ? 'blue' : 'red';
    this.win = data.win;
    this.bans = data.bans.map((ban) => champions.find((champ) => champ.key === ban.championId)!);
    this.objectiveKills = Object.keys(data.objectives).reduce(
      (acc, key) => {
        acc[key as TeamObjective] = data.objectives[key as TeamObjective].kills;
        return acc;
      },
      {} as Record<TeamObjective, number>
    );
    this.firstObjectives = Object.keys(data.objectives).reduce(
      (acc, key) => {
        acc[key as TeamObjective] = data.objectives[key as TeamObjective].first;
        return acc;
      },
      {} as Record<TeamObjective, boolean>
    );
    this.members = participants.map(
      (participant) => new MatchParticipant(client, participant, champions, items, rTrees, spells)
    );
  }
}
