import { IStatRune } from 'types';

/**
 * The base stat runes data.
 */
const statRunesData: IStatRune[] = [];

statRunesData.push({
  id: 5008,
  name: 'Adaptive Force',
  icon: 'img/perk-images/StatMods/StatModsAdaptiveForceIcon.png',
  description: '+9 Adaptive Force'
});

statRunesData.push({
  id: 5002,
  name: 'Armor',
  icon: 'img/perk-images/StatMods/StatModsArmorIcon.png',
  description: '+6 Armor'
});

statRunesData.push({
  id: 5003,
  name: 'Magic Resist',
  icon: 'img/perk-images/StatMods/StatModsMagicResIcon.png',
  description: '+8 Magic Resist'
});

statRunesData.push({
  id: 5001,
  name: 'Health Scaling',
  icon: 'img/perk-images/StatMods/StatModsHealthScalingIcon.png',
  description: '+15-90 Health (based on level)'
});

statRunesData.push({
  id: 5005,
  name: 'Attack Speed',
  icon: 'img/perk-images/StatMods/StatModsAttackSpeedIcon.png',
  description: '+10% Attack Speed'
});

statRunesData.push({
  id: 5007,
  name: 'Cooldown Reduction',
  icon: 'img/perk-images/StatMods/StatModsCDRScalingIcon.png',
  description: '+8 Ability Haste'
});

export { statRunesData };
