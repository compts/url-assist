(function(global){
global.urs={};

var configQueryString = {
    "allowQuote": true,
    "allowUnQuote": true,
    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&",
    "plusToSpace": false,
    "safeQuote": null,
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
var sixteen = 16;

//  * @param {string} url - URL to check

/**
 * EncodeURIComponent method with special characters encoded
 *
 * @since 1.2.72
 * @category Function
 * @param {string} data String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function coreEncodeURI (data) {

    return encodeURIComponent(_stk.toString(data)).replace(/[!'()*"]/g, (ch) => '%' + ch.charCodeAt(zero).toString(sixteen)
        .toUpperCase());

}

/**
 * DecodeURIComponent method with special characters decoded
 *
 * @since 1.2.72
 * @category Function
 * @param {string} data String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function coreDecodeURI (data) {

    return _stk.toString(data).replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {

        try {

            return decodeURIComponent(match);

        } catch {

            return match;

        }

    });

}

/**
 * Url qoute for safe url or domain
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the quoted uri.
 * @example
 *
 * qoute("?see=asda asd asd ()")
 * // =>  %3Fsee%3Dasda%20asd%20asd%20()
 *
 */
function qoute (data, config) {

    var defineConfig = _stk.varExtend({"safe": null}, config);

    data = coreEncodeURI(data);

    if (defineConfig.safe !== null) {

        data = _stk.reduce(function (total, value) {

            var encodedChar = coreEncodeURI(value);

            total = total.replaceAll(encodedChar, value);

            return total;

        }, data, defineConfig.safe.split(""));

    }

    return data;

}

/**
 * Unquote a quoted uri
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the unquoted uri.
 * @example
 *
 * unQoute("%3Fsee%3Dasda%20asd%20asd%20%28%29")
 * // =>  ?see=asda asd asd ()
 *
 */
function unQoute (data, config) {

    var defineConfig = _stk.varExtend({"plusToSpace": false}, config);

    if (defineConfig.plusToSpace) {

        data= data.replace(/\+/g, ' ');

    }
    data = coreDecodeURI(data);

    return data;

}

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

    if (_stk.indexOfNotExist(_stk.getTypeof(value), [
        "json",
        "array"
    ])) {

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

    if (_stk.indexOf(type, [
        "json",
        "array"
    ]) >=zero) {

        _stk.each(value, function (vl, ky) {

            var keyVal = _stk.indexOf(type, [
                "number",
                "array"
            ]) >=zero
                ?config.arrayFormat
                :"["+ky+"]";

            var defineKey = keyVal;

            if ((/^\[(.*?)\]$/g).test(ky) && _stk.indexOfNotExist(type, [
                "number",
                "array"
            ])) {

                defineKey = ky;

            }
            parseStringConvert(key+""+defineKey, vl, _stk.getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+(config.allowQuote
            ? qoute(value, {"safe": config.safeQuote})
            : value));

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

    if (_stk.indexOfNotExist(_stk.getTypeof(value), ["string"])) {

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

            referenceValue = _stk.setData(keyFlattenJoin, referenceValue, getValueOnly);

        }
        reFlistKey.push(keyOnly);

        return referenceValue;

    }

    if (_stk.indexOfExist(keyOnly, reFlistKey)) {

        if (_stk.indexOfExist(_stk.getTypeof(referenceValue[keyOnly]), [
            "string",
            "number",
            "boolean",
            "null"
        ])) {

            var isrefExist = _stk.someValid(_stk.map(function (params) {

                return _stk.getData(params, referenceValue, true) !== null;

            }, isParent
                ?[keyOnly]
                :[keyFlattenJoin]));

            if (_stk.isEmpty(keyList) === false) {

                if (isrefExist) {

                    referenceValue = _stk.setData(keyOnly, referenceValue, [
                        referenceValue[keyOnly],
                        _stk.setData(keyList.join("."), {}, getValueOnly)
                    ]);

                } else {

                    referenceValue = _stk.setData(keyOnly, referenceValue, _stk.setData(keyList.join("."), {}, getValueOnly));

                }

            } else {

                if (isrefExist) {

                    referenceValue = _stk.setData(keyOnly, referenceValue, [
                        referenceValue[keyOnly],
                        getValueOnly
                    ]);

                } else {

                    referenceValue = _stk.setData(keyOnly, referenceValue, getValueOnly);

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

                referenceData.push(_stk.setData(keyList.join("."), {}, getValueOnly));

            }
            referenceValue = _stk.setData(keyOnly, referenceValue, referenceData);
            reFlistKey.push(keyFlattenJoin);

            return referenceValue;

        }

        var referenceData = referenceValue[keyOnly];

        referenceData = parseObjectSchema(referenceData, defaultConfig, _stk.first(keyList), _stk.toArray(_stk.remove(keyList, zero)), getValueOnly, keyList, false);

        referenceValue = _stk.setData(keyOnly, referenceValue, referenceData);

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

            callbacks(keyOnly, keyList, convertValueToItsType(getValueOnly, defaultConfig));

        }

    });

};

/**
 * Convert value to its type
 *
 * @since 1.2.7
 * @category Seq
 * @param {any} value config defalut value
 * @param {any} defaultConfig config defalut value
 * @returns {any} Returns the null.
 * @example
 *
 * qsParseCallback(defaultConfig, defaultSplit, callbacks)
 * // => true
 */
var convertValueToItsType = function (value, defaultConfig) {

    var hasValidType = false;

    if ((/^([0-9]{1,}[.]{1}[0-9]{1,})$/gmi).test(value)) {

        value = parseFloat(value);
        hasValidType = true;

    } else if ((/^([0-9]{1,})$/gmi).test(value)) {

        value = parseInt(value);
        hasValidType = true;

    } else if (value === "true") {

        value = true;
        hasValidType = true;

    } else if (value === "false") {

        value = false;
        hasValidType = true;

    } else if (value === "null") {

        value = null;
        hasValidType = true;

    }

    if (hasValidType) {

        return value;

    }

    return defaultConfig.allowUnQuote
        ? unQoute(value, {"plusToSpace": defaultConfig.plusToSpace})
        : value;

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
        .replace(/[/]{2,}/g, "/")
        .replace(/[#]{1,}/g, "");

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

    this.variableHash = data.replace(/[#]{1,}/g, "");

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
    var urlFormat = '<!= protocol !><!= subdomain !><!= domain !><!= tld !><!= port !><!= path !><!= queryString !><!= hash !>';
    var joinPath = [
        this.variablePathPrefix,
        this.variablePath
    ].join("/");

    return _stk.templates(urlFormat, {
        "domain": urlData.domain,
        "hash": _stk.isEmpty(this.variableHash)
            ? ''
            : '#'+this.variableHash.replace(/[#]{1,}/g, ""),
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

    var urlFormat = '<!= protocol !><!= subdomain !><!= domain !><!= tld !><!= port !>';

    return _stk.templates(urlFormat, {
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

        var patternRegexp = _stk.has(pattern, "regexp")
            ? pattern.regexp
            : "--";
        var listArgument = _stk.has(pattern, "regexp")
            ? pattern.arguments
            : "--";

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
                    "regexp": "(?:\\/"+(_stk.has(objRegExpKey, typeRef)
                        ? typeRef
                        : objRegExpKey.any)+"{0,})"
                };

                return "(@"+_stk.last(_stk.toArray(_stk.getKey(refRegVal)))+"@)";

            }

            if ((/^\//g).test(_stk.first(ags))) {

                refRegVal[_stk.count(refRegVal)]= {
                    "name": replaceSlashClean,
                    "regexp": "/("+(_stk.has(objRegExpKey, typeRef)
                        ? objRegExpKey[typeRef]
                        : objRegExpKey.any)+"{1,})"
                };

                return "(@"+_stk.last(_stk.toArray(_stk.getKey(refRegVal)))+"@)";

            }

            refRegVal[_stk.count(refRegVal)]= {
                "name": replaceSlashClean,
                "regexp": "("+(_stk.has(objRegExpKey, typeRef)
                    ?objRegExpKey[typeRef]
                    : objRegExpKey.any)+"{1,})"
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

        var listArgument = _stk.map(function (value) {

            return {
                "index": value,
                "name": "arg"+value

            };

        }, _stk.range(_stk.regexCountGroup(pattern)-one, zero));

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

    if ((/^(localhost|localhost:[0-9]{2,})\b/g).test(referenceDomain)) {

        validUrl = false;
        pathValueDetails = referenceDomain.replace(/\b(localhost:[0-9]{2,}|localhost)/g, "");
        getDomainFirstSplit = referenceDomain.replace(pathValueDetails, "");

    }
    if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(referenceDomain) && validUrl) {

        validUrl = false;
        var getPath = referenceDomain.replace((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g, ""));

        if (getPath === false) {

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

    if (_stk.indexOfNotExist(getDomainFirstSplit, exemptListOfDomain) && !(/(\.)/g).test(getDomainFirstSplit) && validUrl) {

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

        var filterEmpty = _stk.filter(function (valS) {

            return _stk.isEmpty(valS) === false;

        }, cleanUrlSplit);

        // Check if there is a empty in split url
        if (_stk.isEmpty(filterEmpty)) {

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
  "₣": "french-franc",
  "₤": "lira",
  "₥": "mill",
  "₦": "naira",
  "₧": "peseta",
  "₨": "rupee",
  "₩": "won",
  "₪": "new-shequel",
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
  "₸": "kazakhstani-tenge",
  "₹": "indian-rupee",
  "₺": "turkish-lira",
  "₽": "russian-ruble",
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
  "ﻻ": "la",
  "": "Soft-hyphen",
  "¡": "Exclamation-Mark",
  "¢": "Cent",
  "£": "Pound",
  "¤": "Currency",
  "¥": "Yen",
  "¦": "Broken",
  "§": "Section",
  "¨": "Umlaut",
  "©": "Copy",
  "ª": "Feminine-Ordinal-Indicator",
  "«": "pointing-angle-quotation-mark",
  "¬": "Not",
  "®": "Registered-trademark",
  "°": "Degree",
  "±": "Plus–minus",
  "²": "two",
  "³": "three",
  "´": "accent",
  "µ": "Micro",
  "¶": "Pilcrow",
  "¹": "one",
  "º": "Masculine-ordinal-indicator",
  "»": "pointing-angle-quotation-mark",
  "¼": "one-quarter",
  "½": "one-half",
  "¾": "three-quarters",
  "¿": "Question-Mark",
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
  "Ð": "ETH",
  "Ñ": "N",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "×": "Multiplication",
  "Ø": "O",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "Ý": "Y",
  "Þ": "T",
  "ß": "s",
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
  "ð": "eth",
  "ñ": "n",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "÷": "Division",
  "ø": "o",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "ý": "y",
  "þ": "t",
  "ÿ": "y",
  "Ā": "A",
  "ā": "a",
  "Ă": "A",
  "ă": "a",
  "Ą": "A",
  "ą": "a",
  "Ć": "C",
  "ć": "c",
  "Ĉ": "C",
  "ĉ": "c",
  "Ċ": "C",
  "ċ": "c",
  "Č": "C",
  "č": "c",
  "Ď": "D",
  "ď": "d",
  "Đ": "D",
  "đ": "d",
  "Ē": "E",
  "ē": "e",
  "Ĕ": "E",
  "ĕ": "e",
  "Ė": "E",
  "ė": "e",
  "Ę": "E",
  "ę": "e",
  "Ě": "E",
  "ě": "e",
  "Ĝ": "G",
  "ĝ": "g",
  "Ğ": "G",
  "ğ": "g",
  "Ġ": "G",
  "ġ": "g",
  "Ģ": "G",
  "ģ": "g",
  "Ĥ": "H",
  "ĥ": "h",
  "Ħ": "H",
  "ħ": "h",
  "Ĩ": "I",
  "ĩ": "i",
  "Ī": "I",
  "ī": "i",
  "Ĭ": "I",
  "ĭ": "i",
  "Į": "I",
  "į": "i",
  "İ": "I",
  "ı": "i",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "kra",
  "Ĺ": "L",
  "ĺ": "l",
  "Ļ": "L",
  "ļ": "l",
  "Ľ": "L",
  "ľ": "l",
  "Ŀ": "L",
  "ŀ": "l",
  "Ł": "L",
  "ł": "l",
  "Ń": "N",
  "ń": "n",
  "Ņ": "N",
  "ņ": "n",
  "Ň": "N",
  "ň": "n",
  "ŉ": "n",
  "Ŋ": "ENG",
  "ŋ": "eng",
  "Ō": "O",
  "ō": "o",
  "Ŏ": "O",
  "ŏ": "o",
  "Ő": "O",
  "ő": "o",
  "Œ": "OE",
  "œ": "oe",
  "Ŕ": "R",
  "ŕ": "r",
  "Ŗ": "R",
  "ŗ": "r",
  "Ř": "R",
  "ř": "r",
  "Ś": "S",
  "ś": "s",
  "Ŝ": "S",
  "ŝ": "s",
  "Ş": "S",
  "ş": "s",
  "Š": "S",
  "š": "s",
  "Ţ": "T",
  "ţ": "t",
  "Ť": "T",
  "ť": "t",
  "Ŧ": "T",
  "ŧ": "t",
  "Ũ": "U",
  "ũ": "u",
  "Ū": "U",
  "ū": "u",
  "Ŭ": "U",
  "ŭ": "u",
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
  "ſ": "s",
  "ƀ": "b",
  "Ɓ": "B",
  "Ƃ": "B",
  "ƃ": "b",
  "Ƅ": "SIX",
  "ƅ": "six",
  "Ɔ": "O",
  "Ƈ": "C",
  "ƈ": "c",
  "Ɖ": "D",
  "Ɗ": "D",
  "Ƌ": "D",
  "ƌ": "d",
  "ƍ": "delta",
  "Ǝ": "E",
  "Ə": "SCHWA",
  "Ɛ": "E",
  "Ƒ": "F",
  "ƒ": "f",
  "Ɠ": "G",
  "Ɣ": "GAMMA",
  "ƕ": "hv",
  "Ɩ": "IOTA",
  "Ɨ": "I",
  "Ƙ": "K",
  "ƙ": "k",
  "ƚ": "l",
  "ƛ": "lambda",
  "Ɯ": "M",
  "Ɲ": "N",
  "ƞ": "n",
  "Ɵ": "O",
  "Ơ": "O",
  "ơ": "o",
  "Ƣ": "OI",
  "ƣ": "oi",
  "Ƥ": "P",
  "ƥ": "p",
  "Ʀ": "YR",
  "Ƨ": "TWO",
  "ƨ": "two",
  "Ʃ": "ESH",
  "ƪ": "Esh",
  "ƫ": "t-palatal",
  "Ƭ": "T",
  "ƭ": "t",
  "Ʈ": "T",
  "Ư": "U",
  "ư": "u",
  "Ʊ": "UPSILON",
  "Ʋ": "V",
  "Ƴ": "Y",
  "ƴ": "y",
  "Ƶ": "Z",
  "ƶ": "z",
  "Ʒ": "EZH",
  "Ƹ": "EZH",
  "ƹ": "ezh",
  "ƺ": "ezh",
  "ƻ": "Two",
  "Ƽ": "FIVE",
  "ƽ": "five",
  "ƾ": "Glottal",
  "ƿ": "Wynn",
  "ǀ": "Dental",
  "ǁ": "Lateral",
  "ǂ": "Alveolar",
  "Ǆ": "DZ",
  "ǅ": "Dz",
  "ǆ": "dz",
  "Ǉ": "LJ",
  "ǈ": "Lj",
  "ǉ": "lj",
  "Ǌ": "NJ",
  "ǋ": "Nj",
  "ǌ": "nj",
  "Ǎ": "A",
  "ǎ": "a",
  "Ǐ": "I",
  "ǐ": "i",
  "Ǒ": "O",
  "ǒ": "o",
  "Ǔ": "U",
  "ǔ": "u",
  "Ǖ": "U",
  "ǖ": "u",
  "Ǘ": "U",
  "ǘ": "u",
  "Ǚ": "U",
  "ǚ": "u",
  "Ǜ": "U",
  "ǜ": "u",
  "ǝ": "e",
  "Ǟ": "A",
  "ǟ": "a",
  "Ǡ": "A",
  "ǡ": "a",
  "Ǣ": "AE",
  "ǣ": "ae",
  "Ǥ": "G",
  "ǥ": "g",
  "Ǧ": "G",
  "ǧ": "g",
  "Ǩ": "K",
  "ǩ": "k",
  "Ǫ": "O",
  "ǫ": "o",
  "Ǭ": "O",
  "ǭ": "o",
  "Ǯ": "EZH",
  "ǯ": "ezh",
  "ǰ": "j",
  "Ǳ": "DZ",
  "ǲ": "Dz",
  "ǳ": "dz",
  "Ǵ": "G",
  "ǵ": "g",
  "Ƕ": "HWAIR",
  "Ƿ": "WYNN",
  "Ǹ": "N",
  "ǹ": "n",
  "Ǻ": "A",
  "ǻ": "a",
  "Ǽ": "AE",
  "ǽ": "ae",
  "Ǿ": "O",
  "ǿ": "o",
  "Ȁ": "A",
  "ȁ": "a",
  "Ȃ": "A",
  "ȃ": "a",
  "Ȅ": "E",
  "ȅ": "e",
  "Ȇ": "E",
  "ȇ": "e",
  "Ȉ": "I",
  "ȉ": "i",
  "Ȋ": "I",
  "ȋ": "i",
  "Ȍ": "O",
  "ȍ": "o",
  "Ȏ": "O",
  "ȏ": "o",
  "Ȑ": "R",
  "ȑ": "r",
  "Ȓ": "R",
  "ȓ": "r",
  "Ȕ": "U",
  "ȕ": "u",
  "Ȗ": "U",
  "ȗ": "u",
  "Ș": "S",
  "ș": "s",
  "Ț": "T",
  "ț": "t",
  "Ȝ": "YOGH",
  "ȝ": "yogh",
  "Ȟ": "H",
  "ȟ": "h",
  "Ƞ": "N",
  "ȡ": "d",
  "Ȣ": "OU",
  "ȣ": "ou",
  "Ȥ": "Z",
  "ȥ": "z",
  "Ȧ": "A",
  "ȧ": "a",
  "Ȩ": "E",
  "ȩ": "e",
  "Ȫ": "O",
  "ȫ": "o",
  "Ȭ": "O",
  "ȭ": "o",
  "Ȯ": "O",
  "ȯ": "o",
  "Ȱ": "O",
  "ȱ": "o",
  "Ȳ": "Y",
  "ȳ": "y",
  "ȴ": "l",
  "ȵ": "n",
  "ȶ": "t",
  "ȷ": "j",
  "ȸ": "db",
  "ȹ": "qp",
  "Ⱥ": "A",
  "Ȼ": "C",
  "ȼ": "c",
  "Ƚ": "L",
  "Ⱦ": "T",
  "ȿ": "s",
  "ɀ": "z",
  "Ɂ": "GLOTTAL",
  "ɂ": "glottal",
  "Ƀ": "B",
  "Ʉ": "U",
  "Ʌ": "V",
  "Ɇ": "E",
  "ɇ": "e",
  "Ɉ": "J",
  "ɉ": "j",
  "Ɋ": "Q",
  "ɋ": "q",
  "Ɍ": "R",
  "ɍ": "r",
  "Ɏ": "Y",
  "ɏ": "y",
  "Ḁ": "A",
  "ḁ": "a",
  "Ḃ": "B",
  "ḃ": "b",
  "Ḅ": "B",
  "ḅ": "b",
  "Ḇ": "B",
  "ḇ": "b",
  "Ḉ": "C",
  "ḉ": "c",
  "Ḋ": "D",
  "ḋ": "d",
  "Ḍ": "D",
  "ḍ": "d",
  "Ḏ": "D",
  "ḏ": "d",
  "Ḑ": "D",
  "ḑ": "d",
  "Ḓ": "D",
  "ḓ": "d",
  "Ḕ": "E",
  "ḕ": "e",
  "Ḗ": "E",
  "ḗ": "e",
  "Ḙ": "E",
  "ḙ": "e",
  "Ḛ": "E",
  "ḛ": "e",
  "Ḝ": "E",
  "ḝ": "e",
  "Ḟ": "F",
  "ḟ": "f",
  "Ḡ": "G",
  "ḡ": "g",
  "Ḣ": "H",
  "ḣ": "h",
  "Ḥ": "H",
  "ḥ": "h",
  "Ḧ": "H",
  "ḧ": "h",
  "Ḩ": "H",
  "ḩ": "h",
  "Ḫ": "H",
  "ḫ": "h",
  "Ḭ": "I",
  "ḭ": "i",
  "Ḯ": "I",
  "ḯ": "i",
  "Ḱ": "K",
  "ḱ": "k",
  "Ḳ": "K",
  "ḳ": "k",
  "Ḵ": "K",
  "ḵ": "k",
  "Ḷ": "L",
  "ḷ": "l",
  "Ḹ": "L",
  "ḹ": "l",
  "Ḻ": "L",
  "ḻ": "l",
  "Ḽ": "L",
  "ḽ": "l",
  "Ḿ": "M",
  "ḿ": "m",
  "Ṁ": "M",
  "ṁ": "m",
  "Ṃ": "M",
  "ṃ": "m",
  "Ṅ": "N",
  "ṅ": "n",
  "Ṇ": "N",
  "ṇ": "n",
  "Ṉ": "N",
  "ṉ": "n",
  "Ṋ": "N",
  "ṋ": "n",
  "Ṍ": "O",
  "ṍ": "o",
  "Ṏ": "O",
  "ṏ": "o",
  "Ṑ": "O",
  "ṑ": "o",
  "Ṓ": "O",
  "ṓ": "o",
  "Ṕ": "P",
  "ṕ": "p",
  "Ṗ": "P",
  "ṗ": "p",
  "Ṙ": "R",
  "ṙ": "r",
  "Ṛ": "R",
  "ṛ": "r",
  "Ṝ": "R",
  "ṝ": "r",
  "Ṟ": "R",
  "ṟ": "r",
  "Ṡ": "S",
  "ṡ": "s",
  "Ṣ": "S",
  "ṣ": "s",
  "Ṥ": "S",
  "ṥ": "s",
  "Ṧ": "S",
  "ṧ": "s",
  "Ṩ": "S",
  "ṩ": "s",
  "Ṫ": "T",
  "ṫ": "t",
  "Ṭ": "T",
  "ṭ": "t",
  "Ṯ": "T",
  "ṯ": "t",
  "Ṱ": "T",
  "ṱ": "t",
  "Ṳ": "U",
  "ṳ": "u",
  "Ṵ": "U",
  "ṵ": "u",
  "Ṷ": "U",
  "ṷ": "u",
  "Ṹ": "U",
  "ṹ": "u",
  "Ṻ": "U",
  "ṻ": "u",
  "Ṽ": "V",
  "ṽ": "v",
  "Ṿ": "V",
  "ṿ": "v",
  "Ẁ": "W",
  "ẁ": "w",
  "Ẃ": "W",
  "ẃ": "w",
  "Ẅ": "W",
  "ẅ": "w",
  "Ẇ": "W",
  "ẇ": "w",
  "Ẉ": "W",
  "ẉ": "w",
  "Ẋ": "X",
  "ẋ": "x",
  "Ẍ": "X",
  "ẍ": "x",
  "Ẏ": "Y",
  "ẏ": "y",
  "Ẑ": "Z",
  "ẑ": "z",
  "Ẓ": "Z",
  "ẓ": "z",
  "Ẕ": "Z",
  "ẕ": "z",
  "ẖ": "h",
  "ẗ": "t",
  "ẘ": "w",
  "ẙ": "y",
  "ẛ": "s",
  "ẜ": "s",
  "ẝ": "s",
  "ẞ": "S",
  "ẟ": "delta",
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
  "Ỻ": "WELSHLL",
  "ỻ": "welsh-ll",
  "Ỽ": "WELSH-V",
  "ỽ": "welsh-v",
  "Ỿ": "Y",
  "ỿ": "y",
  "ɐ": "a",
  "ɑ": "alpha",
  "ɒ": "alpha",
  "ɓ": "b",
  "ɔ": "o",
  "ɕ": "c",
  "ɖ": "d",
  "ɗ": "d",
  "ɘ": "e",
  "ə": "schwa",
  "ɚ": "schwa",
  "ɛ": "e",
  "ɜ": "e",
  "ɝ": "e",
  "ɞ": "e",
  "ɟ": "j",
  "ɠ": "g",
  "ɡ": "g",
  "ɢ": "G",
  "ɣ": "gamma",
  "ɤ": "rams",
  "ɥ": "h",
  "ɦ": "h",
  "ɧ": "heng",
  "ɨ": "i",
  "ɩ": "iota",
  "ɪ": "I",
  "ɫ": "l",
  "ɬ": "l",
  "ɭ": "l",
  "ɮ": "lezh",
  "ɯ": "m",
  "ɰ": "m",
  "ɱ": "m",
  "ɲ": "n",
  "ɳ": "n",
  "ɴ": "N",
  "ɵ": "o",
  "ɶ": "OE",
  "ɷ": "omega",
  "ɸ": "phi",
  "ɹ": "r",
  "ɺ": "r",
  "ɻ": "r",
  "ɼ": "r",
  "ɽ": "r",
  "ɾ": "r",
  "ɿ": "r",
  "ʀ": "R",
  "ʁ": "R",
  "ʂ": "s",
  "ʃ": "esh",
  "ʄ": "j",
  "ʅ": "esh",
  "ʆ": "esh",
  "ʇ": "t",
  "ʈ": "t",
  "ʉ": "u",
  "ʊ": "upsilon",
  "ʋ": "v",
  "ʌ": "v",
  "ʍ": "w",
  "ʎ": "y",
  "ʏ": "Y",
  "ʐ": "z",
  "ʑ": "z",
  "ʒ": "ezh",
  "ʓ": "ezh",
  "ʔ": "Glottal",
  "ʕ": "Pharyngeal",
  "ʖ": "Glottal",
  "ʗ": "C",
  "ʘ": "Bilabial",
  "ʙ": "B",
  "ʚ": "e",
  "ʛ": "G",
  "ʜ": "H",
  "ʝ": "j",
  "ʞ": "k",
  "ʟ": "L",
  "ʠ": "q",
  "ʡ": "Glottal",
  "ʢ": "Glottal",
  "ʣ": "dz",
  "ʤ": "dezh",
  "ʥ": "dz",
  "ʦ": "ts",
  "ʧ": "tesh",
  "ʨ": "tc",
  "ʩ": "feng",
  "ʪ": "ls",
  "ʫ": "lz",
  "ʬ": "Bilabial",
  "ʭ": "Bidental",
  "ʮ": "h",
  "ʯ": "h"
};

/**
 * Create a serialize data if you are coming to php
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {string} Returns number for subtracted value
 * @example
 *
 * phpSerialize(["22s"])
 * // => 'a:1:{i:0;s:3:"22s";}'
 */
function phpSerialize (value) {

    return _stk.curry(function (rawValue) {

        var dataType = _stk.getTypeof(rawValue);

        if (_stk.indexOfExist(dataType, [
            "array",
            "json",
            "object",
            "set",
            "map"
        ])) {

            var getKeyVal = _stk.toArray(_stk.getKey(rawValue));
            var getValueVal = _stk.toArray(_stk.getValue(rawValue));

            var mapData = _stk.map(function (mValue, kValue) {

                var refMapKey = getKeyVal[kValue];
                var refMapValue = getValueVal[kValue];

                return parseTypeVal(_stk.getTypeof(refMapKey), refMapKey) +""+parseTypeVal(_stk.getTypeof(refMapValue), refMapValue);

            }, _stk.range(_stk.count(rawValue) - one, zero));

            return "a:"+_stk.count(mapData)+":{"+mapData.join("")+"}";

        }

        return parseTypeVal(dataType, value);

    }, one)(value);

}

/**
 * Convert the value to its type in serialize
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} typeValue Arugment that you want to convert to serialize string
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeVal ("string", "value")
 * // => 0
 */
var parseTypeVal = function (typeValue, value) {

    if (_stk.indexOfExist(typeValue, [
        "array",
        "json",
        "object",
        "set",
        "map"
    ])) {

        return phpSerialize(value);

    }

    if (typeValue === "string") {

        return "s:"+_stk.count(value)+":\""+value+"\";";

    }
    if (typeValue === "function") {

        return "O:"+_stk.count(value.name)+":\""+value.name+"\":0:{};";

    }
    if (typeValue === "number") {

        return "i:"+value+";";

    }

    return "N;";

};

/**
 * Convert date to its preferred value
 *
 * @since 1.2.72
 * @category Function
 * @param {string} value String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function convertValue (value) {

    if (_stk.getTypeof(value) === "string") {

        if ((/^[0-9]{1,}$/g).test(value)) {

            return parseInt(value);

        }

        if ((/^[0-9]{1,}[.]{1}[0-9]{1,}$/g).test(value)) {

            return parseFloat(value);

        }

        return value;

    }

    return value;

}

/**
 * Create a serialize data if you are coming to php
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * phpUnSerialize('s:6:"Violet";')
 * // => 'Violet'
 */
function phpUnSerialize (value) {

    return _stk.curry(function (rawValue) {

        return parseTypeValObj(rawValue);

    }, one)(value);

    // }, [value], one);

}

/**
 * Convert the value to its type in serialize
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeValObj ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
var getObjectValue = function (value) {

    var splitOpen = value.split("{");
    var splitClose = _stk.reduce(function (total, mVal) {

        var rawVal = mVal;

        if (rawVal.match(/;(\})[a-z]:\d:(.*)/)) {

            var spltRawVal = rawVal.split("}");

            rawVal = spltRawVal.join("};");

        }
        total.push(rawVal);

        return total;

    }, [], _stk.arraySlice(splitOpen, one)).join("{")
        .replace(/\}[;]{1,}$/g, "");

    return splitClose;

};

/**
 * Convert the value to its type in serialize
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * getObjectType ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
var getObjectType = function (value) {

    var getMatch = value.match(/\b([a-z]){1}:([0-9]+)\b/g);

    if (getMatch !== null) {

        return {
            "is_valid": true,
            "matches": getMatch
        };

    }

    return {
        "is_valid": false,
        "matches": []
    };

};

/**
 * Convert the value to its type in serialize
 *
 * @since 1.2.72
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeValObj ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
var parseTypeValObj = function (value) {

    if (value === "N;") {

        return null;

    }

    var getMatch = getObjectType(value);

    if (getMatch.is_valid) {

        var splitValue = getMatch.matches[zero].split(":");

        if (splitValue[zero] === "s") {

            var stringSplit = value.split(";");
            var slitGetStr = _stk.first(stringSplit).split(":");

            return slitGetStr[two].replace(/^"/g, "").replace(/"$/g, "");

        }

        if (splitValue[zero] === "O") {

            var stringSplit = value.split(";");
            var slitGetStr = _stk.first(stringSplit).split(":");

            return slitGetStr[two].replace(/^"/g, "").replace(/"$/g, "");

        }

        if (splitValue[zero] === "i") {

            return convertValue(splitValue[one]);

        }

        if (splitValue[zero] === "a") {

            var objValue = getObjectValue(value).split(";");

            var argVal = {};
            // This will help as check if the deep type was in array or json
            var isArrayValue = true;
            var counterArrayValue =zero;

            _stk.each(_stk.range(convertValue(splitValue[one]) - one, zero), function () {

                var refobjKey = parseTypeValObj(objValue[zero]+";");

                if (isArrayValue && refobjKey !== counterArrayValue) {

                    isArrayValue = false;

                }

                var isValidObject = false;
                var rawCount = one;

                if (objValue[one].match(/[a-z]:[0-9]+:\{[a-z]:[0-9]/g)) {

                    rawCount = _stk.indexOf("}", objValue);
                    isValidObject = true;

                }

                argVal[refobjKey] = parseTypeValObj(_stk.arraySlice(objValue, one).join(";")+";");

                if (isValidObject) {

                    objValue = _stk.arraySlice(objValue, rawCount + one);
                    counterArrayValue += rawCount;

                } else {

                    objValue = _stk.arraySlice(objValue, two);
                    counterArrayValue += one;

                }

            });

            return isArrayValue
                ?_stk.toArray(_stk.getValue(argVal))
                :argVal;

        }

    }

    return null;

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
    var cleanReplacePath = _stk.reduce(function (grand, value) {

        grand.push(value.replace(/^(\/)/, "").replace(/(\/)$/, ""));

        return grand;

    }, [], replacePath);

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
 * @param {object=} config Option you want to set in this function
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isWSProtocolValid('wss://example.com')
 *=> true
 */
function isWSProtocolValid (host, config) {

    var varConfig = _stk.varExtend({
        "isSecure": true,
        "isValidFormat": true
    }, config);

    if (varConfig.isValidFormat && (/^(ws):\/\//g).test(host)) {

        return true;

    }
    if (varConfig.isSecure && (/^(wss):\/\//g).test(host)) {

        return true;

    }

    return false;

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
 * Convert the charset to english
 *
 * @since 1.2.6
 * @category string
 * @param {string} words Passing words you want to convert to english
 * @param {any=} ext Option you want to set in this function
 * @returns {string} Return the string.
 * @example
 *
 * charsetToEn('hello $ world')
 *=> hello dollar world
 */
function charsetToEn (words, ext) {

    var varExt = _stk.varExtend({
        "dictStrictMap": {}
    }, ext);

    var refCharMap = _stk.mergeWithKey(charMap, varExt.dictStrictMap);

    var rawWords = String(words);

    rawWords = _stk.reduce(function (sums, value) {

        sums+= _stk.has(refCharMap, value) && value.includes(" ") === false
            ?refCharMap[value]
            :value;

        return sums;

    }, "", rawWords.normalize().split(""));

    return rawWords;

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

        strPattern = charsetToEn(strPattern, {
            "dictStrictMap": varExt.dictStrictMap
        });

    }

    strPattern = strPattern.replace(/[\n\t\r]/g, " ");
    strPattern = _stk.trim(strPattern);
    strPattern = strPattern.replace(/([\s])/g, varExt.delimiter);

    if (varExt.lower) {

        strPattern = _stk.strLower(strPattern);

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

/**
 * Encode the url to valid format
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Passing url path like `/12`
 * @returns {string} Return the encoded string.
 * @example
 *
 * data = urlPattern('/','/');
 * data.isValid()
 *=> true
 */
function encodeURI (data) {

    return coreEncodeURI(data);

}

/**
 * Decode the url to valid format
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Passing url path like `/12`
 * @returns {string} Return the decoded string.
 * @example
 *
 * data = urlPattern('/','/');
 * data.isValid()
 *=> true
 */
function decodeURI (data) {

    return coreDecodeURI(data);

}

urs.getHostDetails=getHostDetails;
urs.formatUrl=formatUrl;
urs.qsStringify=qsStringify;
urs.qsParse=qsParse;
urs.isHttps=isHttps;
urs.isHttpProtocolValid=isHttpProtocolValid;
urs.joinUrlPath=joinUrlPath;
urs.isUrlExtValid=isUrlExtValid;
urs.isWSProtocolValid=isWSProtocolValid;
urs.isUrlValidFormat=isUrlValidFormat;
urs.urlComposer=urlComposer;
urs.urlPattern=urlPattern;
urs.slugify=slugify;
urs.queryEncode=queryEncode;
urs.queryDecode=queryDecode;
urs.phpSerialize=phpSerialize;
urs.phpUnSerialize=phpUnSerialize;
urs.qoute=qoute;
urs.unQoute=unQoute;
urs.charsetToEn=charsetToEn;
urs.encodeURI=encodeURI;
urs.decodeURI=decodeURI;


 })(typeof window !== "undefined" ? window : this);