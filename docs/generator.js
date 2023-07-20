"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var html_escaper_1 = require("html-escaper");
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
var pathToApi = (0, path_1.join)(__dirname, '.nuxt', '.temp', 'api-reference', 'shieldbow.api.json');
var pathToDocs = (0, path_1.join)(__dirname, 'content', '2.api');
var pathToClasses = (0, path_1.join)(pathToDocs, '1.classes');
var pathToInterfaces = (0, path_1.join)(pathToDocs, '2.interfaces');
var pathToFunctions = (0, path_1.join)(pathToDocs, '3.functions');
var pathToTypes = (0, path_1.join)(pathToDocs, '4.types');
var pathToVariables = (0, path_1.join)(pathToDocs, '5.variables');
var pathsToDocs = [pathToClasses, pathToInterfaces, pathToFunctions, pathToTypes, pathToVariables];
var apiModel = new api_extractor_model_1.ApiModel();
apiModel.loadPackage(pathToApi);
var api = apiModel.packages[0].members[0];
var entries = api.members.map(function (member) { return member.displayName; });
var classes = api.members.filter(function (member) { return member.kind === 'Class'; });
var functions = api.members.filter(function (member) { return member.kind === 'Function'; });
var interfaces = api.members.filter(function (member) { return member.kind === 'Interface'; });
var variables = api.members.filter(function (member) { return member.kind === 'Variable'; });
var types = api.members.filter(function (member) { return member.kind === 'TypeAlias'; });
var parseName = function (n) {
    if (n.includes('_'))
        return n.substring(0, n.indexOf('_'));
    else
        return n;
};
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
            var link = d ? "/api/".concat(d[0].toLowerCase(), "#").concat(d[1] ? d[1].toLowerCase() : '') : d2;
            var linkText = node.linkText || (d === null || d === void 0 ? void 0 : d.join('.')) || d2;
            text += "[".concat(linkText, "](").concat(link, ")");
        }
        else
            console.log(node.kind);
    }
    return text;
};
var findType = function (name) {
    if (types.some(function (t) { return t.displayName === name; }))
        return 'types';
    if (interfaces.some(function (t) { return t.displayName === name; }))
        return 'interfaces';
    if (classes.some(function (t) { return t.displayName === name; }))
        return 'classes';
    if (functions.some(function (t) { return t.displayName === name; }))
        return 'classes';
    if (variables.some(function (t) { return t.displayName === name; }))
        return 'variables';
    return 'interfaces';
};
var linkTo = function (name) { return "[".concat(name, "](/api/").concat(findType(name), "/").concat(name.toLowerCase(), ")"); };
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
if ((0, fs_1.existsSync)(pathToDocs)) {
    var _loop_1 = function (p) {
        if ((0, fs_1.existsSync)(p)) {
            var files = (0, fs_1.readdirSync)(p);
            files.forEach(function (file) { return file.includes('.md') ? (0, fs_1.unlinkSync)((0, path_1.join)(p, file)) : null; });
        }
        else
            (0, fs_1.mkdirSync)(p);
    };
    for (var _i = 0, pathsToDocs_1 = pathsToDocs; _i < pathsToDocs_1.length; _i++) {
        var p = pathsToDocs_1[_i];
        _loop_1(p);
    }
}
else
    (0, fs_1.mkdirSync)(pathToDocs);
var index = "# API Reference\n\n";
console.info('Processing the classes...');
// The classes.
index += "## Classes\n\n";
index += '| Class | Description |\n';
index += '| ----- | ----------- |\n';
var _loop_2 = function (cls) {
    var cName = parseName(cls.displayName);
    var summary = cls.tsdocComment ? parseSummary(cls.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var deprecated = ((_a = cls.tsdocComment) === null || _a === void 0 ? void 0 : _a.deprecatedBlock) ? parseSummary(cls.tsdocComment.deprecatedBlock.content) : '';
    index += "| [".concat(cName, "](/api/classes/").concat(cName.toLowerCase(), ") | ").concat(summary, " |\n");
    // Create the class document.
    var doc = "---\ntitle: ".concat(cName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "# ".concat(cName, " class\n\n---\n\n");
    doc += "".concat(summary, "\n\n");
    if (deprecated.length)
        doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated, "\n\n::\n\n");
    doc += "**Signature:**\n\n";
    doc += "```ts\n".concat(cls.excerpt.text, "\n```\n\n");
    if (cls.extendsType && cls.extendsType.excerpt && !cls.extendsType.excerpt.isEmpty)
        doc += "**Extends: ".concat(cls.extendsType.excerpt.text, "**\n\n");
    if (cls.implementsTypes.length) {
        var implementTypes = cls.implementsTypes.map(function (t) { return t.excerpt.text; }).map(function (t) { return (0, html_escaper_1.escape)(t); });
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
        doc += 'Constructs a new instance of the `' + cName + '` class.\n\n';
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
        for (var _q = 0, properties_1 = properties; _q < properties_1.length; _q++) {
            var prop = properties_1[_q];
            var summary_1 = prop.tsdocComment ? parseSummary(prop.tsdocComment.summarySection) : '';
            var deprecated_1 = ((_b = prop.tsdocComment) === null || _b === void 0 ? void 0 : _b.deprecatedBlock)
                ? parseSummary(prop.tsdocComment.deprecatedBlock.content)
                : '';
            var typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
            doc += '#### ' + prop.name + '\n\n';
            doc += "".concat(summary_1, "\n\n");
            if (deprecated_1.length)
                doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated_1, "\n\n::\n\n");
            doc += "**Type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    if (methods.length) {
        doc += "### Methods\n\n";
        for (var _r = 0, methods_1 = methods; _r < methods_1.length; _r++) {
            var method = methods_1[_r];
            var summary_2 = method.tsdocComment ? parseSummary(method.tsdocComment.summarySection) : '';
            var deprecated_2 = ((_c = method.tsdocComment) === null || _c === void 0 ? void 0 : _c.deprecatedBlock)
                ? parseSummary(method.tsdocComment.deprecatedBlock.content)
                : '';
            var typeValue = parseTypeString(method.returnTypeExcerpt.text);
            doc += "#### .".concat(method.displayName, " ()\n\n");
            doc += "".concat(summary_2, "\n\n");
            if (deprecated_2.length)
                doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated_2, "\n\n::\n\n");
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
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToClasses, "".concat(cName, ".md")), doc);
};
for (var _k = 0, classes_1 = classes; _k < classes_1.length; _k++) {
    var cls = classes_1[_k];
    _loop_2(cls);
}
console.info('Processing the functions...');
index += '---\n\n## Functions\n\n';
index += '| Function | Description |\n';
index += '| -------- | ----------- |\n';
var _loop_3 = function (func) {
    var fName = parseName(func.displayName);
    var summary = func.tsdocComment ? parseSummary(func.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var deprecated = ((_d = func.tsdocComment) === null || _d === void 0 ? void 0 : _d.deprecatedBlock) ? parseSummary(func.tsdocComment.deprecatedBlock.content) : '';
    var name_1 = "".concat(fName, "(").concat(func.parameters.map(function (p) { return p.name; }).join(', '), ")");
    index += "| [".concat(name_1, "](/api/functions/").concat(fName.toLowerCase(), ") | ").concat(summary, " |\n");
    // Create the function document.
    var doc = "---\ntitle: ".concat(fName, "() function\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(fName, "(").concat(func.parameters.map(function (p) { return p.name; }).join(', '), ") function\n\n");
    doc += "".concat(summary, "\n\n");
    if (deprecated.length)
        doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated, "\n\n::\n\n");
    doc += "**Signature:**\n\n";
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
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToFunctions, "".concat(fName, ".md")), doc);
};
for (var _l = 0, functions_1 = functions; _l < functions_1.length; _l++) {
    var func = functions_1[_l];
    _loop_3(func);
}
console.info('Processing the interfaces...');
index += '---\n\n## Interfaces\n\n';
index += '| Interface | Description |\n';
index += '| --------- | ----------- |\n';
var _loop_4 = function (ifc) {
    var iName = parseName(ifc.displayName);
    var summary = ifc.tsdocComment ? parseSummary(ifc.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var deprecated = ((_e = ifc.tsdocComment) === null || _e === void 0 ? void 0 : _e.deprecatedBlock) ? parseSummary(ifc.tsdocComment.deprecatedBlock.content) : '';
    index += "| [".concat(iName, "](/api/interfaces/").concat(iName.toLowerCase(), ") | ").concat(summary, " |\n");
    // Create the interface document.
    var doc = "---\ntitle: ".concat(iName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(iName, " interface\n\n");
    doc += "".concat(summary, "\n\n");
    if (deprecated.length)
        doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated, "\n\n::\n\n");
    doc += '**Signature:**\n\n';
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
        for (var _s = 0, properties_2 = properties; _s < properties_2.length; _s++) {
            var prop = properties_2[_s];
            var summary_3 = prop.tsdocComment ? parseSummary(prop.tsdocComment.summarySection) : '';
            var deprecated_3 = ((_f = prop.tsdocComment) === null || _f === void 0 ? void 0 : _f.deprecatedBlock)
                ? parseSummary(prop.tsdocComment.deprecatedBlock.content)
                : '';
            var typeValue = parseTypeString(prop.propertyTypeExcerpt.text);
            doc += '#### ' + prop.name + '\n\n';
            doc += "".concat(summary_3, "\n\n");
            if (deprecated_3.length)
                doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated_3, "\n\n::\n\n");
            doc += "**Type**: ".concat(typeValue, "\n\n");
            doc += '---\n\n';
        }
    }
    if (methods.length) {
        doc += "### Methods\n\n";
        for (var _t = 0, methods_2 = methods; _t < methods_2.length; _t++) {
            var method = methods_2[_t];
            var summary_4 = method.tsdocComment ? parseSummary(method.tsdocComment.summarySection) : '';
            var deprecated_4 = ((_g = method.tsdocComment) === null || _g === void 0 ? void 0 : _g.deprecatedBlock)
                ? parseSummary(method.tsdocComment.deprecatedBlock.content)
                : '';
            var typeValue = parseTypeString(method.returnTypeExcerpt.text);
            doc += "#### .".concat(method.displayName, " ()\n\n");
            doc += "".concat(summary_4, "\n\n");
            if (deprecated_4.length)
                doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated_4, "\n\n::\n\n");
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
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToInterfaces, "".concat(iName, ".md")), doc);
};
for (var _m = 0, interfaces_1 = interfaces; _m < interfaces_1.length; _m++) {
    var ifc = interfaces_1[_m];
    _loop_4(ifc);
}
console.info('Processing the variables...');
index += '---\n\n## Variables\n\n';
index += '| Variable | Description |\n';
index += '| -------- | ----------- |\n';
for (var _o = 0, variables_1 = variables; _o < variables_1.length; _o++) {
    var v = variables_1[_o];
    var vName = parseName(v.displayName);
    var summary = v.tsdocComment ? parseSummary(v.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var deprecated = ((_h = v.tsdocComment) === null || _h === void 0 ? void 0 : _h.deprecatedBlock) ? parseSummary(v.tsdocComment.deprecatedBlock.content) : '';
    index += "| [".concat(vName, "](/api/variables/").concat(vName.toLowerCase(), ") | ").concat(summary, " |\n");
    // Create the variable document.
    var doc = "---\ntitle: ".concat(vName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(vName, " variable\n\n");
    doc += "".concat(summary, "\n\n");
    if (deprecated.length)
        doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated, "\n\n::\n\n");
    doc += '**Signature:**\n\n';
    doc += "```ts\n".concat(v.excerpt.text, "\n```\n\n");
    var references = v.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToVariables, "".concat(vName, ".md")), doc);
}
console.info('Processing the types...');
index += '---\n\n## Type Aliases\n\n';
index += '| Type Alias | Description |\n';
index += '| ---------- | ----------- |\n';
for (var _p = 0, types_1 = types; _p < types_1.length; _p++) {
    var t = types_1[_p];
    var tName = parseName(t.displayName);
    var summary = t.tsdocComment ? parseSummary(t.tsdocComment.summarySection).replace(/\n/g, ' ').trimEnd() : '';
    var deprecated = ((_j = t.tsdocComment) === null || _j === void 0 ? void 0 : _j.deprecatedBlock) ? parseSummary(t.tsdocComment.deprecatedBlock.content) : '';
    index += "| [".concat(tName, "](/api/types/").concat(tName.toLowerCase(), ") | ").concat(summary, " |\n");
    // Create the type alias document.
    var doc = "---\ntitle: ".concat(tName, "\ndescription: ").concat(summary, "\n---\n\n");
    doc += "## ".concat(tName, " type\n\n");
    doc += "".concat(summary, "\n\n");
    if (deprecated.length)
        doc += "::alert{type=\"warning\"} \n\nThis is now **deprecated**. ".concat(deprecated, "\n\n::\n\n");
    doc += '**Signature:**\n\n';
    doc += "```ts\n".concat(t.excerpt.text, "\n```\n\n");
    var references = t.excerptTokens.filter(function (token) { return token.kind === 'Reference'; });
    if (references.length) {
        doc += '**References:** ';
        doc += references.map(function (r) { return parseTypeString(r.text); }).join(', ');
        doc += '\n\n';
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(pathToTypes, "".concat(tName, ".md")), doc);
}
console.info('Writing the index...');
(0, fs_1.writeFileSync)((0, path_1.join)(pathToDocs, '0.index.md'), index);
