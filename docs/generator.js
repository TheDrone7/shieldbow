"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var api_extractor_model_1 = require("@microsoft/api-extractor-model");
var tsdoc_1 = require("@microsoft/tsdoc");
var builtins = {
    '[]': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    BigInt: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt',
    Boolean: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
    Date: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
    Error: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error',
    Map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
    Number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
    String: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
    Object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
    Undefined: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined',
    Promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    Collection: 'https://discord.js.org/#/docs/collection/stable/class/Collection'
};
var pathToApi = (0, path_1.join)(__dirname, '.vuepress', '.temp', 'api-reference', 'shieldbow.api.json');
var pathToDocs = (0, path_1.join)(__dirname, 'api');
var apiModel = new api_extractor_model_1.ApiModel();
apiModel.loadPackage(pathToApi);
var api = apiModel.packages[0].members[0];
var entries = api.members.map(function (member) { return member.displayName; });
var classes = api.members.filter(function (member) { return member.kind === 'Class'; });
var functions = api.members.filter(function (member) { return member.kind === 'Function'; });
var interfaces = api.members.filter(function (member) { return member.kind === 'Interface'; });
var variables = api.members.filter(function (member) { return member.kind === 'Variable'; });
var types = api.members.filter(function (member) { return member.kind === 'TypeAlias'; });
var parseSummary = function (summary) {
    var _a;
    var text = '';
    for (var _i = 0, _b = summary.getChildNodes(); _i < _b.length; _i++) {
        var node = _b[_i];
        if (node instanceof tsdoc_1.DocPlainText)
            text += node.text;
        else if (node instanceof tsdoc_1.DocSoftBreak)
            text += '\n';
        else if (node instanceof tsdoc_1.DocParagraph)
            text += parseSummary(node) + '\n';
        else if (node instanceof tsdoc_1.DocEscapedText)
            text += node.encodedText;
        else if (node instanceof tsdoc_1.DocCodeSpan)
            text += "`".concat(node.code, "`");
        else if (node instanceof tsdoc_1.DocLinkTag) {
            var d = (_a = node.codeDestination) === null || _a === void 0 ? void 0 : _a.memberReferences.map(function (r) { var _a; return (_a = r.memberIdentifier) === null || _a === void 0 ? void 0 : _a.identifier; });
            var d2 = node.urlDestination;
            var link = d ? "/api/".concat(d[0], ".md#").concat(d[1]) : d2;
            var linkText = node.linkText || (d === null || d === void 0 ? void 0 : d.join('.')) || d2;
            text += "[".concat(linkText, "](").concat(link, ")");
        }
        else
            console.log(node.kind);
    }
    return text;
};
var linkTo = function (name) { return "[".concat(name, "](/api/").concat(name, ".md)"); };
var parseTypeString = function (type) {
    type = type.replace(/(?<!\\)</g, ' \\< ');
    type = type.replace(/(?<!\\)>/g, ' \\>');
    type = type.replace(/\|/g, '\\|');
    type = type.replace(/\n/g, ' ');
    for (var _i = 0, _a = Object.entries(builtins); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var link = "[".concat(key, "](").concat(value, ")");
        type = type.replace(new RegExp("(?<=(< )|^|(, )|(\\| ))".concat(key), 'ig'), link);
    }
    for (var _c = 0, _d = entries.sort(function (a, b) { return b.length - a.length; }); _c < _d.length; _c++) {
        var entry = _d[_c];
        type = type.replace(new RegExp("(?<=(< )|^|(, )|(\\| ))".concat(entry), 'g'), linkTo(entry));
    }
    return type;
};
// Delete the already existing docs.
console.info('Deleting the existing docs...');
var files = (0, fs_1.readdirSync)(pathToDocs);
files.forEach(function (file) { return (0, fs_1.unlinkSync)((0, path_1.join)(pathToDocs, file)); });
var index = "# API Reference\n\n";
console.info('Processing the classes...');
// The classes.
index += "## Classes\n\n";
index += '| Class | Description |\n';
index += '| ----- | ----------- |\n';
var _loop_1 = function (cls) {
    var summary = cls.tsdocComment ? parseSummary(cls.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    index += "| [".concat(cls.displayName, "](/api/").concat(cls.displayName, ".md) | ").concat(summary, " |\n");
    // Create the class document.
    var doc = "---\ntitle: ".concat(cls.displayName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(cls.displayName, " class\n\n");
    doc += "".concat(summary, "\n\n**Signature:**\n\n");
    doc += "```ts\n".concat(cls.excerpt.text, "\n```\n\n");
    if (cls.extendsType && cls.extendsType.excerpt && !cls.extendsType.excerpt.isEmpty)
        doc += "**Extends: ".concat(cls.extendsType.excerpt.text, "**\n\n");
    if (cls.implementsTypes.length) {
        var implementTypes = cls.implementsTypes
            .map(function (t) { return t.excerpt.text; })
            .map(function (t) {
            return t + '\\>';
        });
        doc += "Implements: ".concat(implementTypes, "\n\n");
    }
    var references = cls.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    doc += '---\n\n';
    var ctr = cls.members.filter(function (member) { return member.kind === 'Constructor'; })[0];
    if (ctr) {
        doc += "### Constructor\n\n";
        doc += "```ts\nnew ".concat(ctr.parent.displayName, " (");
        doc += ctr.parameters.map(function (p) { return "".concat(p.name).concat(p.isOptional ? '?' : '', ": ").concat(p.parameterTypeExcerpt.text); }).join(', ');
        doc += ")\n```\n\n";
        doc += 'Constructs a new instance of the `' + cls.displayName + '` class.\n\n';
        doc += "**Parameters:**\n\n";
        doc += "| Parameter | Type | Description |\n";
        doc += "| --------- | ---- | ----------- |\n";
        ctr.parameters.forEach(function (p) {
            var summary = p.tsdocParamBlock ? parseSummary(p.tsdocParamBlock.content).trim() : '';
            doc += "| ".concat(p.name, " | ").concat(parseTypeString(p.parameterTypeExcerpt.text), " | ").concat(summary, " |\n");
        });
        doc += '---\n\n';
    }
    var properties = cls.members.filter(function (member) { return member.kind === 'Property'; });
    var methods = cls.members.filter(function (member) { return member.kind === 'Method'; });
    if (properties.length) {
        doc += "### Properties\n\n";
        for (var _e = 0, properties_1 = properties; _e < properties_1.length; _e++) {
            var prop = properties_1[_e];
            var summary_1 = prop.tsdocComment ? parseSummary(prop.tsdocComment.summarySection) : '';
            var typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
            doc += '#### ' + prop.name + '\n\n';
            doc += "".concat(summary_1, "\n\n");
            doc += "**Type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    if (methods.length) {
        doc += "### Methods\n\n";
        for (var _f = 0, methods_1 = methods; _f < methods_1.length; _f++) {
            var method = methods_1[_f];
            var summary_2 = method.tsdocComment ? parseSummary(method.tsdocComment.summarySection) : '';
            var typeValue = parseTypeString(method.returnTypeExcerpt.text);
            doc += "#### .".concat(method.displayName, " (").concat(method.parameters.map(function (p) { return p.name; }).join(', '), ")\n\n");
            doc += "".concat(summary_2, "\n\n");
            doc += "**Signature:**\n\n";
            doc += "```ts\n".concat(method.excerpt.text, "\n```\n\n");
            if (method.parameters.length) {
                doc += "**Parameters:**\n\n";
                doc += "| Parameter | Type | Description |\n";
                doc += "| --------- | ---- | ----------- |\n";
                method.parameters.forEach(function (p) {
                    var summary = p.tsdocParamBlock ? parseSummary(p.tsdocParamBlock.content).trim() : '';
                    doc += "| ".concat(p.name, " | ").concat(parseTypeString(p.parameterTypeExcerpt.text), " | ").concat(summary, " |\n");
                });
            }
            doc += "\n**Return type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, "".concat(cls.displayName, ".md")), doc);
};
for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
    var cls = classes_1[_i];
    _loop_1(cls);
}
console.info('Processing the functions...');
index += '---\n\n## Functions\n\n';
index += '| Function | Description |\n';
index += '| -------- | ----------- |\n';
var _loop_2 = function (func) {
    var summary = func.tsdocComment ? parseSummary(func.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var name_1 = "".concat(func.name, "(").concat(func.parameters.map(function (p) { return p.name; }).join(', '), ")");
    index += "| [".concat(name_1, "](/api/").concat(func.displayName, ".md) | ").concat(summary, " |\n");
    // Create the function document.
    var doc = "---\ntitle: ".concat(func.displayName, "() function\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(func.displayName, "(").concat(func.parameters.map(function (p) { return p.name; }).join(', '), ") function\n\n");
    doc += "".concat(summary, "\n\n**Signature:**\n\n");
    doc += "```ts\n".concat(func.excerpt.text, "\n```\n\n");
    if (func.parameters.length) {
        doc += "### Parameters\n\n";
        doc += "| Parameter | Type | Description |\n";
        doc += "| --------- | ---- | ----------- |\n";
        func.parameters.forEach(function (p) {
            var summary = p.tsdocParamBlock ? parseSummary(p.tsdocParamBlock.content).trim() : '';
            doc += "| ".concat(p.name, " | ").concat(parseTypeString(p.parameterTypeExcerpt.text), " | ").concat(summary, " |\n");
        });
        doc += '\n\n';
        var returnType = parseTypeString(func.returnTypeExcerpt.text);
        doc += "**Return type :** ".concat(returnType, "\n\n");
        doc += '---\n\n';
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, "".concat(func.displayName, ".md")), doc);
};
for (var _a = 0, functions_1 = functions; _a < functions_1.length; _a++) {
    var func = functions_1[_a];
    _loop_2(func);
}
console.info('Processing the interfaces...');
index += '---\n\n## Interfaces\n\n';
index += '| Interface | Description |\n';
index += '| --------- | ----------- |\n';
var _loop_3 = function (ifc) {
    var summary = ifc.tsdocComment ? parseSummary(ifc.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    index += "| [".concat(ifc.displayName, "](/api/").concat(ifc.displayName, ".md) | ").concat(summary, " |\n");
    if (ifc.displayName.includes('Image'))
        console.log(ifc.displayName);
    // Create the interface document.
    var doc = "---\ntitle: ".concat(ifc.displayName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(ifc.displayName, " interface\n\n");
    doc += "".concat(summary, "\n\n**Signature:**\n\n");
    doc += "```ts\n".concat(ifc.excerpt.text, "\n```\n\n");
    var references = ifc.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    var properties = ifc.members.filter(function (member) { return member.kind === 'PropertySignature'; });
    var methods = ifc.members.filter(function (member) { return member.kind === 'MethodSignature'; });
    if (properties.length) {
        doc += "### Properties\n\n";
        for (var _g = 0, properties_2 = properties; _g < properties_2.length; _g++) {
            var prop = properties_2[_g];
            var summary_3 = prop.tsdocComment ? parseSummary(prop.tsdocComment.summarySection) : '';
            var typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
            doc += '#### ' + prop.name + '\n\n';
            doc += "".concat(summary_3, "\n\n");
            doc += "**Type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    if (methods.length) {
        doc += "### Methods\n\n";
        for (var _h = 0, methods_2 = methods; _h < methods_2.length; _h++) {
            var method = methods_2[_h];
            var summary_4 = method.tsdocComment ? parseSummary(method.tsdocComment.summarySection) : '';
            var typeValue = parseTypeString(method.returnTypeExcerpt.text);
            doc += "#### .".concat(method.displayName, " (").concat(method.parameters.map(function (p) { return p.name; }).join(', '), ")\n\n");
            doc += "".concat(summary_4, "\n\n");
            doc += "**Signature:**\n\n";
            doc += "```ts\n".concat(method.excerpt.text, "\n```\n\n");
            if (method.parameters.length) {
                doc += "**Parameters:**\n\n";
                doc += "| Parameter | Type | Description |\n";
                doc += "| --------- | ---- | ----------- |\n";
                method.parameters.forEach(function (p) {
                    var summary = p.tsdocParamBlock ? parseSummary(p.tsdocParamBlock.content).trim() : '';
                    doc += "| ".concat(p.name, " | ").concat(parseTypeString(p.parameterTypeExcerpt.text), " | ").concat(summary, " |\n");
                });
            }
            doc += "\n**Return type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, "".concat(ifc.displayName, ".md")), doc);
};
for (var _b = 0, interfaces_1 = interfaces; _b < interfaces_1.length; _b++) {
    var ifc = interfaces_1[_b];
    _loop_3(ifc);
}
console.info('Processing the variables...');
index += '---\n\n## Variables\n\n';
index += '| Variable | Description |\n';
index += '| -------- | ----------- |\n';
for (var _c = 0, variables_1 = variables; _c < variables_1.length; _c++) {
    var v = variables_1[_c];
    var summary = v.tsdocComment ? parseSummary(v.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    index += "| [".concat(v.displayName, "](/api/").concat(v.displayName, ".md) | ").concat(summary, " |\n");
    // Create the variable document.
    var doc = "---\ntitle: ".concat(v.displayName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(v.displayName, " variable\n\n");
    doc += "".concat(summary, "\n\n**Signature:**\n\n");
    doc += "```ts\n".concat(v.excerpt.text, "\n```\n\n");
    var references = v.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, "".concat(v.displayName, ".md")), doc);
}
console.info('Processing the types...');
index += '---\n\n## Type Aliases\n\n';
index += '| Type Alias | Description |\n';
index += '| ---------- | ----------- |\n';
for (var _d = 0, types_1 = types; _d < types_1.length; _d++) {
    var t = types_1[_d];
    var summary = t.tsdocComment ? parseSummary(t.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    index += "| [".concat(t.displayName, "](/api/").concat(t.displayName, ".md) | ").concat(summary, " |\n");
    // Create the type alias document.
    var doc = "---\ntitle: ".concat(t.displayName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(t.displayName, " type\n\n");
    doc += "".concat(summary, "\n\n**Signature:**\n\n");
    doc += "```ts\n".concat(t.excerpt.text, "\n```\n\n");
    var references = t.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, "".concat(t.displayName, ".md")), doc);
}
console.info('Writing the index...');
(0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, 'index.md'), index);
