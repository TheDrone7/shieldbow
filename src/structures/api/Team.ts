import type { ParticipantData, TeamData, TeamObjectivesData } from '../../types';
import type { Champion, Item, RuneTree, SummonerSpell } from '../dragon';
import { Participant } from './Participant';
import type { Collection } from '@discordjs/collection';

/**
 * A banned champion in a match.
 */
export interface ChampionBan {
  /**
   * The numerical order in which the champion was banned.
   */
  order: number;
  /**
   * The banned champion.
   */
  champion: Champion;
}

/**
 * A representation of a team in a match.
 */
export class Team {
  /**
   * The ID of the team.
   */
  readonly id: number;
  /**
   * The champions banned by the team.
   * Note: Bans in the Arena gamemode are shared across all teams.
   */
  readonly bans: ChampionBan[];
  /**
   * The objectives secured by the team.
   */
  readonly objectives: TeamObjectivesData;
  /**
   * Whether the team won the match.
   */
  readonly win: boolean;
  /**
   * The participants in the team.
   */
  readonly participants: Participant[];

  constructor(
    data: TeamData,
    participants: ParticipantData[],
    champions: Collection<string, Champion>,
    items: Collection<string, Item>,
    runeTrees: Collection<string, RuneTree>,
    summonerSpells: Collection<string, SummonerSpell>
  ) {
    this.id = data.teamId;
    this.bans = data.bans.map((b) => ({
      order: b.pickTurn,
      champion: champions.find((c) => c.key === b.championId)!
    }));
    this.objectives = data.objectives;
    this.participants = participants.map(
      (p) => new Participant(p, champions.find((c) => c.key === p.championId)!, items, runeTrees, summonerSpells)
    );
    this.win = data.win;
  }
}
