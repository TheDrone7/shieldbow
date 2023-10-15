import { IDataDragonChampionPassive, IMerakiChampionAbility } from 'types';
import { Image } from '..';
import { Client } from 'client';

/**
 * Represents a champion passive.
 */
export class ChampionPassive {
  /**
   * The name of the passive ability.
   */
  readonly name: string;
  /**
   * The description of the passive ability.
   */
  readonly description: string;
  /**
   * The image of the passive ability.
   */
  readonly image: Image;
  /**
   * Raw meraki analytics data for the passive ability.
   *
   * This is useful for mathematical calculations with the ability.
   */
  readonly meraki: IMerakiChampionAbility[];

  /**
   * Creates a new ChampionPassive object.
   * @param client - The client.
   * @param dDragon - The Data Dragon champion passive data.
   * @param meraki - The Meraki champion passive data.
   */
  constructor(client: Client, dDragon: IDataDragonChampionPassive, meraki: IMerakiChampionAbility[]) {
    this.name = dDragon.name;
    this.description = dDragon.description;
    this.image = new Image(client, dDragon.image);
    this.meraki = meraki;
  }
}
