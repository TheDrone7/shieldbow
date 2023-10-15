import { hash } from './fnv1a';
import { Stat, StatFormula } from './constants';

/**
 * Rounds the value to up to 2 decimal points.
 * @param value - The value that needs to be rounded off.
 */
export function round(value: number) {
  const m = Number((Math.abs(value) * 100).toPrecision(15));
  return Math.round(m) / 100;
}

/**
 * Parses the float values and returns rounded strings.
 * @param values - The numerical values to parse.
 */
export function arrToString(values: number[]) {
  return values.map((v) => round(v).toString());
}

/**
 * Parses values and returns a string displaying them in appropriate format.
 * @param values - The numerical values to parse.
 * @param maxRank - The highest spell rank applicable.
 */
function getJoined(values: number[], maxRank: number) {
  return values.slice(1, maxRank + 1).every((v) => v === values[1])
    ? values[1].toString()
    : arrToString(values.slice(1, maxRank + 1)).join('/');
}

const numberPart = (part: any, options = { percent: false }) => {
  const n = round(part.mNumber * (options.percent ? 100 : 1));
  if (n > 0) return n.toString() + (options.percent ? '%' : '');
  return '0';
};

const effectValuePart = (
  part: any,
  effects: { value: number[] }[],
  level: number = -1,
  maxRank: number,
  options = { percent: false }
) => {
  const values = effects[part.mEffectIndex - 1].value.map((v) => round(v * (options.percent && v < 1 ? 100 : 1)));
  return level > -1
    ? effects[part.mEffectIndex - 1].value[level].toString()
    : getJoined(values, maxRank) + (options.percent ? '%' : '');
};

const dataValuePart = (
  part: any,
  data: { [name: string]: number[] },
  level: number = -1,
  maxRank: number,
  options = { percent: false }
) => {
  const valueName: string = part.mDataValue.toLowerCase();
  const key = Object.keys(data).find((k) => {
    const hashed = `{${hash(k)}}`;
    if (k === valueName || hashed === valueName) return k;
    else return;
  });
  if (key) {
    const currentValue: number[] = data[key].map((n) => round(n * (options.percent ? 100 : 1)));
    return (
      (level > -1 ? currentValue[level].toString() : getJoined(currentValue, maxRank) + (options.percent ? '%' : '')) ||
      '?'
    );
  }
  return '?';
};

const statByCoefficientPart = (part: any, options = { percent: false }) => {
  let coefficient = round(part.mCoefficient * 100 * (options.percent ? 100 : 1));
  if (coefficient > 1000) {
    coefficient = round(coefficient / 100);
    options = { percent: false };
  }
  const statType = StatFormula[part.mStatFormula - 1];
  const statName = Stat[part.mStat];
  if (coefficient)
    return `${coefficient}%${options.percent ? ' per 100' : ''}${statType ? ` ${statType}` : ''} ${statName || 'AP'}`;
  return '?';
};

const resourceByCoefficientPart = (part: any) => {
  const coefficient = round(part.mCoefficient * 100).toString();
  if (coefficient) return `${coefficient}% of the maximum mana`;
  return '?';
};

const statByDataValuePart = (
  part: any,
  data: { [name: string]: number[] },
  level: number = -1,
  maxRank: number,
  options = { percent: false }
) => {
  const statType = StatFormula[part.mStatFormula - 1];
  const statName = Stat[part.mStat];
  const valueName: string = part.mDataValue.toLowerCase();
  const key = Object.keys(data).find((k) => {
    const hashed = `{${hash(k)}}`;
    if (k === valueName || hashed === valueName) return k;
    else return;
  });
  if (key) {
    const currentValue: number[] = data[key].map((n) => n * (options.percent ? 10000 : 100)).map((n) => round(n));
    const coefficient = (level > -1 ? currentValue[level].toString() : getJoined(currentValue, maxRank)) || '?';
    return `${coefficient}%${options.percent ? ' per 100' : ''}${statType ? ` ${statType}` : ''} ${statName || 'AP'}`;
  }
  return '?';
};

const parseBreakpoints = (breakpoints: any[]) => {
  const result: { [level: number]: number } = {};
  for (const breakpoint of breakpoints)
    if (breakpoint) {
      let value = 0;
      for (const key of Object.keys(breakpoint))
        if (key !== '__type' && key !== 'mLevel') value = round(breakpoint[key]);
      const level = parseInt(breakpoint.mLevel);
      result[level] = value;
    }

  return result;
};

const byChampLevelBreakpointsPart = (part: any, options = { percent: false }) => {
  const base: number = round(part.mLevel1Value || 0);
  const breakpoints = parseBreakpoints(part.mBreakpoints || []);
  let scale: number = 0;
  let max: number = base;
  for (const key of Object.keys(part))
    if (!['mLevel1Value', 'mBreakpoints', '__type'].includes(key)) scale = round(part[key]);
  for (let i = 1; i < 18; i++) {
    if (breakpoints[i + 1] !== undefined) scale = breakpoints[i + 1];
    max += scale;
  }
  max = round(max);
  if (max === base) return `${base}`;
  return `${base * (options.percent ? 100 : 1)}${options.percent ? '%' : ''} - ${max * (options.percent ? 100 : 1)}${
    options.percent ? '%' : ''
  } (based on champion level)`;
};

const byChampLevelInterpolationPart = (part: any, options = { percent: false }) => {
  const start = round(part.mStartValue || 0) * (options.percent ? 100 : 1);
  const end = round(part.mEndValue || 0) * (options.percent ? 100 : 1);
  return `${start}${options.percent ? '%' : ''} - ${end}${options.percent ? '%' : ''} (based on champion level)`;
};

const productParts = (part1: string, part2: string) => {
  if (isNaN(parseFloat(part1)) && isNaN(parseFloat(part2))) return `${part1} + ${part2}`;
  const part1Num = part1.match(/[^\d.]/g)?.length ? NaN : parseFloat(part1);
  const part2Num = part2.match(/[^\d.]/g)?.length ? NaN : parseFloat(part2);
  if (isNaN(part1Num) && isNaN(part2Num)) return `${part1} * (${part2})`;
  let index = 0;
  if (isNaN(part1Num)) {
    let result = part1;
    const numbers: string[] = part1.match(/[\d.]+/g) || [];
    const newNs = numbers.map((n) => parseFloat(n)).map((n) => round(n * part2Num));
    for (let i = 0; i < numbers.length; i++) {
      const constant = result.substring(0, index);
      const toReplace = result.substring(index);
      const toAdd = toReplace.indexOf(numbers[i]);
      if (!toReplace.substring(0, toAdd).trim().endsWith('per'))
        result = constant + toReplace.replace(numbers[i], newNs[i].toString());
      else result = constant + toReplace;
      index += toAdd + newNs[i].toString().length;
    }
    return result;
  } else {
    let result = part2;
    const numbers: string[] = part2.match(/[\d.]+/g) || [];
    const newNs = numbers.map((n) => parseFloat(n)).map((n) => round(n * part1Num));
    for (let i = 0; i < numbers.length; i++) {
      const constant = result.substring(0, index);
      const toReplace = result.substring(index);
      const toAdd = toReplace.indexOf(numbers[i]);
      if (!toReplace.substring(0, toAdd).trim().endsWith('per'))
        result = constant + toReplace.replace(numbers[i], newNs[i].toString());
      else result = constant + toReplace;
      index += toAdd + newNs[i].toString().length;
    }
    return result;
  }
};

const sumParts = (part1: string, part2: string) => {
  if (isNaN(parseFloat(part1)) && isNaN(parseFloat(part2))) return `${part1} + ${part2}`;
  const part1Num = part1.match(/[^\d.]/g)?.length ? NaN : parseFloat(part1);
  const part2Num = part2.match(/[^\d.]/g)?.length ? NaN : parseFloat(part2);
  if (Object.keys(Stat).some((k) => part1.includes(k) || part2.includes(k))) {
    if (part1 === '0') return part2;
    if (part2 === '0') return part1;
    return `${part1} + ${part2}`;
  }
  if (isNaN(part1Num) && isNaN(part2Num)) return '0';
  let index = 0;
  if (isNaN(part1Num)) {
    let result = part1;
    const numbers: string[] = part1.match(/[\d.]+/g) || [];
    const newNs = numbers.map((n) => parseFloat(n)).map((n) => round(n + part2Num));
    for (let i = 0; i < numbers.length; i++) {
      const constant = result.substring(0, index);
      const toReplace = result.substring(index);
      const toAdd = toReplace.indexOf(numbers[i]);
      result = constant + toReplace.replace(numbers[i], newNs[i].toString());
      index += toAdd + newNs[i].toString().length;
    }
    return result;
  } else {
    let result = part2;
    const numbers: string[] = part2.match(/[\d.]+/g) || [];
    const newNs = numbers.map((n) => parseFloat(n)).map((n) => round(n + part1Num));
    for (let i = 0; i < numbers.length; i++) {
      const constant = result.substring(0, index);
      const toReplace = result.substring(index);
      const toAdd = toReplace.indexOf(numbers[i]);
      result = constant + toReplace.replace(numbers[i], newNs[i].toString());
      index += toAdd + newNs[i].toString().length;
    }
    return result;
  }
};

const statSubpartPart = (sub: string, part: any) => {
  const statType = StatFormula[part.mStatFormula - 1];
  const statName = Stat[part.mStat];
  const numbers: string[] = sub.match(/[\d.]+/g) || [];
  const newNs = numbers.map((n) => round(parseFloat(n) * 100));
  for (let i = 0; i < numbers.length; i++) sub = sub.replace(numbers[i].toString(), newNs[i].toString());
  return `(${sub})%${statType ? ` ${statType}` : ''} ${statName || 'AP'}`;
};

/**
 * Multiplies two spell calculation parts.
 * @param part1 - The first part.
 * @param part2 - The second part.
 */
export function multiply(part1: string, part2: string) {
  if (part2.match(/^\d+%$/)?.length) part2 = round(parseFloat(part2) / 100).toString();
  return productParts(part1, part2);
}

/**
 * A function that takes in calculations and performs the necessary operations to generate appropriate tooltips.
 * @param calculation - The calculations.
 * @param effects - The effect values.
 * @param datavalue - The named data values.
 * @param maxRank - The max applicable spell rank.
 * @param options - Additional spell math options.
 */
export function performMath(
  calculation: { [key: string]: any; __type: string },
  effects: { value: number[] }[],
  datavalue: { [name: string]: number[] },
  maxRank: number,
  options: { percent: boolean }
): string {
  if (!calculation?.__type) return '0';
  switch (calculation.__type) {
    case 'EffectValueCalculationPart':
      return effectValuePart(calculation, effects, -1, maxRank, options);
    case 'NumberCalculationPart':
      return numberPart(calculation, options);
    case 'NamedDataValueCalculationPart':
      return dataValuePart(calculation, datavalue, -1, maxRank, options);
    case 'StatByCoefficientCalculationPart':
      return statByCoefficientPart(calculation, options);
    case 'AbilityResourceByCoefficientCalculationPart':
      return resourceByCoefficientPart(calculation);
    case 'StatByNamedDataValueCalculationPart':
      return statByDataValuePart(calculation, datavalue, -1, maxRank, options);
    case 'ByCharLevelBreakpointsCalculationPart':
      return byChampLevelBreakpointsPart(calculation, options);
    case 'ByCharLevelInterpolationCalculationPart':
      return byChampLevelInterpolationPart(calculation, options);
    case 'CooldownMultiplierCalculationPart':
      return '1';
    case 'ProductOfSubPartsCalculationPart':
      const productPart1 = performMath(calculation.mPart1, effects, datavalue, maxRank, options);
      const productPart2 = performMath(calculation.mPart2, effects, datavalue, maxRank, options);
      return productParts(productPart1, productPart2);
    case 'SumOfSubPartsCalculationPart':
      const sumPart1 = performMath(calculation.mSubparts[0], effects, datavalue, maxRank, options);
      const sumPart2 = performMath(calculation.mSubparts[1], effects, datavalue, maxRank, options);
      return sumParts(sumPart1, sumPart2);
    case 'StatBySubPartCalculationPart':
      const sub = performMath(calculation.mSubpart, effects, datavalue, maxRank, options);
      return statSubpartPart(sub, calculation);
    case 'BuffCounterByNamedDataValueCalculationPart':
      const value = dataValuePart(calculation, datavalue, -1, maxRank, options);
      const dataBuff = calculation.mBuffName.startsWith('{') ? '?' : calculation.mBuffName;
      return `${value} per stack of ${dataBuff}`;
    case 'BuffCounterByCoefficientCalculationPart':
      const buffCoeff = round(calculation.mCoefficient * (options.percent ? 100 : 1));
      const coeffBuff = calculation.mBuffName.startsWith('{') ? '?' : calculation.mBuffName;
      return `${buffCoeff}${options.percent ? '%' : ''} per stack of ${coeffBuff}`;
    default:
      return '?';
  }
}
