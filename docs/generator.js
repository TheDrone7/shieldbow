"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var api_extractor_model_1 = require("@microsoft/api-extractor-model");
var tsdoc_1 = require("@microsoft/tsdoc");
var parseSummary = function (summary) {
    var text = '';
    for (var _i = 0, _a = summary.getChildNodes(); _i < _a.length; _i++) {
        var node = _a[_i];
        if (node instanceof tsdoc_1.DocPlainText)
            text += node.text;
        if (node instanceof tsdoc_1.DocSoftBreak)
            text += '\n';
        if (node instanceof tsdoc_1.DocParagraph)
            text += parseSummary(node) + '\n';
    }
    return text;
};
var pathToApi = (0, path_1.join)(__dirname, '.vuepress', '.temp', 'api-reference', 'shieldbow.api.json');
var pathToDocs = (0, path_1.join)(__dirname, 'api');
// Delete the already existing docs.
console.info('Deleting the existing docs...');
var files = (0, fs_1.readdirSync)(pathToDocs);
files.forEach(function (file) { return (0, fs_1.unlinkSync)((0, path_1.join)(pathToDocs, file)); });
console.info('Processing the index...');
var apiModel = new api_extractor_model_1.ApiModel();
apiModel.loadPackage(pathToApi);
var api = apiModel.packages[0].members[0];
var classes = api.members.filter(function (member) { return member.kind === 'Class'; });
var functions = api.members.filter(function (member) { return member.kind === 'Function'; });
var interfaces = api.members.filter(function (member) { return member.kind === 'Interface'; });
var variables = api.members.filter(function (member) { return member.kind === 'Variable'; });
var types = api.members.filter(function (member) { return member.kind === 'TypeAlias'; });
var index = "# API Reference\n\n";
// The classes.
index += "## Classes\n\n";
index += '| Class | Description |\n';
index += '| ----- | ----------- |\n';
for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
    var cls = classes_1[_i];
    var summary = cls.tsdocComment
        ? parseSummary(cls.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
        : '';
    index += "| [".concat(cls.displayName, "](/shieldbow/api/").concat(cls.displayName, ".html) | ").concat(summary, " |\n");
}
index += '---\n\n## Functions\n\n';
index += '| Function | Description |\n';
index += '| -------- | ----------- |\n';
for (var _a = 0, functions_1 = functions; _a < functions_1.length; _a++) {
    var func = functions_1[_a];
    var summary = func.tsdocComment
        ? parseSummary(func.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
        : '';
    var name_1 = "".concat(func.name, "(").concat(func.parameters.map(function (p) { return p.name; }).join(', '), ")");
    index += "| [".concat(name_1, "](/shieldbow/api/").concat(func.displayName, ".html) | ").concat(summary, " |\n");
}
index += '---\n\n## Interfaces\n\n';
index += '| Interface | Description |\n';
index += '| --------- | ----------- |\n';
for (var _b = 0, interfaces_1 = interfaces; _b < interfaces_1.length; _b++) {
    var ifc = interfaces_1[_b];
    var summary = ifc.tsdocComment
        ? parseSummary(ifc.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
        : '';
    index += "| [".concat(ifc.displayName, "](/shieldbow/api/").concat(ifc.displayName, ".html) | ").concat(summary, " |\n");
}
index += '---\n\n## Variables\n\n';
index += '| Variable | Description |\n';
index += '| -------- | ----------- |\n';
for (var _c = 0, variables_1 = variables; _c < variables_1.length; _c++) {
    var v = variables_1[_c];
    var summary = v.tsdocComment
        ? parseSummary(v.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
        : '';
    index += "| [".concat(v.displayName, "](/shieldbow/api/").concat(v.displayName, ".html) | ").concat(summary, " |\n");
}
index += '---\n\n## Type Aliases\n\n';
index += '| Type Alias | Description |\n';
index += '| ---------- | ----------- |\n';
for (var _d = 0, types_1 = types; _d < types_1.length; _d++) {
    var t = types_1[_d];
    var summary = t.tsdocComment
        ? parseSummary(t.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd()
        : '';
    index += "| [".concat(t.displayName, "](/shieldbow/api/").concat(t.displayName, ".html) | ").concat(summary, " |\n");
}
(0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, 'index.md'), index);
