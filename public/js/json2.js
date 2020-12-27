function json2go(json, typename, flatten = true) {
    let data;
    let scope;
    let go = "";
    let tabs = 0;
    const seen = {};
    const stack = [];
    let accumulator = "";
    let innerTabs = 0;
    let parent = "";
    try {
        data = JSON.parse(json.replace(/\.0/g, ".1"));
        scope = data;
    } catch (e) {
        return {go: "", error: e.message};
    }
    typename = format(typename || "AutoGenerated");
    append(`type ${typename} `);
    parseScope(scope);
    return {go: flatten ? go += accumulator : go};

    function parseScope(scope, depth = 0) {
        if (typeof scope === "object" && scope !== null) {
            if (Array.isArray(scope)) {
                let sliceType;
                const scopeLength = scope.length;
                for (let i = 0;
                     i < scopeLength;
                     i++) {
                    const thisType = goType(scope[i]);
                    if (!sliceType)
                        sliceType = thisType;
                    else if (sliceType !== thisType) {
                        sliceType = mostSpecificPossibleGoType(thisType, sliceType);
                        if (sliceType === "interface{}")
                            break;

                    }
                }
                const slice = flatten && ["struct", "slice"].includes(sliceType) ? `[]${parent}` : `[]`;
                if (flatten && depth >= 2)
                    appender(slice);
                else
                    append(slice);
                if (sliceType === "struct") {
                    const allFields = {};
                    for (let i = 0;
                         i < scopeLength;
                         i++) {
                        const keys = Object.keys(scope[i]);
                        for (let k in keys) {
                            let keyname = keys[k];
                            if (!(keyname in allFields)) {
                                allFields[keyname] = {value: scope[i][keyname], count: 0}
                            } else {
                                const existingValue = allFields[keyname].value;
                                const currentValue = scope[i][keyname];
                                if (compareObjects(existingValue, currentValue)) {
                                    const comparisonResult = compareObjectKeys(Object.keys(currentValue), Object.keys(existingValue));
                                    if (!comparisonResult) {
                                        keyname = `${keyname}_${uuidv4()}`;
                                        allFields[keyname] = {value: currentValue, count: 0};
                                    }
                                }
                            }
                            allFields[keyname].count++;

                        }
                    }
                    const keys = Object.keys(allFields), struct = {}, omitempty = {};
                    for (let k in keys) {
                        const keyname = keys[k], elem = allFields[keyname];
                        struct[keyname] = elem.value;
                        omitempty[keyname] = elem.count !== scopeLength;
                    }
                    parseStruct(depth + 1, innerTabs, struct, omitempty);

                } else if (sliceType === "slice") {
                    parseScope(scope[0], depth)
                } else {
                    if (flatten && depth >= 2) {
                        appender(sliceType || "interface{}");
                    } else {
                        append(sliceType || "interface{}");
                    }
                }
            } else {
                if (flatten) {
                    if (depth >= 2) {
                        appender(parent)
                    } else {
                        append(parent)
                    }
                }
                parseStruct(depth + 1, innerTabs, scope);

            }
        } else {
            if (flatten && depth >= 2) {
                appender(goType(scope));
            } else {
                append(goType(scope));
            }
        }
    }

    function parseStruct(depth, innerTabs, scope, omitempty) {
        if (flatten) {
            stack.push(depth >= 2 ? "\n" : "")
        }
        if (flatten && depth >= 2) {
            const parentType = `type ${parent}`;
            const scopeKeys = formatScopeKeys(Object.keys(scope));
            if (parent in seen && compareObjectKeys(scopeKeys, seen[parent])) {
                stack.pop();
                return
            }
            seen[parent] = scopeKeys;
            appender(`${parentType} struct {\n`);
            ++innerTabs;
            const keys = Object.keys(scope);
            for (let i in keys) {
                const keyname = getOriginalName(keys[i]);
                indenter(innerTabs);
                const typename = format(keyname);
                appender(typename + " ");
                parent = typename;
                parseScope(scope[keys[i]], depth);
                appender(' `json:"' + keyname);
                if (omitempty && omitempty[keys[i]] === true) {
                    appender(',omitempty');
                }
                appender('"`\n');

            }
            indenter(--innerTabs);
            appender("}");

        } else {
            append("struct {\n");
            ++tabs;
            const keys = Object.keys(scope);
            for (let i in keys) {
                const keyname = getOriginalName(keys[i]);
                indent(tabs);
                const typename = format(keyname);
                append(typename + " ");
                parent = typename;
                parseScope(scope[keys[i]], depth);
                append(' `json:"' + keyname);
                if (omitempty && omitempty[keys[i]] === true) {
                    append(',omitempty');
                }
                append('"`\n');

            }
            indent(--tabs);
            append("}");

        }
        if (flatten)
            accumulator += stack.pop();

    }

    function indent(tabs) {
        for (let i = 0;
             i < tabs;
             i++)
            go += '\t';

    }

    function append(str) {
        go += str;
    }

    function indenter(tabs) {
        for (let i = 0;
             i < tabs;
             i++)
            stack[stack.length - 1] += '\t';

    }

    function appender(str) {
        stack[stack.length - 1] += str;
    }

    function format(str) {
        if (!str)
            return "";
        else if (str.match(/^\d+$/))
            str = "Num" + str;
        else if (str.charAt(0).match(/\d/)) {
            const numbers = {
                '0': "Zero_",
                '1': "One_",
                '2': "Two_",
                '3': "Three_",
                '4': "Four_",
                '5': "Five_",
                '6': "Six_",
                '7': "Seven_",
                '8': "Eight_",
                '9': "Nine_"
            };
            str = numbers[str.charAt(0)] + str.substr(1);
        }
        return toProperCase(str).replace(/[^a-z0-9]/ig, "") || "NAMING_FAILED";

    }

    function goType(val) {
        if (val === null)
            return "interface{}";
        switch (typeof val) {
            case "string":
                if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(\+\d\d:\d\d|Z)/.test(val))
                    return "time.Time";
                else
                    return "string";
            case "number":
                if (val % 1 === 0) {
                    if (val > -2147483648 && val < 2147483647)
                        return "int";
                    else
                        return "int64";

                } else
                    return "float64";
            case "boolean":
                return "bool";
            case "object":
                if (Array.isArray(val))
                    return "slice";
                return "struct";
            default:
                return "interface{}";

        }
    }

    function mostSpecificPossibleGoType(typ1, typ2) {
        if (typ1.substr(0, 5) === "float" && typ2.substr(0, 3) === "int")
            return typ1;
        else if (typ1.substr(0, 3) === "int" && typ2.substr(0, 5) === "float")
            return typ2;
        else
            return "interface{}";

    }

    function toProperCase(str) {
        const commonInitialisms = ["ACL", "API", "ASCII", "CPU", "CSS", "DNS", "EOF", "GUID", "HTML", "HTTP", "HTTPS", "ID", "IP", "JSON", "LHS", "QPS", "RAM", "RHS", "RPC", "SLA", "SMTP", "SQL", "SSH", "TCP", "TLS", "TTL", "UDP", "UI", "UID", "UUID", "URI", "URL", "UTF8", "VM", "XML", "XMPP", "XSRF", "XSS"];
        return str.replace(/(^|[^a-zA-Z])([a-z]+)/g, function (unused, sep, frag) {
            if (commonInitialisms.indexOf(frag.toUpperCase()) >= 0)
                return sep + frag.toUpperCase();
            else
                return sep + frag[0].toUpperCase() + frag.substr(1).toLowerCase();

        }).replace(/([A-Z])([a-z]+)/g, function (unused, sep, frag) {
            if (commonInitialisms.indexOf(sep + frag.toUpperCase()) >= 0)
                return (sep + frag).toUpperCase();
            else
                return sep + frag;

        });

    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getOriginalName(unique) {
        const reLiteralUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        const uuidLength = 36;
        if (unique.length >= uuidLength) {
            const tail = unique.substr(-uuidLength);
            if (reLiteralUUID.test(tail)) {
                return unique.slice(0, -1 * (uuidLength + 1))
            }
        }
        return unique
    }

    function compareObjects(objectA, objectB) {
        const object = "[object Object]";
        return Object.prototype.toString.call(objectA) === object && Object.prototype.toString.call(objectB) === object;
    }

    function compareObjectKeys(itemAKeys, itemBKeys) {
        const lengthA = itemAKeys.length;
        const lengthB = itemBKeys.length;
        if (lengthA === 0 && lengthB === 0)
            return true;
        if (lengthA !== lengthB)
            return false;
        for (let item of itemAKeys) {
            if (!itemBKeys.includes(item))
                return false;

        }
        return true;

    }

    function formatScopeKeys(keys) {
        for (let i in keys) {
            keys[i] = format(keys[i]);
        }
        return keys
    }
}

function formatJSON(txt, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
    var indentChar = ' ';
    if (/^\s*$/.test(txt)) {
        alert('数据为空,无法格式化! ');
        return;
    }
    try {
        var data = eval('(' + txt + ')');
    } catch (e) {
        alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
        return;
    }
    ;
    var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

    var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
        nodeCount++;/*节点计数*/
        for (var i = 0, tab = ''; i < indent; i++) tab += indentChar;/* 缩进HTML */
        tab = compress ? '' : tab;/*压缩模式忽略缩进*/
        maxDepth = ++indent;/*缩进递增并记录*/
        if (value && value.constructor == Array) {/*处理数组*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);/*缩进'[' 然后换行*/
            for (var i = 0; i < value.length; i++)
                notify(i, value[i], i == value.length - 1, indent, false);
            draw.push(tab + ']' + (isLast ? line : (',' + line)));/*缩进']'换行,若非尾元素则添加逗号*/
        } else if (value && typeof value == 'object') {/*处理对象*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);/*缩进'{' 然后换行*/
            var len = 0, i = 0;
            for (var key in value) len++;
            for (var key in value) notify(key, value[key], ++i == len, indent, true);
            draw.push(tab + '}' + (isLast ? line : (',' + line)));/*缩进'}'换行,若非尾元素则添加逗号*/
        } else {
            if (typeof value == 'string') value = '"' + value + '"';
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
        }
        ;
    };
    var isLast = true, indent = 0;
    notify('', data, isLast, indent, false);
    return draw.join('');
}


new ClipboardJS('.button').on('success', function () {
    alert('复制成功')
}).on('error', function () {
    alert('复制失败,请手动复制')
});


function Init() {
    let input = document.getElementById('input');
    let output = document.getElementById('output');

    function formatXml(xml) {
        let formatted = '';
        let reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach(function (node) {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }
            let padding = '';
            for (let i = 0;
                 i < pad;
                 i++) {
                padding += '  ';
            }
            formatted += padding + node + '\r\n';
            pad += indent;

        });
        return formatted;

    }


    function toStruct(flat) {
        let json = input.innerText;
        if (json) {
            let res = json2go(json, null, flat);
            if (res.error) {
                alert(res.error)
            } else {
                output.innerHTML = hljs.highlight("go", res.go).value;
            }
            input.innerHTML = hljs.highlight("json", json).value;

        }
    }

    function toYaml() {
        let json = input.innerText;
        if (json) {
            try {
                let jsonObj = JSON.parse(json);
                output.innerHTML = hljs.highlight("yaml", jsyaml.dump(jsonObj)).value;
                input.innerHTML = hljs.highlight("json", json).value;
            } catch (e) {
                alert(e)
            }
        }
    }

    function toXml() {
        let json = input.innerText;
        if (json) {
            let jsonObj = JSON.parse(json);
            let xml = new parser.j2xParser().parse(jsonObj);
            output.innerHTML = hljs.highlight("xml", formatXml(xml)).value;
            input.innerHTML = hljs.highlight("json", json).value;
        }
    }

    function toCSV() {
        let json = input.innerText;
        if (json) {
            let jsonObj = JSON.parse(json);
            const csv = json2csv.parse(jsonObj);
            // let xml = new parser.j2xParser().parse(jsonObj);
            output.innerHTML = hljs.highlight("plaintext", csv).value;
            input.innerHTML = hljs.highlight("json", json).value;
        }

    }

    function toFormatJson(compress) {
        let json = input.innerText;
        if (json) {
            // let jsonObj = JSON.parse(json);
            // input.innerHTML = hljs.highlight("json", JSON.stringify(jsonObj, null, '    ')).value;
            input.innerHTML = hljs.highlight("json", formatJSON(json, compress)).value;
        }

    }

    function cleanup() {
        input.innerText = '';
        output.innerText = '';
    }

    document.getElementById('onpaste').addEventListener("paste", () => setTimeout(toStruct, 100));
    document.getElementById('toYaml').addEventListener('click', toYaml);
    document.getElementById('toCSV').addEventListener('click', toCSV);
    document.getElementById('toXml').addEventListener('click', toXml);
    document.getElementById('cleanup').addEventListener('click', cleanup);
    document.getElementById('toFormatJson').addEventListener('click', () => toFormatJson(false));
    document.getElementById('toFormatJson2').addEventListener('click', () => toFormatJson(true));
    document.getElementById('toStruct').addEventListener('click', () => toStruct());
    document.getElementById('toStruct2').addEventListener('click', () => toStruct(false));

}