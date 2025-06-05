(function(global){
global.urs={};

var configQueryString = {
    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&",
    "startWith": ""
};
var exemptListOfDomain = ['localhost'];
var objRegExpKey = {

    "alpha": '[a-zA-Z]',
    "any": '[a-zA-Z0-9\\-\\_.]',
    "number": '[0-9]',
    "string": '[a-zA-Z0-9]'
};

var zero = 0;
var one =1;
var two =2;
var three = 3;
var five = 5;
var six = 6;

//  * @param {string} url - URL to check

/**
 * Query String stringify
 *
 * @since 1.0.0
 * @category Collection
 * @param {any} value Passing object to convert string
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsStringify({"test": 11,"test2": 11})
 *=> test=1&test2=11
 */
function qsStringify (value, config) {

    if (_stk.indexOfNotExist([
        "json",
        "array"
    ], _stk.getTypeof(value))) {

        return "";

    }

    var referenceValue = [];
    var defaultConfig = _stk.varExtend(configQueryString, config);

    _stk.each(value, function (val, key) {

        parseStringConvert(key, val, _stk.getTypeof(val), defaultConfig, referenceValue);

    });

    return defaultConfig.startWith+referenceValue.join(defaultConfig.newLineSeparator);

}

/**
 * Parse query string to object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} key The index of array or object
 * @param {any} value The passing value from either array or object
 * @param {any} type The the type of argument
 * @param {any} config Options of function
 * @param {any} reference The value that you pass from outside
 * @returns {undefined} Returns null
 * @example
 *
 * parseStringConvert({"test": 11,"test2": 11}, {"test2": 11})
 * // => undefined
 */
var parseStringConvert=function (key, value, type, config, reference) {

    if (_stk.indexOf([
        "json",
        "array"
    ], type) >=zero) {

        _stk.each(value, function (vl, ky) {

            var keyVal = _stk.indexOf([
                "number",
                "array"
            ], type) >=zero
                ?config.arrayFormat
                :"["+ky+"]";

            var defineKey = keyVal;

            if ((/^\[(.*?)\]$/g).test(ky) && _stk.indexOfNotExist([
                "number",
                "array"
            ], type)) {

                defineKey = ky;

            }
            parseStringConvert(key+""+defineKey, vl, _stk.getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+value);

    }

};

/**
 * Query String encode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
function queryEncode (query) {

    var updateValue = query.replace(/\+/g, ' ');

    try {

        updateValue = encodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

}

/**
 * Query String decode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
function queryDecode (query) {

    var updateValue = query.replace(/\+/g, ' ');

    try {

        updateValue = decodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

}

/**
 * Query String object
 *
 * @since 1.0.0
 * @category Collection
 * @param {string} value Passing string to convert to object
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsParse("test=1&test2=11")
 *=> {"test": 11,"test2": 11}
 */
function qsParse (value, config) {

    if (_stk.indexOfNotExist(["string"], _stk.getTypeof(value))) {

        return {};

    }
    if (_stk.isEmpty(value)) {

        return {};

    }
    value = queryDecode(value);
    value = value.trim().replace(/^[?#&]/, '');
    var referenceValue = {};
    var defaultConfig = _stk.varExtend(configQueryString, config);
    var defaultSplit = value.split(defaultConfig.newLineSeparator);

    // https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    // Schema for data
    var reFlistKey = [];

    qsParseCallback(defaultConfig, defaultSplit, function (keyOnly, keyList, getValueOnly) {

        referenceValue = parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly, reFlistKey, true);

    });

    return referenceValue;

}

/**
 * Parsing JSON object into query string
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} defaultConfig config defalut value
 * @param {any} keyOnly Key in array
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @param {any} reFlistKey Value to replace
 * @param {any} isParent Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectSchema({"test": 11,"test2": 11}, {"test2": 11})
 * // => null
 */
var parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly, reFlistKey, isParent) {

    var keyRefArray = _stk.toArray(keyList);

    var keyFlatten = _stk.flatten([
        keyOnly,
        keyRefArray
    ]);
    var keyFlattenJoin = keyFlatten.join(".");

    if (_stk.has(referenceValue, keyOnly) ===false) {

        if (_stk.isEmpty(keyList)) {

            referenceValue[keyOnly] = getValueOnly;

        } else {

            referenceValue = _stk.setData(referenceValue, keyFlattenJoin, getValueOnly);

        }
        reFlistKey.push(keyOnly);

        return referenceValue;

    }

    if (_stk.indexOfExist(reFlistKey, keyOnly)) {

        if (_stk.indexOfExist([
            "string",
            "number",
            "boolean",
            "null"
        ], _stk.getTypeof(referenceValue[keyOnly]))) {

            var isrefExist = _stk.someValid(_stk.map(isParent
                ?[keyOnly]
                :[keyFlattenJoin], function (params) {

                return _stk.getData(referenceValue, params, true) !== null;

            }));

            if (_stk.isEmpty(keyList) === false) {

                if (isrefExist) {

                    referenceValue = _stk.setData(referenceValue, keyOnly, [
                        referenceValue[keyOnly],
                        _stk.setData({}, keyList.join("."), getValueOnly)
                    ]);

                } else {

                    referenceValue = _stk.setData(referenceValue, keyOnly, _stk.setData({}, keyList.join("."), getValueOnly));

                }

            } else {

                if (isrefExist) {

                    referenceValue = _stk.setData(referenceValue, keyOnly, [
                        referenceValue[keyOnly],
                        getValueOnly
                    ]);

                } else {

                    referenceValue = _stk.setData(referenceValue, keyOnly, getValueOnly);

                }

            }
            reFlistKey.push(keyFlattenJoin);

            return referenceValue;

        }
        if (_stk.getTypeof(referenceValue[keyOnly]) === "array") {

            // If the key is array, then we need to set the value
            var referenceData = referenceValue[keyOnly];

            if (_stk.isEmpty(keyList)) {

                referenceData.push(getValueOnly);

            } else {

                referenceData.push(_stk.setData({}, keyList.join("."), getValueOnly));

            }
            referenceValue = _stk.setData(referenceValue, keyOnly, referenceData);
            reFlistKey.push(keyFlattenJoin);

            return referenceValue;

        }

        var referenceData = referenceValue[keyOnly];

        referenceData = parseObjectSchema(referenceData, defaultConfig, _stk.first(keyList), _stk.toArray(_stk.remove(keyList, zero)), getValueOnly, keyList, false);

        referenceValue = _stk.setData(referenceValue, keyOnly, referenceData);

        reFlistKey.push(keyFlattenJoin);

        return referenceValue;

    }

    return referenceValue;

};

/**
 * Parsing JSON object callback
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} defaultConfig config defalut value
 * @param {any} defaultSplit Key in array
 * @param {any} callbacks array of keys in array argument
 * @returns {any} Returns the null.
 * @example
 *
 * qsParseCallback(defaultConfig, defaultSplit, callbacks)
 * // => true
 */
var qsParseCallback = function (defaultConfig, defaultSplit, callbacks) {

    _stk.each(defaultSplit, function (val) {

        var getKeyAndValue = val.split(defaultConfig.equalSeparator);
        var getKeyOnly = _stk.first(getKeyAndValue);
        var getValueOnly = _stk.arraySlice(getKeyAndValue, one).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > zero) {

            var keyOnly = "";
            var keyList = [];

            var keySubData = getKeyOnly.replace(/^([\w\-_\d]{1,})\[/g, function (whole, sub1) {

                keyOnly=sub1;

                return "[";

            });

            if (_stk.isEmpty(keyOnly)) {

                keyOnly=getKeyOnly;

            }

            keySubData.replace(/(\[[\s\w\-_\d]{0,}\])/g, function (whole, sub1) {

                keyList.push(sub1.replace(/[[\]]/g, ""));

            });

            callbacks(keyOnly, keyList, convertValueToItsType(getValueOnly));

        }

    });

};

/**
 * Convert value to its type
 *
 * @since 1.2.7
 * @category Seq
 * @param {any} value config defalut value
 * @returns {any} Returns the null.
 * @example
 *
 * qsParseCallback(defaultConfig, defaultSplit, callbacks)
 * // => true
 */
var convertValueToItsType = function (value) {

    if ((/^([0-9]{1,}[.]{1}[0-9]{1,})$/gmi).test(value)) {

        value = parseFloat(value);

    } else if ((/^([0-9]{1,})$/gmi).test(value)) {

        value = parseInt(value);

    } else if (value === "true") {

        value = true;

    } else if (value === "false") {

        value = false;

    } else if (value === "null") {

        value = null;

    }

    return value;

};

/**
 * Verify if format is valid
 * @category Seq
 * @since 1.2.1
 * @param {string} domain Passing the completet domain url
 * @param {string} protocol Passing the completet domain url
 * @param {string} port Passing the completet domain url
 * @param {string} subdomain Passing the completet domain url
 * @param {string} tld Passing the completet domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * removeSlash('/example')
 *=> example
 */
function ifValidHost (domain, protocol, port, subdomain, tld) {

    var data = {
        "domain": "",
        "port": "",
        "protocol": "",
        "subdomain": "",
        "tld": ""
    };

    if (!_stk.isEmpty(protocol) && !_stk.isEmpty(domain)) {

        data.domain= domain;
        data.protocol= protocol;
        data.port= port;
        data.subdomain= subdomain;
        data.tld= tld;

        return data;

    }

    if (!_stk.isEmpty(tld) && !_stk.isEmpty(domain)) {

        data.domain= domain;
        data.protocol= protocol;
        data.port= port;
        data.subdomain= subdomain;
        data.tld= tld;

        return data;

    }

    return data;

}

/**
 * Remove slash first and last
 * @category Seq
 * @since 1.2.1
 * @param {string} data Passing the completet domain url
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * removeSlash('/example')
 *=> example
 */
function removeSlash (data) {

    return data.replace(/^(\/)/g, "").replace(/(\/)$/g, "")
        .replace(/[/]{2,}/g, "/");

}

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.1.0
 * @class UrlComposerInit
 * @param {object} config Passing the completet domain url=
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * UrlComposerInit('https://example.com')
 *=> https://example.com
 */
function UrlComposerInit (config) {

    this.variableProtocol = config.protocol;
    this.variablePort = config.port;
    this.variablePath = config.pathname;
    this.variablePathPrefix = "";
    this.variableDomain = config.domainDetails.domain;
    this.variableDomainTld = config.domainDetails.tld;
    this.variableSubdomain = config.domainDetails.subdomain;
    this.variableQueryString = qsParse(config.search);
    this.variableHash = config.hash;

}

/**
 * Set HTTP protocol
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setProtocol('http')
 *  http://example.com
 */
UrlComposerInit.prototype.setProtocol = function (data) {

    this.variableProtocol = data;

};

/**
 * Set HTTP hash
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setHash('test')
 *  http://example.com#test
 */
UrlComposerInit.prototype.setHash = function (data) {

    this.variableHash = data;

};

/**
 * Set HTTP port
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setPort(8080)
 * http://example.com:8080#test
 */
UrlComposerInit.prototype.setPort = function (data) {

    this.variablePort = data;

};

/**
 * Set HTTP prefix path
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setPathPrefix('v1')
 * http://example.com:8080/v1#test
 */
UrlComposerInit.prototype.setPathPrefix = function (data) {

    this.variablePathPrefix = removeSlash(data);

};

/**
 * Set HTTP path
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setPath('id')
 * http://example.com:8080/v1/id#test
 */
UrlComposerInit.prototype.setPath = function (data) {

    this.variablePath = removeSlash(data);

};

/**
 * Set HTTP domain name
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the undefined.
 * @example
 *
 * setDomain('helloworld')
 * http://helloworld.com:8080/v1/id#test
 */
UrlComposerInit.prototype.setDomain = function (data) {

    this.variableDomain = data;

};

/**
 * Set HTTP TLD
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setDomainTld('xyz')
 * http://helloworld.xyz:8080/v1/id#test
 */
UrlComposerInit.prototype.setDomainTld = function (data) {

    this.variableDomainTld = data;

};

/**
 * Set HTTP subdomain
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setSubdomain('www')
 * http://www.helloworld.xyz:8080/v1/id#test
 */
UrlComposerInit.prototype.setSubdomain = function (data) {

    this.variableSubdomain = data;

};

/**
 * Set HTTP query string
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setQueryString('a=1')
 * http://www.helloworld.xyz:8080/v1/id?a=1#test
 */
UrlComposerInit.prototype.setQueryString = function (data) {

    if (_stk.getTypeof(data) === "string") {

        data = qsParse(data);

    } else if (!_stk.has(data)) {

        data = {};

    }
    this.variableQueryString = data;

};

/**
 * Get your url structure in string
 *
 * @since 1.1.0
 * @category environment
 * @returns {string} Return the boolean.
 * @example
 *
 * getToString()
 *=> 'www.example.com'
 */
UrlComposerInit.prototype.getToString = function () {

    var urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    var urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !><!- path !><!- queryString !><!- hash !>';
    var joinPath = [
        this.variablePathPrefix,
        this.variablePath
    ].join("/");

    return _stk.templateValue(urlFormat, {
        "domain": urlData.domain,
        "hash": _stk.isEmpty(this.variableHash)
            ? ''
            : '#'+this.variableHash,
        "path": _stk.isEmpty(joinPath)
            ? ''
            : '/'+removeSlash(joinPath),
        "port": _stk.isEmpty(urlData.port)
            ? ''
            : ':'+urlData.port,
        "protocol": _stk.isEmpty(urlData.protocol)
            ? ''
            : urlData.protocol+"://",
        "queryString": _stk.isEmpty(this.variableQueryString)
            ? ''
            : '?'+qsStringify(this.variableQueryString),
        "subdomain": _stk.isEmpty(urlData.subdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": _stk.isEmpty(urlData.tld)
            ? ''
            : '.'+urlData.tld
    });

};

/**
 * Get your domain only  in string
 *
 * @since 1.2.6
 * @category environment
 * @returns {string} Return the boolean.
 * @example
 *
 * getDomainString()
 *=> 'www.example.com'
 */
UrlComposerInit.prototype.getDomainString = function () {

    var urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    var urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !>';

    return _stk.templateValue(urlFormat, {
        "domain": urlData.domain,
        "port": _stk.isEmpty(urlData.port)
            ? ''
            : ':'+urlData.port,
        "protocol": _stk.isEmpty(urlData.protocol)
            ? ''
            : urlData.protocol+"://",
        "subdomain": _stk.isEmpty(urlData.subdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": _stk.isEmpty(urlData.tld)
            ? ''
            : '.'+urlData.tld
    });

};

/**
 * Verify if pattern and path are match
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {any} pattern Passing the completet domain url=
 * @param {any} path Passing the completet domain url=
 *
 * @returns {bool} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function validMatchPatternPath (pattern, path) {

    var matchPatternPath = path.match(pattern.patterns);

    if (_stk.has(matchPatternPath)) {

        var firstMatch = _stk.toString(_stk.first(matchPatternPath)).replace(/^\//g, "")
            .replace(/\/$/g, "");

        var pathClean = _stk.toString(path).replace(/^\//g, "")
            .replace(/\/$/g, "");

        return _stk.toString(firstMatch)===_stk.toString(pathClean);

    }

    return false;

}

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {any} pattern Passing the completet domain url=
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function basePattern (pattern) {

    var one = 1;
    var zero = 0;

    if (_stk.getTypeof(pattern) ==="json") {

        var patternRegexp = _stk.ifUndefined(pattern, "regexp", "--");
        var listArgument = _stk.ifUndefined(pattern, "arguments", []);

        if (patternRegexp ==="--") {

            throw new Error("`regexp` is missing in parameter");

        }

        if (_stk.getTypeof(new RegExp(patternRegexp)) !=="regexp") {

            throw new Error("`regexp` is must be regular expression format");

        }
        if (_stk.regexCountGroup(new RegExp(patternRegexp)) !== _stk.count(listArgument)) {

            throw new Error("Regular expression group must be equal to `arguments`");

        }

        return {
            "arguments": listArgument,
            "patterns": new RegExp(patternRegexp)
        };

    }

    if (_stk.getTypeof(pattern) ==="string") {

        var refRegVal = {};
        var updPattern = _stk.toString(pattern).replace(/([*]{1,})/g, "(.*?)");

        updPattern = _stk.toString(updPattern).replace(/([(]{0,1}[/]{0,1}:[a-zA-Z9-_<>]{1,}[)]{0,1})/g, function () {

    var ags=arguments;

            var replaceSlash = _stk.toString(_stk.first(ags)).replace(/^\//g, "");
            var replaceSlashClean = _stk.toString(replaceSlash).replace(/[:()/]{0,}/g, "")
                .replace(/<(.*?)>/g, "");
            var typeData = _stk.toString(replaceSlash).match(/<([a-zA-Z]{1,})>/i);

            var typeRef = "any";

            if (!_stk.isEmpty(typeData)) {

                typeRef = _stk.toString(typeData[one]);

            }

            if ((/^\(\/(.*?)\)$/g).test(replaceSlash)) {

                refRegVal[_stk.count(refRegVal)]= {
                    "name": replaceSlashClean,
                    "regexp": "(?:\\/"+_stk.ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{0,})"
                };

                return "(@"+_stk.last(_stk.toArray(_stk.getKey(refRegVal)))+"@)";

            }

            if ((/^\//g).test(_stk.first(ags))) {

                refRegVal[_stk.count(refRegVal)]= {
                    "name": replaceSlashClean,
                    "regexp": "/("+_stk.ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{1,})"
                };

                return "(@"+_stk.last(_stk.toArray(_stk.getKey(refRegVal)))+"@)";

            }

            refRegVal[_stk.count(refRegVal)]= {
                "name": replaceSlashClean,
                "regexp": "("+_stk.ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{1,})"
            };

            return "(@"+_stk.last(_stk.toArray(_stk.getKey(refRegVal)))+"@)";

        });

        var listArgument = [];

        updPattern = updPattern.replace(/\((.*?)\)/g, function () {

    var arg=arguments;

            var lengthArg = listArgument.length;

            var firstValue = _stk.first(arg);

            if ((/\(@[0-9]{1,}@\)/g).test(firstValue)) {

                listArgument.push({
                    "index": lengthArg,
                    "name": refRegVal[_stk.toInteger(firstValue)].name
                });

                return refRegVal[_stk.toInteger(firstValue)].regexp;

            }

            listArgument.push({
                "index": lengthArg,
                "name": "arg"+lengthArg
            });

            return firstValue;

        });

        return {
            "arguments": listArgument,
            "patterns": new RegExp(updPattern)
        };

    }

    if (_stk.getTypeof(pattern) ==="regexp") {

        var listArgument = _stk.map(_stk.range(_stk.regexCountGroup(pattern)-one, zero), function (value) {

            return {
                "index": value,
                "name": "arg"+value

            };

        });

        return {
            "arguments": listArgument,
            "patterns": pattern
        };

    }

    return null;

}

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {object} path Passing the completet domain url=
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function basePath (path) {

    return path;

}

/**
 * Details of your path
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {object} pattern Passing the completet domain url=
 * @param {object} path Passing the completet domain url=
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function PathPatternInit (pattern, path) {

    this.pattern = pattern;
    this.path = path;

}

/**
 * Check if pattern and path is match
 *
 * @since 1.2.1
 * @category environment
 * @returns {boolean} Return the boolean.
 * @example
 *
 * urlPattern(":id", "1").isValid()
 *=> true
 */
PathPatternInit.prototype.isValid = function () {

    var refPattern = basePattern(this.pattern);
    var refPath = basePath(this.path);

    return validMatchPatternPath(refPattern, refPath);

};

/**
 * Check if pattern and path is match
 *
 * @since 1.2.1
 * @category environment
 * @returns {any} Return the object.
 * @example
 *
 * urlPattern(":id", "1").getParam()
 *=> {"id": '1'}
 */
PathPatternInit.prototype.getParam = function () {

    var refParam = {};

    var refPattern = basePattern(this.pattern);
    var refPath = basePath(this.path);

    if (validMatchPatternPath(refPattern, refPath)) {

        var matchPatternPath = refPath.match(refPattern.patterns);

        _stk.each(refPattern.arguments, function (value) {

            refParam[value.name] = matchPatternPath[value.index + (_stk.count(matchPatternPath)-_stk.count(refPattern.arguments))];

        });

    }

    return refParam;

};

/**
 * Get if domain segmet details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect
 * @returns {any} Options of function
 * @example
 *
 * getDomain("example.com")
 * // =>  {
 *        "hash": "hashValue",
 *       "path": ""
 *       "search": "",
 *       "url": "example.com"
 *   }
 *
 */
var getDomain =function (domain) {

    var referenceDomain = domain.replace(/\b([\w\\+]{1,}:\/{2,})\b/g, "");

    var splitDomain = referenceDomain.split("/");
    var getDomainFirstSplit = _stk.first(splitDomain);
    var pathValueDetails = _stk.arraySlice(splitDomain, one).join("/");
    var referenceDomainNoProtocol = referenceDomain.replace(/^((https|http)?:\/\/)/, "");

    var validUrl = true;

    if ((/^(localhost|localhost:[0-9]{2,})$/g).test(referenceDomain)) {

        validUrl = false;
        pathValueDetails = referenceDomain.replace(/\b(localhost:[0-9]{2,}|localhost)/g, "");
        getDomainFirstSplit = referenceDomain.replace(pathValueDetails, "");

    }
    if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(referenceDomain) && validUrl) {

        validUrl = false;
        var getPath = referenceDomain.replace((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g, ""));

        if (_stk.ifUndefined(getPath) === false) {

            pathValueDetails = getPath;

        }

        getDomainFirstSplit = referenceDomain.replace(pathValueDetails, "");

    }

    var matchIPV6 = referenceDomain.match(/\[?([A-F0-9:]+)?\]/i);

    if (matchIPV6 && validUrl) {

        validUrl = false;
        getDomainFirstSplit = _stk.first(matchIPV6);
        pathValueDetails = referenceDomainNoProtocol.replace(getDomainFirstSplit, "");

        pathValueDetails = pathValueDetails.replace(/:([0-9]{2,})?\//g, function (wh, s1) {

            getDomainFirstSplit = getDomainFirstSplit+":"+s1;

            return "";

        });

    }
    if ((/^\[?([A-F0-9]{1,4}(:[A-F0-9]{1,4}){7}|([A-F0-9]{1,4}:){1,7}:|:((:[A-F0-9]{1,4}){1,7}|:)|([A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|([A-F0-9]{1,4}:){1,5}(:[A-F0-9]{1,4}){1,2}|([A-F0-9]{1,4}:){1,4}(:[A-F0-9]{1,4}){1,3}|([A-F0-9]{1,4}:){1,3}(:[A-F0-9]{1,4}){1,4}|([A-F0-9]{1,4}:){1,2}(:[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:((:[A-F0-9]{1,4}){1,6}))\]?$/i).test(getDomainFirstSplit) && validUrl) {

        validUrl = false;

    }

    if (_stk.indexOfNotExist(exemptListOfDomain, getDomainFirstSplit) && !(/(\.)/g).test(getDomainFirstSplit) && validUrl) {

        getDomainFirstSplit = '';
        pathValueDetails = splitDomain.join("/");

    }

    var pathValue = pathValueDetails;
    var hashValue = "";
    var queryValue = "";

    var pathSplitHash = pathValue.split("#");

    if (_stk.count(pathSplitHash) > one) {

        pathValue = _stk.first(pathSplitHash);
        hashValue = _stk.last(pathSplitHash);

    }

    var pathSplitQuery = pathValue.split("?");

    if (_stk.count(pathSplitQuery) > one) {

        pathValue = _stk.first(pathSplitQuery);
        queryValue = _stk.last(pathSplitQuery);

    }

    return {
        "hash": hashValue,
        "path": pathValue
            .replace(/^(\/)/, "")
            .replace(/(\/)$/, ""),
        "search": queryValue,
        "url": getDomainFirstSplit
    };

};

/**
 * Get Domain Details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @returns {any} Returns return object details of domain.
 * @example
 *
 * getDomainDetails("example.com")
 * // =>  domainDetails = {
 *      "domain": "example",
 *      "domainWithTld": "",
 *      "subdomain": "",
 *      "tld": "com"
 *  }
 */
var getDomainDetails=function (domain) {

    var domainDetails = {
        "domain": "",
        "domainWithTld": "",
        "subdomain": "",
        "tld": ""
    };

    if ((/^(localhost|localhost:[0-9]{2,})$/g).test(domain)) {

        domainDetails.domain = domain;

        return domainDetails;

    }

    if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(domain)) {

        domainDetails.domain = domain;

        return domainDetails;

    }

    var domainSplit = domain.split(".");
    var getTLD = _stk.last(domainSplit).split(":");

    if (_stk.count(domainSplit) === one) {

        if (_stk.count(getTLD) > one) {

            domainDetails = {
                "domain": _stk.arraySlice(getTLD, zero, _stk.count(getTLD)>=six
                    ?five
                    : _stk.count(getTLD)-one).join(":"),
                "domainWithTld": "",
                "subdomain": "",
                "tld": ""
            };

        } else {

            domainDetails = {
                "domain": _stk.first(getTLD),
                "domainWithTld": _stk.first(getTLD),
                "subdomain": "",
                "tld": ""
            };

        }

    }

    if (_stk.count(domainSplit) === two) {

        domainDetails = {
            "domain": _stk.first(domainSplit),
            "domainWithTld": _stk.first(domainSplit)+"."+_stk.last(domainSplit),
            "subdomain": "",
            "tld": _stk.first(getTLD)
        };

    }

    if (_stk.count(domainSplit) >= three) {

        var getDefaultDomain = _stk.arraySlice(domainSplit, one, _stk.count(domainSplit) - two).join(".");

        domainDetails = {
            "domain": getDefaultDomain,
            "domainWithTld": getDefaultDomain +"."+_stk.last(domainSplit),
            "subdomain": _stk.first(domainSplit),
            "tld": _stk.first(getTLD)
        };

    }

    return domainDetails;

};

/**
 * Check if domain is valid
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns boolean type if url is valid format.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
var isUrlValidFormatVerifier=function (domain, config) {

    var validConfig = _stk.varExtend({
        "allowIP4": true,
        "allowIP6": true,
        "allowLocalhost": true
    }, config);
    var httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    var validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    var validTLDlen = 63;

    if (httpRegExp.test(domain)) {

        var cleanUrl = getDomain(domain).url.replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");

        if ((/^(localhost|localhost:[0-9]{2,})$/g).test(cleanUrl) && validConfig.allowLocalhost) {

            return true;

        }
        if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(cleanUrl) && validConfig.allowIP4) {

            return true;

        }
        if ((/^\[?([A-F0-9]{1,4}(:[A-F0-9]{1,4}){7}|([A-F0-9]{1,4}:){1,7}:|:((:[A-F0-9]{1,4}){1,7}|:)|([A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|([A-F0-9]{1,4}:){1,5}(:[A-F0-9]{1,4}){1,2}|([A-F0-9]{1,4}:){1,4}(:[A-F0-9]{1,4}){1,3}|([A-F0-9]{1,4}:){1,3}(:[A-F0-9]{1,4}){1,4}|([A-F0-9]{1,4}:){1,2}(:[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:((:[A-F0-9]{1,4}){1,6}))\]?$/i).test(cleanUrl) && validConfig.allowIP6) {

            return true;

        }
        var cleanUrlSplit = cleanUrl.split(".");

        var filterEmpty = _stk.filter(cleanUrlSplit, function (valS) {

            return _stk.isEmpty(valS);

        });

        // Check if there is a empty in split url
        if (_stk.isEmpty(filterEmpty) === false) {

            return false;

        }

        if (_stk.count(cleanUrlSplit) >= two) {

            var tldName = _stk.last(cleanUrlSplit);
            var getTLD = _stk.count(_stk.first(tldName.split("/")).split(""));

            if ((/^[a-zA-Z]{0,}:?([0-9]{2,})$/g).test(tldName)) {

                var tldNameSplit = tldName.split(":");

                if (_stk.count(tldNameSplit) === two && (/^[a-zA-Z]{0,}$/g).test(_stk.first(tldNameSplit))) {

                    if (_stk.isEmpty(_stk.first(tldNameSplit))) {

                        return false;

                    }

                    return validDomainRegExp.test(_stk.first(cleanUrlSplit));

                }

                return false;

            }
            if (getTLD > one && getTLD <= validTLDlen) {

                if (_stk.count(cleanUrlSplit) === two) {

                    return validDomainRegExp.test(_stk.first(cleanUrlSplit));

                }

                if (_stk.count(cleanUrlSplit) >= three) {

                    var getDomainSplit = getDomainDetails(cleanUrl);

                    var regSubDomain =(/^([\w\d-.]{1,})$/g).test(getDomainSplit.subdomain);
                    var regDomain = (/^([\w\d-]{1,})$/g).test(getDomainSplit.domain);

                    return regSubDomain && regDomain;

                }

            }

        }

    }

    return false;

};

/**
 * Get domain details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect
 * @returns {any} Returns return object details of domain.
 * @example
 *
 * urlDetails("example.com")
 * // =>  dataReference = {
 *      "hash": "",
 *      "hostname": "",
 *      "hostnamePort": "",
 *      "pathname": "",
 *       "port": "",
 *      "protocol": "",
 *      "search": ""
 *  }
 *
 */
var urlDetails=function (domain) {

    var dataReference = {
        "hash": "",
        "hostname": "",
        "hostnamePort": "",
        "password": "",
        "pathname": "",
        "port": "",
        "protocol": "",
        "search": "",
        "user": ""
    };

    domain.replace(/([\w\\+]{1,}):\/\//g, function (wh, s1) {

        dataReference.protocol = s1;

        return "";

    });

    var hostname = getDomain(domain);

    var splitPort = hostname.url.split(":");

    dataReference.hostnamePort = hostname.url;
    dataReference.search = hostname.search;
    dataReference.hash = hostname.hash;
    dataReference.pathname = hostname.path;
    dataReference.hostname = _stk.first(splitPort);
    dataReference.port = _stk.count(splitPort) > one
        ? _stk.last(splitPort)
        : "";

    if ((/^([\d]{1,})$/g).test(dataReference.port) === false) {

        dataReference.port ="";

    }

    if (_stk.isEmpty(dataReference.port)) {

        dataReference.hostname = hostname.url;

    } else {

        dataReference.hostname = _stk.arraySlice(splitPort, zero, _stk.count(splitPort) - two).join(":");

    }
    var splitUsernameDomain = dataReference.hostname.split("@");

    if (_stk.count(splitUsernameDomain) === two) {

        dataReference.user = _stk.first(splitUsernameDomain);
        dataReference.hostname = _stk.last(splitUsernameDomain);

        var usernameAndPassword = dataReference.user.split(":");

        if (_stk.count(usernameAndPassword) === two) {

            dataReference.user = _stk.first(usernameAndPassword);
            dataReference.password = _stk.last(usernameAndPassword);

        }

    }

    return dataReference;

};

/**
 * To normalize the format of the URL
 *
 * @since 1.2.6
 * @category string
 * @param {string} pattern Passing the completet domain url
 * @param {any=} ext Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrlInit('helloworld')
 *=> helloworld
 */
function formatUrlInit (pattern, ext) {

    var one =1;
    var strPattern = pattern.replace(/\/$/g, "");

    if (ext.stripHash) {

        var rawStr = strPattern.split("#");

        strPattern = _stk.first(rawStr);

    }
    var refQueryParam = "";
    var rawStrParamPattern = strPattern.split("?");

    if (rawStrParamPattern.length > one) {

        strPattern = _stk.first(rawStrParamPattern);
        refQueryParam = _stk.last(rawStrParamPattern);

    }
    if (ext && ext.stripQuery) {

        strPattern = _stk.first(rawStrParamPattern);

    }
    if (ext && ext.stripProtocol) {

        var rawStr = strPattern.split("://");

        strPattern = _stk.first(rawStr);

    }
    if (ext && ext.stripWww) {

        strPattern = strPattern.replace(/^www\./, "");

    }

    if (ext.slash) {

        strPattern += "/";

    }

    if (ext && ext.stripQuery === false && !_stk.isEmpty(refQueryParam)) {

        strPattern = strPattern+"?" + refQueryParam;

    }

    return strPattern;

}

var charMap = {
    "$": "dollar",
    "%": "percent",
    "&": "and",
    "<": "less",
    ">": "greater",
    "|": "or",
    "¢": "cent",
    "£": "pound",
    "¤": "currency",
    "¥": "yen",
    "©": "copyright",
    "ª": "a",
    "®": "register trademark",
    "º": "o",
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "Æ": "AE",
    "Ç": "C",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "Ð": "D",
    "Ñ": "N",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "Ý": "Y",
    "Þ": "TH",
    "ß": "ss",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "æ": "ae",
    "ç": "c",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "ð": "d",
    "ñ": "n",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "ý": "y",
    "þ": "th",
    "ÿ": "y",
    "Ā": "A",
    "ā": "a",
    "Ă": "A",
    "ă": "a",
    "Ą": "A",
    "ą": "a",
    "Ć": "C",
    "ć": "c",
    "Č": "C",
    "č": "c",
    "Ď": "D",
    "ď": "d",
    "Đ": "DJ",
    "đ": "dj",
    "Ē": "E",
    "ē": "e",
    "Ė": "E",
    "ė": "e",
    "Ę": "e",
    "ę": "e",
    "Ě": "E",
    "ě": "e",
    "Ğ": "G",
    "ğ": "g",
    "Ģ": "G",
    "ģ": "g",
    "Ĩ": "I",
    "ĩ": "i",
    "Ī": "i",
    "ī": "i",
    "Į": "I",
    "į": "i",
    "İ": "I",
    "ı": "i",
    "Ķ": "k",
    "ķ": "k",
    "Ļ": "L",
    "ļ": "l",
    "Ľ": "L",
    "ľ": "l",
    "Ł": "L",
    "ł": "l",
    "Ń": "N",
    "ń": "n",
    "Ņ": "N",
    "ņ": "n",
    "Ň": "N",
    "ň": "n",
    "Ō": "O",
    "ō": "o",
    "Ő": "O",
    "ő": "o",
    "Œ": "OE",
    "œ": "oe",
    "Ŕ": "R",
    "ŕ": "r",
    "Ř": "R",
    "ř": "r",
    "Ś": "S",
    "ś": "s",
    "Ş": "S",
    "ş": "s",
    "Š": "S",
    "š": "s",
    "Ţ": "T",
    "ţ": "t",
    "Ť": "T",
    "ť": "t",
    "Ũ": "U",
    "ũ": "u",
    "Ū": "u",
    "ū": "u",
    "Ů": "U",
    "ů": "u",
    "Ű": "U",
    "ű": "u",
    "Ų": "U",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "ź": "z",
    "Ż": "Z",
    "ż": "z",
    "Ž": "Z",
    "ž": "z",
    "Ə": "E",
    "ƒ": "f",
    "Ơ": "O",
    "ơ": "o",
    "Ư": "U",
    "ư": "u",
    "ǈ": "LJ",
    "ǉ": "lj",
    "ǋ": "NJ",
    "ǌ": "nj",
    "Ș": "S",
    "ș": "s",
    "Ț": "T",
    "ț": "t",
    "ə": "e",
    "˚": "o",
    "Ά": "A",
    "Έ": "E",
    "Ή": "H",
    "Ί": "I",
    "Ό": "O",
    "Ύ": "Y",
    "Ώ": "W",
    "ΐ": "i",
    "Α": "A",
    "Β": "B",
    "Γ": "G",
    "Δ": "D",
    "Ε": "E",
    "Ζ": "Z",
    "Η": "H",
    "Θ": "8",
    "Ι": "I",
    "Κ": "K",
    "Λ": "L",
    "Μ": "M",
    "Ν": "N",
    "Ξ": "3",
    "Ο": "O",
    "Π": "P",
    "Ρ": "R",
    "Σ": "S",
    "Τ": "T",
    "Υ": "Y",
    "Φ": "F",
    "Χ": "X",
    "Ψ": "PS",
    "Ω": "W",
    "Ϊ": "I",
    "Ϋ": "Y",
    "ά": "a",
    "έ": "e",
    "ή": "h",
    "ί": "i",
    "ΰ": "y",
    "α": "a",
    "β": "b",
    "γ": "g",
    "δ": "d",
    "ε": "e",
    "ζ": "z",
    "η": "h",
    "θ": "8",
    "ι": "i",
    "κ": "k",
    "λ": "l",
    "μ": "m",
    "ν": "n",
    "ξ": "3",
    "ο": "o",
    "π": "p",
    "ρ": "r",
    "ς": "s",
    "σ": "s",
    "τ": "t",
    "υ": "y",
    "φ": "f",
    "χ": "x",
    "ψ": "ps",
    "ω": "w",
    "ϊ": "i",
    "ϋ": "y",
    "ό": "o",
    "ύ": "y",
    "ώ": "w",
    "Ё": "Yo",
    "Ђ": "DJ",
    "Є": "Ye",
    "І": "I",
    "Ї": "Yi",
    "Ј": "J",
    "Љ": "LJ",
    "Њ": "NJ",
    "Ћ": "C",
    "Џ": "DZ",
    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "G",
    "Д": "D",
    "Е": "E",
    "Ж": "Zh",
    "З": "Z",
    "И": "I",
    "Й": "J",
    "К": "K",
    "Л": "L",
    "М": "M",
    "Н": "N",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "У": "U",
    "Ф": "F",
    "Х": "H",
    "Ц": "C",
    "Ч": "Ch",
    "Ш": "Sh",
    "Щ": "Sh",
    "Ъ": "U",
    "Ы": "Y",
    "Ь": "",
    "Э": "E",
    "Ю": "Yu",
    "Я": "Ya",
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "е": "e",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "й": "j",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sh",
    "ъ": "u",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
    "ё": "yo",
    "ђ": "dj",
    "є": "ye",
    "і": "i",
    "ї": "yi",
    "ј": "j",
    "љ": "lj",
    "њ": "nj",
    "ћ": "c",
    "ѝ": "u",
    "џ": "dz",
    "Ґ": "G",
    "ґ": "g",
    "Ғ": "GH",
    "ғ": "gh",
    "Қ": "KH",
    "қ": "kh",
    "Ң": "NG",
    "ң": "ng",
    "Ү": "UE",
    "ү": "ue",
    "Ұ": "U",
    "ұ": "u",
    "Һ": "H",
    "һ": "h",
    "Ә": "AE",
    "ә": "ae",
    "Ө": "OE",
    "ө": "oe",
    "Ա": "A",
    "Բ": "B",
    "Գ": "G",
    "Դ": "D",
    "Ե": "E",
    "Զ": "Z",
    "Է": "E'",
    "Ը": "Y'",
    "Թ": "T'",
    "Ժ": "JH",
    "Ի": "I",
    "Լ": "L",
    "Խ": "X",
    "Ծ": "C'",
    "Կ": "K",
    "Հ": "H",
    "Ձ": "D'",
    "Ղ": "GH",
    "Ճ": "TW",
    "Մ": "M",
    "Յ": "Y",
    "Ն": "N",
    "Շ": "SH",
    "Չ": "CH",
    "Պ": "P",
    "Ջ": "J",
    "Ռ": "R'",
    "Ս": "S",
    "Վ": "V",
    "Տ": "T",
    "Ր": "R",
    "Ց": "C",
    "Փ": "P'",
    "Ք": "Q'",
    "Օ": "O''",
    "Ֆ": "F",
    "և": "EV",
    "ء": "a",
    "آ": "aa",
    "أ": "a",
    "ؤ": "u",
    "إ": "i",
    "ئ": "e",
    "ا": "a",
    "ب": "b",
    "ة": "h",
    "ت": "t",
    "ث": "th",
    "ج": "j",
    "ح": "h",
    "خ": "kh",
    "د": "d",
    "ذ": "th",
    "ر": "r",
    "ز": "z",
    "س": "s",
    "ش": "sh",
    "ص": "s",
    "ض": "dh",
    "ط": "t",
    "ظ": "z",
    "ع": "a",
    "غ": "gh",
    "ف": "f",
    "ق": "q",
    "ك": "k",
    "ل": "l",
    "م": "m",
    "ن": "n",
    "ه": "h",
    "و": "w",
    "ى": "a",
    "ي": "y",
    "ً": "an",
    "ٌ": "on",
    "ٍ": "en",
    "َ": "a",
    "ُ": "u",
    "ِ": "e",
    "ْ": "",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    "پ": "p",
    "چ": "ch",
    "ژ": "zh",
    "ک": "k",
    "گ": "g",
    "ی": "y",
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "฿": "baht",
    "ა": "a",
    "ბ": "b",
    "გ": "g",
    "დ": "d",
    "ე": "e",
    "ვ": "v",
    "ზ": "z",
    "თ": "t",
    "ი": "i",
    "კ": "k",
    "ლ": "l",
    "მ": "m",
    "ნ": "n",
    "ო": "o",
    "პ": "p",
    "ჟ": "zh",
    "რ": "r",
    "ს": "s",
    "ტ": "t",
    "უ": "u",
    "ფ": "f",
    "ქ": "k",
    "ღ": "gh",
    "ყ": "q",
    "შ": "sh",
    "ჩ": "ch",
    "ც": "ts",
    "ძ": "dz",
    "წ": "ts",
    "ჭ": "ch",
    "ხ": "kh",
    "ჯ": "j",
    "ჰ": "h",
    "Ṣ": "S",
    "ṣ": "s",
    "Ẁ": "W",
    "ẁ": "w",
    "Ẃ": "W",
    "ẃ": "w",
    "Ẅ": "W",
    "ẅ": "w",
    "ẞ": "SS",
    "Ạ": "A",
    "ạ": "a",
    "Ả": "A",
    "ả": "a",
    "Ấ": "A",
    "ấ": "a",
    "Ầ": "A",
    "ầ": "a",
    "Ẩ": "A",
    "ẩ": "a",
    "Ẫ": "A",
    "ẫ": "a",
    "Ậ": "A",
    "ậ": "a",
    "Ắ": "A",
    "ắ": "a",
    "Ằ": "A",
    "ằ": "a",
    "Ẳ": "A",
    "ẳ": "a",
    "Ẵ": "A",
    "ẵ": "a",
    "Ặ": "A",
    "ặ": "a",
    "Ẹ": "E",
    "ẹ": "e",
    "Ẻ": "E",
    "ẻ": "e",
    "Ẽ": "E",
    "ẽ": "e",
    "Ế": "E",
    "ế": "e",
    "Ề": "E",
    "ề": "e",
    "Ể": "E",
    "ể": "e",
    "Ễ": "E",
    "ễ": "e",
    "Ệ": "E",
    "ệ": "e",
    "Ỉ": "I",
    "ỉ": "i",
    "Ị": "I",
    "ị": "i",
    "Ọ": "O",
    "ọ": "o",
    "Ỏ": "O",
    "ỏ": "o",
    "Ố": "O",
    "ố": "o",
    "Ồ": "O",
    "ồ": "o",
    "Ổ": "O",
    "ổ": "o",
    "Ỗ": "O",
    "ỗ": "o",
    "Ộ": "O",
    "ộ": "o",
    "Ớ": "O",
    "ớ": "o",
    "Ờ": "O",
    "ờ": "o",
    "Ở": "O",
    "ở": "o",
    "Ỡ": "O",
    "ỡ": "o",
    "Ợ": "O",
    "ợ": "o",
    "Ụ": "U",
    "ụ": "u",
    "Ủ": "U",
    "ủ": "u",
    "Ứ": "U",
    "ứ": "u",
    "Ừ": "U",
    "ừ": "u",
    "Ử": "U",
    "ử": "u",
    "Ữ": "U",
    "ữ": "u",
    "Ự": "U",
    "ự": "u",
    "Ỳ": "Y",
    "ỳ": "y",
    "Ỵ": "Y",
    "ỵ": "y",
    "Ỷ": "Y",
    "ỷ": "y",
    "Ỹ": "Y",
    "ỹ": "y",
    "–": "-",
    "‘": "'",
    "’": "'",
    "“": "\\\"",
    "”": "\\\"",
    "„": "\\\"",
    "†": "+",
    "•": "*",
    "…": "...",
    "₠": "ecu",
    "₢": "cruzeiro",
    "₣": "french franc",
    "₤": "lira",
    "₥": "mill",
    "₦": "naira",
    "₧": "peseta",
    "₨": "rupee",
    "₩": "won",
    "₪": "new shequel",
    "₫": "dong",
    "€": "euro",
    "₭": "kip",
    "₮": "tugrik",
    "₯": "drachma",
    "₰": "penny",
    "₱": "peso",
    "₲": "guarani",
    "₳": "austral",
    "₴": "hryvnia",
    "₵": "cedi",
    "₸": "kazakhstani tenge",
    "₹": "indian rupee",
    "₺": "turkish lira",
    "₽": "russian ruble",
    "₿": "bitcoin",
    "℠": "sm",
    "™": "tm",
    "∂": "d",
    "∆": "delta",
    "∑": "sum",
    "∞": "infinity",
    "♥": "love",
    "元": "yuan",
    "円": "yen",
    "﷼": "rial",
    "ﻵ": "laa",
    "ﻷ": "laa",
    "ﻹ": "lai",
    "ﻻ": "la"
};

/**
 * In url or path, you now verified the format of your url
 *
 * @since 1.2.1
 * @category Seq
 * @param {string|object} pattern Path format you can use to control like `/:id<number>`
 * @param {string} path Passing url path like `/12`
 * @returns {any} Return the boolean.
 * @example
 *
 * data = urlPattern('/','/');
 * data.isValid()
 *=> true
 */
function urlPattern (pattern, path) {

    return new PathPatternInit(pattern, path);

}

/**
 * Compose your url structure in string
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Passing the complete domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * data = urlComposer('https://example.com');
 * data.getToString()
 *=> 'https://example.com'
 */
function urlComposer (domain) {

    return new UrlComposerInit(getHostDetails(domain));

}

/**
 * Check url is valid format
 *
 * @since 1.1.0
 * @category Boolean
 * @param {string} domain Passing the complete domain url
 * @param {object=} config Option you want to set in this function
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlValidFormat('https://example.com')
 *=> true
 */
function isUrlValidFormat (domain, config) {

    return isUrlValidFormatVerifier(domain, config);

}

/**
 * To join the domain and path
 *
 * @since 1.0.0
 * @category String
 * @param {...any} ags The Domain url
 * @returns {string} Return the string for join url or path.
 * @example
 *
 * joinUrlPath('https://example.com','test')
 *=> https://example.com/test
 */
function joinUrlPath () {

    var ags=arguments;

    var replaceDomain = _stk.first(ags).replace(/(\/)$/, "");
    var replacePath = _stk.arraySlice(ags, one);
    var cleanReplacePath = _stk.reduce([], replacePath, function (grand, value) {

        grand.push(value.replace(/^(\/)/, "").replace(/(\/)$/, ""));

        return grand;

    });

    return [
        replaceDomain,
        cleanReplacePath.join("/")
    ].join("/");

}

/**
 * Check url has valid https/http protocol
 *
 * @since 1.0.0
 * @category Boolean
 * @param {string} host Passing the complete domain url
 * @param {object=} config Option you want to set in this function
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isHttpProtocolValid('https://example.com')
 *=> true
 */
function isHttpProtocolValid (host, config) {

    return (/^(https|http):\/\//g).test(host) && isUrlValidFormat(host, config);

}

/**
 * Check url has valid ws/wss websocket protocol
 *
 * @since 1.1.0
 * @category Boolean
 * @param {string} host Passing the complete domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isWebSocketProtocolValid('wss://example.com')
 *=> true
 */
function isWebSocketProtocolValid (host) {

    return (/^(wss|ws):\/\//g).test(host);

}

/**
 * Check if url is valid https
 *
 * @since 1.0.0
 * @category Boolean
 * @param {string} host Passing the complete domain url
 * @param {object=} config Option you want to set in this function
 * @returns {boolean} Return the boolean if the format is valid.
 * @example
 *
 * isHttps('https://example.com')
 *=> true
 */
function isHttps (host, config) {

    return (/^(https):\/\/\b/g).test(host) && isUrlValidFormat(host, config);

}

/**
 * Check the domain details and verify it library is access via browser or nodejs
 *
 * @since 1.1.0
 * @category Collection
 * @param {string} host Passing the complete domain url
 * @returns {any} Returns the object details.
 * @example
 *
 * getHostDetails('https://example.com')
 *  => {
 *            "domainDetails": {
 *                "domain": "example",
 *                "domainWithTld": "example.com",
 *               "subdomain": "www",
 *                 "tld": "com"
 *            },
 *            "hash": "",
 *            "hostname": 'www.example.com',
 *            "href": 'https://www.example.com',
 *            "password": "",
 *            "pathname": "",
 *            "port": "",
 *            "protocol": "https",
 *            "search": '',
 *            "user": ''
 *         }
 */
function getHostDetails (host) {

    var dataReference = {
        "domainDetails": {},
        "hostname": "",
        "href": host,
        "password": "",
        "pathname": "",
        "port": "",
        "protocol": "",
        "search": "",
        "user": ""
    };

    if (_stk.isEmpty(host) === false) {

        var details = urlDetails(host);

        dataReference.protocol = details.protocol;
        dataReference.hostname = details.hostname;
        dataReference.pathname = details.pathname;
        dataReference.user = details.user;
        dataReference.password = details.password;

        dataReference.search = details.search;
        dataReference.hash = details.hash;

        dataReference.domainDetails = getDomainDetails(details.hostnamePort);
        dataReference.port = details.port;

    }

    return dataReference;

}

/**
 * Check if url extenstion,is valid
 *
 * @since 1.0.2
 * @category Boolean
 * @param {string} host Passing the completet domain url
 * @param {string} ext Option you want to set in this function
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlExtIsValid('https://example.com/example.js','js')
 *=> true
 */
function isUrlExtValid (host, ext) {

    var regularExpression = new RegExp("(."+ext+")[?#/]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&\\#]{0,}$", "g");

    return isHttpProtocolValid(host) &&regularExpression.test(host);

}

/**
 * Create url slug from words
 *
 * @since 1.2.6
 * @category string
 * @param {string} pattern Passing the complete domain url
 * @param {any=} ext Option you want to set in this function
 * @returns {string} Return the string.
 * @example
 *
 * slugify('hello world')
 *=> hello-world
 */
function slugify (pattern, ext) {

    var strPattern = pattern;

    var varExt = _stk.varExtend({
        "delimiter": "-",
        "dictStrictMap": {},
        "isStripDomanName": true,
        "lower": true,
        "remove": null,
        "replaceStrictMap": true,
        "strict": true
    }, ext);

    strPattern = strPattern.replace(/[\s]{2,}/g, " ");
    strPattern = strPattern.replace(/[-_]{1,}/g, " ");

    if (varExt.replaceStrictMap) {

        var refCharMap = _stk.mergeWithKey(charMap, varExt.dictStrictMap);

        strPattern = _stk.reduce("", strPattern.normalize().split(""), function (sums, value) {

            sums+= _stk.has(refCharMap, value)
                ?refCharMap[value]
                :value;

            return sums;

        });

    }

    strPattern = strPattern.replace(/[\n\t\r]/g, " ");
    strPattern = _stk.trim(strPattern);
    strPattern = strPattern.replace(/([\s])/g, varExt.delimiter);

    if (varExt.lower) {

        strPattern = _stk.stringLowerCase(strPattern);

    }
    if (varExt.isStripDomanName) {

        if (isUrlValidFormat(strPattern)) {

            var details = getHostDetails(strPattern);

            strPattern = details.pathname;

        }

    }
    if (varExt.strict) {

        strPattern = strPattern.replace(new RegExp("[^\\w\\d\\s"+varExt.delimiter+"]", "g"), "");

    }

    strPattern = strPattern.replace(varExt.remove || /[!@#$%^&*()'":]+/g, "");

    return strPattern;

}

/**
 * To normalize the format of the URL
 *
 * @since 1.2.6
 * @category string
 * @param {string} pattern Passing the completet domain url
 * @param {any=} ext Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
function formatUrl (pattern, ext) {

    var varExt = _stk.varExtend({
        "slash": true,
        "stripHash": false,
        "stripProtocol": false,
        "stripQuery": false,
        "stripWww": false
    }, ext);

    if ((/\s/g).test(pattern)) {

        throw new Error('The Url must remove the space');

    }
    if ((/[^\w\d\-_#@?/:.=%[\]+&]/g).test(pattern)) {

        throw new Error('The Url must remove special charaster');

    }

    return formatUrlInit(pattern, varExt);

}

urs.getHostDetails=getHostDetails;
urs.formatUrl=formatUrl;
urs.qsStringify=qsStringify;
urs.qsParse=qsParse;
urs.isHttps=isHttps;
urs.isHttpProtocolValid=isHttpProtocolValid;
urs.joinUrlPath=joinUrlPath;
urs.isUrlExtValid=isUrlExtValid;
urs.isWebSocketProtocolValid=isWebSocketProtocolValid;
urs.isUrlValidFormat=isUrlValidFormat;
urs.urlComposer=urlComposer;
urs.urlPattern=urlPattern;
urs.slugify=slugify;
urs.queryEncode=queryEncode;
urs.queryDecode=queryDecode;


 })(typeof window !== "undefined" ? window : this);