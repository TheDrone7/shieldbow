export interface StructureData {
  type: string;
  included: string[];
  excluded: string[];
  substructure?: Structure;
}
export interface CleanStructureData {
  type: string;
  optional?: boolean;
  substructure?: CleanStructure;
  exceptions?: string[];
}
export type Structure = { [key: string]: StructureData };
export type CleanStructure = { [key: string]: CleanStructureData };

export function getType(value: any): string {
  let dataType: string = typeof value;

  if (value === undefined) dataType = 'undefined';
  else if (value === null) dataType = 'null';
  else if (Array.isArray(value)) {
    dataType = '[]';

    // determine the type of all elements in the array
    const arrayTypes = new Set<string>();
    for (const item of value) arrayTypes.add(getType(item));

    if (arrayTypes.size > 1) dataType = `(${Array.from(arrayTypes).join(' | ')})[]`;
    else if (arrayTypes.size === 1) dataType = `${Array.from(arrayTypes)[0]}[]`;
  }

  return dataType;
}

export function breakdown(data: any, name: string, existing?: Structure): Structure {
  const structure: Structure = existing || {};
  const keys = Object.keys(data);

  for (const key of keys) {
    const value = data[key];
    const dataType = getType(value);
    let substructure = structure[key]?.substructure;

    // If the value is an object, recursively break it down
    if (dataType === 'object') substructure = breakdown(value, name, substructure);

    // If the value is an array, check if it's an array of objects
    if (dataType.includes('[]') && dataType.includes('object'))
      for (const item of value) if (getType(item) === 'object') substructure = breakdown(item, name, substructure);

    if (structure[key]) {
      // If the key already exists, make sure the type is in the list
      if (!structure[key].type.includes(dataType)) structure[key].type += ` | ${dataType}`;

      // Add the name to the included list if it doesn't exist
      if (!structure[key].included?.includes(name)) structure[key].included?.push(name);

      // If the substructure exists, merge it
      if (substructure)
        if (structure[key].substructure)
          structure[key].substructure = {
            ...structure[key].substructure,
            ...substructure
          };
        else structure[key].substructure = substructure;
    } else
      // If the key doesn't exist, create a new entry
      structure[key] = {
        type: dataType,
        included: [name],
        excluded: [],
        substructure: substructure
      };

    // If the data type is null or undefined, add to excluded list as well.
    if (dataType === 'null' || dataType === 'undefined')
      if (!structure[key].excluded?.includes(name)) structure[key].excluded?.push(name);
  }

  // Check for excluded keys
  for (const key in structure)
    if (!keys.includes(key))
      // If the key is not in the current data, add it to the excluded list
      structure[key].excluded?.push(name);

  return structure;
}

export function cleanStructure(structure: Structure): CleanStructure {
  const cleanedStructure: CleanStructure = {};

  for (const key in structure) {
    cleanedStructure[key] = {
      type: structure[key].type
    };

    const { included, excluded, substructure } = structure[key];
    if (included.length > 0 && excluded.length > 0) {
      cleanedStructure[key].optional = true;
      cleanedStructure[key].exceptions = excluded;
    }

    if (substructure) {
      const cleanedSubstructure = cleanStructure(substructure);
      cleanedStructure[key] = {
        ...cleanedStructure[key],
        substructure: cleanedSubstructure
      };
    }
  }

  return cleanedStructure;
}
