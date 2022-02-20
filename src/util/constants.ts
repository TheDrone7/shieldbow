/**
 * An array of all possible statistics needed for spell math.
 */
export const Stat = [
  'AP',
  'Armor',
  'AD',
  'AS',
  'AWT',
  'MR',
  'MS',
  'Crit Chance',
  'Crit',
  'CDR',
  'AH',
  'Health',
  'Current HP',
  '% Missing HP',
  'Unknown',
  'Life steal',
  'Unknown',
  'Omnivamp',
  'Physical Vamp',
  'Magic Pen',
  '% Magic Pen',
  '% Bonus Magic Pen',
  'Magic Lethality',
  'Armor Pen',
  '% Armor Pen',
  '% Bonus Armor Pen',
  'Lethality',
  'Tenacity',
  'Attack Range',
  'Health Regen Rate',
  'Resource Regen Rate',
  'Unknown',
  'Unknown',
  'Dodge Chance'
];

/**
 * The part of the stat that needs to be considered during spell math.
 */
export const StatFormula = ['Base', 'Bonus', 'Total'];
