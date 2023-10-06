import { Client } from 'client';
import { Image } from '../image';
import { ICDragonChampion, IDataDragonChampionSpell, IMerakiChampionAbility } from 'types';
import { Champion } from '.';
import { hash, arrToString, round, performMath, multiply } from 'utilities';

/**
 * Represents a champion spell.
 */
export class ChampionSpell {
  /**
   * The ID of the spell.
   */
  readonly id: string;
  /**
   * The name of the spell.
   */
  readonly name: string;
  /**
   * The champion who uses this spell.
   */
  readonly champ: Champion;
  /**
   * The description of the spell.
   */
  readonly description: string;
  /**
   * The raw tooltip (from data dragon) of the spell.
   */
  private _rawTooltip: string;
  /**
   * The maximum rank of the spell.
   */
  readonly maxRank: number;
  /**
   * The cooldown of the spell (at each rank).
   */
  readonly cooldownByLevel: number[];
  /**
   * The cooldown of the spell (at each rank) in string form.
   */
  readonly cooldown: string;
  /**
   * The cost of the spell (at each rank).
   */
  readonly costByLevel: number[];
  /**
   * The cost of the spell (at each rank) in string form.
   */
  readonly cost: string;
  /**
   * The range of the spell (at each rank).
   */
  readonly rangeByLevel: number[];
  /**
   * The range of the spell (at each rank) in string form.
   */
  readonly range: string;
  /**
   * The image of the spell.
   */
  readonly image: Image;
  /**
   * The resource required to use the spell.
   */
  readonly resource: string;
  /**
   * The maximum ammo of the spell (if the spell is re-usable).
   */
  readonly maxAmmo: number;
  /**
   * Raw meraki analytics data for the spell.
   * This is useful for mathematical calculations with the spell without the tooltip.
   */
  readonly meraki: IMerakiChampionAbility[];

  /**
   * Creates a new champion spell.
   * @param client - The client.
   * @param dDragon - The Data Dragon champion spell data.
   * @param cDragon - The Community Dragon champion spell data.
   */
  constructor(
    client: Client,
    champ: Champion,
    dDragon: IDataDragonChampionSpell,
    cDragon: ICDragonChampion,
    meraki: IMerakiChampionAbility[]
  ) {
    this.id = dDragon.id;
    this.name = dDragon.name;
    this.champ = champ;
    this.maxRank = dDragon.maxrank;
    this.cooldownByLevel = dDragon.cooldown;
    this.cooldown = dDragon.cooldownBurn;
    this.costByLevel = dDragon.cost;
    this.cost = dDragon.costBurn;
    this.rangeByLevel = dDragon.range;
    this.range = dDragon.rangeBurn;
    this.image = new Image(client, dDragon.image);
    this.resource = (dDragon.resource || '')
      .replace(/{{\s*cost\s*}}/g, dDragon.costBurn)
      .replace(/{{\s*abilityresourcename\s*}}/g, champ.partype);
    this.maxAmmo = parseInt(dDragon.maxammo);
    this.description = dDragon.description
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
    this.meraki = meraki;

    const hashedRoot = `{${hash(`characters/${this.champ.id.toLowerCase()}/characterrecords/root`)}}`;
    const rootRecordKey = Object.keys(cDragon).find(
      (k) => k.toLowerCase() === `characters/${this.champ.id.toLowerCase()}/characterrecords/root` || k === hashedRoot
    )!;
    const spells: string[] = cDragon[rootRecordKey].spellNames;

    const spellName = spells.find((s: string) => s.includes(this.id))!;
    const hashedSpell = `{${hash(`characters/${this.champ.id.toLowerCase()}/spells/${spellName.toLowerCase()}`)}}`;
    const spell = (cDragon[`Characters/${this.champ.id}/Spells/${spellName}`] || cDragon[hashedSpell]).mSpell;

    this._rawTooltip = dDragon.tooltip;
    for (let i = 0; i < dDragon.effectBurn.length; i++) {
      const n = i < 1 ? i + 10 : i;
      const effect = dDragon.effectBurn[n]!;
      const format = `{{ e${i} }}`;
      this._rawTooltip = this._rawTooltip.replaceAll(format, effect);
      this.resource = this.resource.replaceAll(format, effect);
    }
    const values = ChampionSpell._parseDataValues(spell.mDataValues);
    for (const key of Object.keys(values)) {
      const format = `{{ ${key.toLowerCase()} }}`;
      const strings = arrToString(values[key].slice(1, this.maxRank + 1));
      const value = strings.every((s) => s === strings[0]) ? strings[0] : strings.join('/');
      this._rawTooltip = this._rawTooltip.replaceAll(format, value);
      this.resource = this.resource.replaceAll(format, value);
    }
    this._parseTooltip(cDragon, spell);
  }

  /**
   * The raw tooltip of the champion spell.
   * This is a more detailed description and contains the numbers of any effects and damage the spell applies.
   *
   * The raw tooltip also contains some HTML-like tags such as `<scaleAP>`
   * to help style it better if you are making a website that needs to use this.
   */
  get rawTooltip() {
    return this._rawTooltip;
  }

  /**
   * The tooltip of the champion spell.
   * This is a more detailed description and contains the numbers of any effects and damage the spell applies.
   *
   * The tooltip is cleaned off of any HTML-like tags to display text in a nicer format.
   */
  get tooltip() {
    return this.rawTooltip
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  private static _parseDataValues(values: { mName: string; mValues: number[] }[] = []) {
    const dataValues: { [key: string]: number[] } = {};
    for (const data of values) dataValues[data.mName.toLowerCase()] = (data.mValues || []).map((v) => Math.abs(v));
    return dataValues;
  }

  private _parseTooltip(damage: ICDragonChampion, spell: any) {
    const tokens = this._rawTooltip.match(/(?<={{\s*)[^}]+(?=\s*}})/g)?.map((t) => t.trim());
    if (!tokens) return;

    try {
      for (const token of tokens) {
        const calculations = spell.mSpellCalculations;
        const effects: { value: number[] }[] = spell.mEffectAmount || [];
        const dataValues = ChampionSpell._parseDataValues(spell.mDataValues);
        const tokenParts = token.split(':');
        const actualToken: string = tokenParts.pop()!.match(/[A-Za-z0-9\s-]+/)![0];
        const externalFull = tokenParts.pop();
        const external = externalFull?.split('.').pop();
        if (token === 'maxammo') {
          const ammo = arrToString(spell.mMaxAmmo).slice(1, this.maxRank + 1);
          const toReplace = ammo.every((a) => a === ammo[0]) ? ammo[1] : ammo.join('/');
          this._rawTooltip = this._rawTooltip.replaceAll('{{ maxammo }}', toReplace);
        } else if (token === 'ammorechargetime') {
          const ammo = arrToString(spell.mAmmoRechargeTime).slice(1, this.maxRank + 1);
          const toReplace = ammo.every((a) => a === ammo[0]) ? ammo[1] : ammo.join('/');
          this._rawTooltip = this._rawTooltip.replaceAll('{{ ammorechargetime }}', toReplace);
        } else if (external) {
          const externalSpellKey = Object.keys(damage).find((k) => k.toLowerCase().endsWith(external));
          if (!externalSpellKey) return;
          const externalSpell = damage[externalSpellKey].mSpell;
          const externalData = ChampionSpell._parseDataValues(externalSpell.mDataValues);
          const externalEffects: { value: number[] }[] = externalSpell.mEffectAmount || [];
          const values = externalData[actualToken]?.slice(1, this.maxRank + 1);
          if (values) {
            const strings: number[] = [];
            for (const value of values)
              strings.push(eval(token.replaceAll(`${externalFull}:${actualToken}`, value.toString())));
            const result = strings.every((s) => s === strings[1])
              ? round(strings[1]).toString()
              : arrToString(strings).join('/');
            this._rawTooltip = this._rawTooltip.replaceAll(`{{ ${token} }}`, result);
          } else if (actualToken.match(/effect\d+amount/g)?.length)
            for (let i = 0; i < externalEffects.length; i++) {
              const effect = externalEffects[i].value?.slice(1, this.maxRank)?.map((n) => round(n));
              if (effect) {
                const effectBurn = effect.every((e) => e === effect[0])
                  ? round(effect[0]).toString()
                  : arrToString(effect).join('/');
                this._rawTooltip = this._rawTooltip.replaceAll(
                  `{{ ${externalFull}:effect${i + 1}amount }}`,
                  effectBurn
                );
              }
            }
          else {
            const calcKeys = Object.keys(externalSpell.mSpellCalculations).map((k) => k.toLowerCase());
            let externalCalcs: any;
            const hashed = `{${hash(actualToken)}}`;
            if (calcKeys.includes(actualToken))
              externalCalcs = Object.values(externalSpell.mSpellCalculations)[calcKeys.indexOf(actualToken)];
            else if (calcKeys.includes(hashed))
              externalCalcs = Object.values(externalSpell.mSpellCalculations)[calcKeys.indexOf(hashed)];
            if (externalCalcs) {
              const result = this._performSpellMath(
                externalSpell.mSpellCalculations,
                externalCalcs,
                externalData,
                externalEffects
              );
              this._rawTooltip = this._rawTooltip.replaceAll(`{{ ${token} }}`, result);
            }
          }
        } else if (Object.keys(dataValues).includes(actualToken)) {
          const values: number[] = [];
          for (const value of dataValues[actualToken].slice(1, this.maxRank + 1)) {
            const val = token.replaceAll(actualToken, value.toString());
            const multiples = val.split('*');
            const newMultiples: string[] = [];
            for (const multiple of multiples) {
              const parts = multiple.split('.');
              if (parts.length - 1) newMultiples.push(parts[0] + '.' + parts.slice(1).join(''));
              else newMultiples.push(parseFloat(multiple).toString());
            }
            values.push(eval(newMultiples.join('*')));
          }
          const result = values.every((s) => s === values[1])
            ? round(values[1]).toString()
            : arrToString(values).join('/');
          this._rawTooltip = this._rawTooltip.replaceAll(`{{ ${token} }}`, result);
        } else if (calculations) {
          const calcKeys = Object.keys(calculations).map((k) => k.toLowerCase());
          let calcs: any;
          const hashed = `{${hash(actualToken)}}`;
          if (calcKeys.includes(actualToken)) calcs = Object.values(calculations)[calcKeys.indexOf(actualToken)];
          else if (calcKeys.includes(hashed)) calcs = Object.values(calculations)[calcKeys.indexOf(hashed)];
          if (calcs) {
            const result = this._performSpellMath(calculations, calcs, dataValues, effects);
            this._rawTooltip = this._rawTooltip.replaceAll(`{{ ${token} }}`, result);
          }
        }
        this._rawTooltip = this._rawTooltip.replaceAll(`{{ ${token} }}`, '?');
      }
    } catch (e: any) {
      console.error(e.stack || e.message);
      console.info(`Champ ID: ${this.champ.id}`);
      console.info(`Spell name: ${this.name}`);
    }
  }

  private _performSpellMath(
    calculations: any,
    calcs: any,
    dataValues: { [key: string]: number[] },
    effects: { value: number[] }[]
  ) {
    const percentage = calcs.mDisplayAsPercent;
    const multiplier = calcs.mMultiplier;
    let result = '';
    if (calcs.__type === 'GameCalculation') {
      calcs = calcs.mFormulaParts;
      if (Array.isArray(calcs)) {
        let part1 = '';
        let part2 = '1';
        for (const calc of calcs) {
          const brackets = !!part1.length;
          part1 += brackets ? ' (+' : '';
          part1 += performMath(calc, effects, dataValues, this.maxRank, {
            percent: !!percentage
          });
          if (brackets) part1 += ')';
        }
        if (multiplier)
          part2 = performMath(multiplier, effects, dataValues, this.maxRank, {
            percent: !!percentage
          });
        result = multiply(part1, part2);
      }
    } else if (calcs?.__type === 'GameCalculationModified') {
      const newCalcs = calculations[calcs.mModifiedGameCalculation];
      const multiplier = calcs.mMultiplier;
      let part1 = '';
      const newPercentage = newCalcs.mDisplayAsPercent;
      for (const someCalc of newCalcs.mFormulaParts) {
        const brackets = !!part1.length;
        part1 += brackets ? ' (+' : '';
        part1 += performMath(someCalc, effects, dataValues, this.maxRank, {
          percent: !!newPercentage
        });
        if (brackets) part1 += ')';
      }
      const part2 = performMath(multiplier, effects, dataValues, this.maxRank, {
        percent: !!percentage
      });
      result = multiply(part1, part2);
    }
    return result;
  }
}
