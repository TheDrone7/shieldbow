import { unlinkSync, readdirSync, writeFileSync } from "fs";
import { join } from 'path';
import {
  ApiModel,
  ApiEntryPoint,
  ApiClass,
  ApiFunction,
  ApiConstructor,
  ApiMethod,
  ApiProperty
} from '@microsoft/api-extractor-model';
import { DocNode, DocPlainText, DocSoftBreak, DocParagraph, DocEscapedText, DocCodeSpan, DocLinkTag } from '@microsoft/tsdoc';

const builtins = {
  '[]': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
  'BigInt': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt',
  'Boolean': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
  'Date': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
  'Error': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
  'Map': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
  'Number': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
  'String': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
  'Object': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
  'Undefined': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined',
  'Promise': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  'Collection': 'https://discord.js.org/#/docs/collection/stable/class/Collection'
};

const parseSummary = (summary: DocNode) => {
  let text = '';
  for (const node of summary.getChildNodes()) {
    if (node instanceof DocPlainText) text += node.text;
    else if (node instanceof DocSoftBreak) text += '\n';
    else if (node instanceof DocParagraph) text += parseSummary(node) + '\n';
    else if (node instanceof DocEscapedText) text += node.encodedText;
    else if (node instanceof DocCodeSpan) text += `\`${node.code}\``;
    else if (node instanceof DocLinkTag) {
      const d = node.codeDestination?.memberReferences.map((r) => r.memberIdentifier?.identifier);
      const d2 = node.urlDestination;
      const link = d
        ? `/shieldbow/api/${d[0]}.md#${d[1]}`
        : d2;
      const linkText = node.linkText || d?.join('.') || d2;
      text += `[${linkText}](${link})`;
    }
    else console.log(node.kind);
  }
  return text;
};

const linkTo = (name: string) => `[${name}](/shieldbow/api/${name}.md)`;

const parseTypeString = (type: string) => {
  type = type.replace(/(?<!\\)</g, ' \\< ');
  type = type.replace(/(?<!\\)>/g, ' \\>');
  type = type.replace(/\|/g, '\\|');
  type = type.replace(/\n/g, ' ');
  for (const [key, value] of Object.entries(builtins)) {
    const link = `[${key}](${value})`;
    type = type.replace(new RegExp(`(?<=(< )|^|(, )|(\\\| ))${key}`, 'ig'), link);
  }
  for (const entry of entries.sort((a, b) => b.length - a.length))
    type = type.replace(new RegExp(`(?<=(< )|^|(, )|(\\\| ))${entry}`, 'g'), linkTo(entry));
  return type;
}


const pathToApi = join(__dirname, '.vuepress', '.temp', 'api-reference', 'shieldbow.api.json');
const pathToDocs = join(__dirname, 'api');

// Delete the already existing docs.
console.info('Deleting the existing docs...');
const files = readdirSync(pathToDocs);
files.forEach((file) => unlinkSync(join(pathToDocs, file)));

const apiModel = new ApiModel();
apiModel.loadPackage(pathToApi);
const api = apiModel.packages[0].members[0] as ApiEntryPoint;
const entries = api.members.map((member) => member.displayName);
const classes = <ApiClass[]>api.members.filter((member) => member.kind === 'Class');
const functions = <ApiFunction[]>api.members.filter((member) => member.kind === 'Function');
const interfaces = <ApiFunction[]>api.members.filter((member) => member.kind === 'Interface');
const variables = <ApiFunction[]>api.members.filter((member) => member.kind === 'Variable');
const types = <ApiFunction[]>api.members.filter((member) => member.kind === 'TypeAlias');
let index = `# API Reference\n\n`;

console.info('Processing the classes...');
// The classes.
index += `## Classes\n\n`;
index += '| Class | Description |\n';
index += '| ----- | ----------- |\n';

for (const cls of classes) {
  const summary = cls.tsdocComment
    ? parseSummary(cls.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${cls.displayName}](/shieldbow/api/${cls.displayName}.md) | ${summary} |\n`;

  // Create the class document.
  let doc = `---\ntitle: ${cls.displayName}\ndescription: ${summary}\n---\n\n`;
  doc += `## ${cls.displayName} class\n\n`;
  doc += `${summary}\n\n**Signature:**\n\n`;
  doc += `\`\`\`ts\n${cls.excerpt.text}\n\`\`\`\n\n`;
  if (cls.extendsType && cls.extendsType.excerpt && !cls.extendsType.excerpt.isEmpty)
    doc += `**Extends: ${cls.extendsType.excerpt.text}**\n\n`;
  if (cls.implementsTypes.length) {
    const implementTypes = cls.implementsTypes
      .map((t) => t.excerpt.text)
      .map((t) => {
        return t + '\\>';
      });
    doc += `Implements: ${implementTypes}\n\n`;
  }
  const references = cls.excerptTokens.filter((token) => token.kind === 'Reference');
  if (references.length) {
    doc += '**References:** ';
    doc += references.map((r) => parseTypeString(r.text)).join(', ');
    doc += '\n\n';
  }
  doc += '---\n\n';
  const ctr = <ApiConstructor>cls.members.filter((member) => member.kind === 'Constructor')[0];
  if (ctr) {
    doc += `### Constructor\n\n`;
    doc += `\`\`\`ts\nnew ${ctr.parent!.displayName} (`;
    doc += ctr.parameters.map((p) => `${p.name}${p.isOptional ? '?' : ''}: ${p.parameterTypeExcerpt.text}`).join(', ');
    doc += `)\n\`\`\`\n\n`;
    doc += 'Constructs a new instance of the `' + cls.displayName + '` class.\n\n';
    doc += `**Parameters:**\n\n`;
    doc += `| Parameter | Type | Description |\n`;
    doc += `| --------- | ---- | ----------- |\n`;
    ctr.parameters.forEach((p) => {
      const summary = p.tsdocParamBlock
        ? parseSummary(p.tsdocParamBlock.content).trim()
        : '';
      doc += `| ${p.name} | ${parseTypeString(p.parameterTypeExcerpt.text)} | ${summary} |\n`;
    });
    doc += '---\n\n';
  }
  const properties = <ApiProperty[]>cls.members.filter((member) => member.kind === 'Property');
  const methods = <ApiMethod[]>cls.members.filter((member) => member.kind === 'Method');
  if (properties.length) {
    doc += `### Properties\n\n`;
    for (const prop of properties) {
      const summary = prop.tsdocComment
        ? parseSummary(prop.tsdocComment.summarySection)
        : '';
      let typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
      doc += '#### ' + prop.name + '\n\n';
      doc += `${summary}\n\n`;
      doc += `**Type**: ${typeValue}\n\n`;
      doc += '---\n\n';
    }
  }
  if (methods.length) {
    doc += `### Methods\n\n`;
    for (const method of methods) {
      const summary = method.tsdocComment
        ? parseSummary(method.tsdocComment.summarySection)
        : '';
      const typeValue = parseTypeString(method.returnTypeExcerpt.text);
      doc += `#### .${method.displayName} (${method.parameters.map((p) => p.name).join(', ')})\n\n`;
      doc += `${summary}\n\n`;
      doc += `**Signature:**\n\n`;
      doc += `\`\`\`ts\n${method.excerpt.text}\n\`\`\`\n\n`;
      if (method.parameters.length) {
        doc += `**Parameters:**\n\n`;
        doc += `| Parameter | Type | Description |\n`;
        doc += `| --------- | ---- | ----------- |\n`;
        method.parameters.forEach((p) => {
          const summary = p.tsdocParamBlock
            ? parseSummary(p.tsdocParamBlock.content).trim()
            : '';
          doc += `| ${p.name} | ${parseTypeString(p.parameterTypeExcerpt.text)} | ${summary} |\n`;
        });
      }
      doc += `\n**Return type**: ${typeValue}\n\n`;
      doc += '---\n\n';
    }
  }
  writeFileSync(join(pathToDocs, `${cls.displayName}.md`), doc);
}

console.info('Processing the functions...');

index += '---\n\n## Functions\n\n';
index += '| Function | Description |\n';
index += '| -------- | ----------- |\n';

for (const func of functions) {
  const summary = func.tsdocComment
    ? parseSummary(func.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  const name = `${func.name}(${func.parameters.map((p) => p.name).join(', ')})`;
  index += `| [${name}](/shieldbow/api/${func.displayName}.md) | ${summary} |\n`;

  // Create the function document.
  let doc = `---\ntitle: ${func.displayName}() function\ndescription: ${summary}\n---\n\n`;
  doc += `## ${func.displayName}(${func.parameters.map((p) => p.name).join(', ')}) function\n\n`;
  doc += `${summary}\n\n**Signature:**\n\n`;
  doc += `\`\`\`ts\n${func.excerpt.text}\n\`\`\`\n\n`;

  if (func.parameters.length) {
    doc += `### Parameters\n\n`;
    doc += `| Parameter | Type | Description |\n`;
    doc += `| --------- | ---- | ----------- |\n`;
    func.parameters.forEach((p) => {
      const summary = p.tsdocParamBlock
        ? parseSummary(p.tsdocParamBlock.content).trim()
        : '';
      doc += `| ${p.name} | ${parseTypeString(p.parameterTypeExcerpt.text)} | ${summary} |\n`;
    });
    doc += '\n\n';
    const returnType = parseTypeString(func.returnTypeExcerpt.text);
    doc += `**Return type :** ${returnType}\n\n`;
    doc += '---\n\n';
  }
  writeFileSync(join(pathToDocs, `${func.displayName}.md`), doc);
}

console.info('Processing the interfaces...');

index += '---\n\n## Interfaces\n\n';
index += '| Interface | Description |\n';
index += '| --------- | ----------- |\n';

for (const ifc of interfaces) {
  const summary = ifc.tsdocComment
    ? parseSummary(ifc.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${ifc.displayName}](/shieldbow/api/${ifc.displayName}.md) | ${summary} |\n`;

  // Create the interface document.
  let doc = `---\ntitle: ${ifc.displayName}\ndescription: ${summary}\n---\n\n`;
  doc += `## ${ifc.displayName} interface\n\n`;
  doc += `${summary}\n\n**Signature:**\n\n`;
  doc += `\`\`\`ts\n${ifc.excerpt.text}\n\`\`\`\n\n`;
  const references = ifc.excerptTokens.filter((token) => token.kind === 'Reference');
  if (references.length) {
    doc += '**References:** ';
    doc += references.map((r) => parseTypeString(r.text)).join(', ');
    doc += '\n\n';
  }
  const properties = <ApiProperty[]>ifc.members.filter((member) => member.kind === 'PropertySignature');
  const methods = <ApiMethod[]>ifc.members.filter((member) => member.kind === 'MethodSignature');
  if (properties.length) {
    doc += `### Properties\n\n`;
    for (const prop of properties) {
      const summary = prop.tsdocComment
        ? parseSummary(prop.tsdocComment.summarySection)
        : '';
      let typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
      doc += '#### ' + prop.name + '\n\n';
      doc += `${summary}\n\n`;
      doc += `**Type**: ${typeValue}\n\n`;
      doc += '---\n\n';
    }
  }
  if (methods.length) {
    doc += `### Methods\n\n`;
    for (const method of methods) {
      const summary = method.tsdocComment
        ? parseSummary(method.tsdocComment.summarySection)
        : '';
      const typeValue = parseTypeString(method.returnTypeExcerpt.text);
      doc += `#### .${method.displayName} (${method.parameters.map((p) => p.name).join(', ')})\n\n`;
      doc += `${summary}\n\n`;
      doc += `**Signature:**\n\n`;
      doc += `\`\`\`ts\n${method.excerpt.text}\n\`\`\`\n\n`;
      if (method.parameters.length) {
        doc += `**Parameters:**\n\n`;
        doc += `| Parameter | Type | Description |\n`;
        doc += `| --------- | ---- | ----------- |\n`;
        method.parameters.forEach((p) => {
          const summary = p.tsdocParamBlock
            ? parseSummary(p.tsdocParamBlock.content).trim()
            : '';
          doc += `| ${p.name} | ${parseTypeString(p.parameterTypeExcerpt.text)} | ${summary} |\n`;
        });
      }
      doc += `\n**Return type**: ${typeValue}\n\n`;
      doc += '---\n\n';
    }
  }
  writeFileSync(join(pathToDocs, `${ifc.displayName}.md`), doc);
}

console.info('Processing the variables...');

index += '---\n\n## Variables\n\n';
index += '| Variable | Description |\n';
index += '| -------- | ----------- |\n';

for (const v of variables) {
  const summary = v.tsdocComment
    ? parseSummary(v.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${v.displayName}](/shieldbow/api/${v.displayName}.md) | ${summary} |\n`;

  // Create the variable document.
  let doc = `---\ntitle: ${v.displayName}\ndescription: ${summary}\n---\n\n`;
  doc += `## ${v.displayName} variable\n\n`;
  doc += `${summary}\n\n**Signature:**\n\n`;
  doc += `\`\`\`ts\n${v.excerpt.text}\n\`\`\`\n\n`;
  const references = v.excerptTokens.filter((token) => token.kind === 'Reference');
  if (references.length) {
    doc += '**References:** ';
    doc += references.map((r) => parseTypeString(r.text)).join(', ');
    doc += '\n\n';
  }
  writeFileSync(join(pathToDocs, `${v.displayName}.md`), doc);
}

console.info('Processing the types...');

index += '---\n\n## Type Aliases\n\n';
index += '| Type Alias | Description |\n';
index += '| ---------- | ----------- |\n';

for (const t of types) {
  const summary = t.tsdocComment
    ? parseSummary(t.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${t.displayName}](/shieldbow/api/${t.displayName}.md) | ${summary} |\n`;

  // Create the type alias document.
  let doc = `---\ntitle: ${t.displayName}\ndescription: ${summary}\n---\n\n`;
  doc += `## ${t.displayName} type\n\n`;
  doc += `${summary}\n\n**Signature:**\n\n`;
  doc += `\`\`\`ts\n${t.excerpt.text}\n\`\`\`\n\n`;
  const references = t.excerptTokens.filter((token) => token.kind === 'Reference');
  if (references.length) {
    doc += '**References:** ';
    doc += references.map((r) => parseTypeString(r.text)).join(', ');
    doc += '\n\n';
  }
  writeFileSync(join(pathToDocs, `${t.displayName}.md`), doc);
}

console.info('Writing the index...');
writeFileSync(join(pathToDocs, 'index.md'), index);
