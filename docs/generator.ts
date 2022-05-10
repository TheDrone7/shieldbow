import { unlinkSync, readdirSync, writeFileSync } from "fs";
import { join } from 'path';
import {
  ApiModel,
  ApiEntryPoint,
  ApiClass,
  ApiFunction
} from '@microsoft/api-extractor-model';
import { DocNode, DocPlainText, DocSoftBreak, DocParagraph } from '@microsoft/tsdoc';

const parseSummary = (summary: DocNode) => {
  let text = '';
  for (const node of summary.getChildNodes()) {
    if (node instanceof DocPlainText) text += node.text;
    if (node instanceof DocSoftBreak) text += '\n';
    if (node instanceof DocParagraph) text += parseSummary(node) + '\n';
  }
  return text;
}

const pathToApi = join(__dirname, '.vuepress', '.temp', 'api-reference', 'shieldbow.api.json');
const pathToDocs = join(__dirname, 'api');

// Delete the already existing docs.
console.info('Deleting the existing docs...');
const files = readdirSync(pathToDocs);
files.forEach((file) => unlinkSync(join(pathToDocs, file)));

console.info('Processing the index...');
const apiModel = new ApiModel();
apiModel.loadPackage(pathToApi);
const api = apiModel.packages[0].members[0] as ApiEntryPoint;
const classes = <ApiClass[]>api.members.filter((member) => member.kind === 'Class');
const functions = <ApiFunction[]>api.members.filter((member) => member.kind === 'Function');
const interfaces = <ApiFunction[]>api.members.filter((member) => member.kind === 'Interface');
const variables = <ApiFunction[]>api.members.filter((member) => member.kind === 'Variable');
const types = <ApiFunction[]>api.members.filter((member) => member.kind === 'TypeAlias');
let index = `# API Reference\n\n`;

console.info('Parsing the classes.');
// The classes.
index += `## Classes\n\n`;
index += '| Class | Description |\n';
index += '| ----- | ----------- |\n';

for (const cls of classes) {
  const summary = cls.tsdocComment
    ? parseSummary(cls.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${cls.displayName}](/shieldbow/api/${cls.displayName}.html) | ${summary} |\n`;
}

index += '---\n\n## Functions\n\n';
index += '| Function | Description |\n';
index += '| -------- | ----------- |\n';

for (const func of functions) {
  const summary = func.tsdocComment
    ? parseSummary(func.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  const name = `${func.name}(${func.parameters.map((p) => p.name).join(', ')})`;
  index += `| [${name}](/shieldbow/api/${func.displayName}.html) | ${summary} |\n`;
}

index += '---\n\n## Interfaces\n\n';
index += '| Interface | Description |\n';
index += '| --------- | ----------- |\n';

for (const ifc of interfaces) {
  const summary = ifc.tsdocComment
    ? parseSummary(ifc.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${ifc.displayName}](/shieldbow/api/${ifc.displayName}.html) | ${summary} |\n`;
}

index += '---\n\n## Variables\n\n';
index += '| Variable | Description |\n';
index += '| -------- | ----------- |\n';

for (const v of variables) {
  const summary = v.tsdocComment
    ? parseSummary(v.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${v.displayName}](/shieldbow/api/${v.displayName}.html) | ${summary} |\n`;
}

index += '---\n\n## Type Aliases\n\n';
index += '| Type Alias | Description |\n';
index += '| ---------- | ----------- |\n';

for (const t of types) {
  const summary = t.tsdocComment
    ? parseSummary(t.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
    : '';
  index += `| [${t.displayName}](/shieldbow/api/${t.displayName}.html) | ${summary} |\n`;
}

writeFileSync(join(pathToDocs, 'index.md'), index);
