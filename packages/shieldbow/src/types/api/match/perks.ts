/**
 * The raw match participant stat perks data from the API.
 */
export interface IMatchParticipantStatPerks {
  defense: number;
  flex: number;
  offense: number;
}

/**
 * The raw match participant selected perk from the API.
 */
export interface IMatchParticipantPerkStyleSelection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

/**
 * The raw match participant perk style data from the API.
 */
export interface IMatchParticipantPerkStyle {
  description: string;
  selections: IMatchParticipantPerkStyleSelection[];
  style: number;
}

/**
 * The raw match participant perks data from the API.
 */
export interface IMatchParticipantPerks {
  statPerks: IMatchParticipantStatPerks;
  styles: IMatchParticipantPerkStyle[];
}
