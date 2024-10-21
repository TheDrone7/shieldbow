import { Champion, Item, RuneTree, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { IMatchParticipant, IMatchTeam, TeamObjective } from 'types';
import { MatchParticipant } from './participant';

export class Team {
  readonly id: number;
  readonly name: 'blue' | 'red';
  readonly win: boolean;
  readonly bans: Champion[];
  readonly objectiveKills: Record<TeamObjective, number>;
  readonly firstObjectives: Record<TeamObjective, boolean>;
  readonly members: MatchParticipant[];

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
