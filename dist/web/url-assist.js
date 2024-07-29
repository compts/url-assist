(function(global){
global.urs={};

configQueryString = {

    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&",
    "startWith": ""
};
const exemptListOfDomain = ['localhost'];
const objRegExpKey = {

    "alpha": '[a-zA-Z]',
    "any": '[a-zA-Z0-9\\-\\_.]',
    "number": '[0-9]',
    "string": '[a-zA-Z0-9]'
};

const zero = 0;
const one =1;
const two =2;
const three = 3;

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

    const referenceValue = [];
    const defaultConfig = _stk.varExtend(configQueryString, config);

    _stk.each(value, function (key, val) {

        parseStringConvert(key, val, _stk.getTypeof(val), defaultConfig, referenceValue);

    });

    return defaultConfig.startWith+referenceValue.join(defaultConfig.newLineSeparator);

}

/**
 * Parse query string to object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} key The first number in an addition.
 * @param {any} value The first number in an addition.
 * @param {any} type The first number in an addition.
 * @param {any} config The first number in an addition.
 * @param {any} reference The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * parseStringConvert({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
const parseStringConvert=function (key, value, type, config, reference) {

    if (_stk.indexOf([
        "json",
        "array"
    ], type) >=zero) {

        _stk.each(value, function (ky, vl) {

            const keyVal = _stk.indexOf([
                "number",
                "array"
            ], type) >=zero
                ?config.arrayFormat
                :"["+ky+"]";

            let defineKey = keyVal;

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
 * Decoding URI component
 *
 * @since 1.2.6
 * @category Seq
 * @param {any} value config defalut value
 * @returns {any} Returns the null.
 * @example
 *
 * decodeStr("tests+test")
 * // => tests test
 */
const decodeStr = function (value) {

    let updateValue = value.replace(/\+/g, ' ');

    try {

        updateValue = decodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

};

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

    value = value.trim().replace(/^[?#&]/, '');
    value = decodeStr(value);
    const referenceValue = {};
    const defaultConfig = _stk.varExtend(configQueryString, config);
    const defaultSplit = value.split(defaultConfig.newLineSeparator);

    // https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    // Schema for data
    qsParseCallback(defaultConfig, defaultSplit, function (keyOnly, keyList, getValueOnly) {

        parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

    });

    // Value for its data
    qsParseCallback(defaultConfig, defaultSplit, function (keyOnly, keyList, getValueOnly) {

        parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

    });

    return referenceValue;

}

/**
 * Parsing query string into JSON object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} defaultConfig config defalut value
 * @param {any} keyOnly Key in array
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly)
 * // => null
 */
const parseObjectConvert = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    const filterKeyList = _stk.filter(keyList, function (ke, value) {

        return _stk.isEmpty(value)===false;

    });

    if (_stk.getTypeof(referenceValue[keyOnly]) === "string") {

        referenceValue[keyOnly] = getValueOnly;

    }

    if (_stk.getTypeof(referenceValue[keyOnly]) === "array") {

        const firstKey = _stk.first(filterKeyList);
        const referenceData = {};

        objectMultipleKey(referenceData, filterKeyList, getValueOnly);
        referenceValue[keyOnly].push(_stk.isEmpty(firstKey)
            ? getValueOnly
            : referenceData);

    }

    if (_stk.getTypeof(referenceValue[keyOnly]) === "json") {

        objectMultipleKey(referenceValue[keyOnly], filterKeyList, getValueOnly);

    }

};

/**
 * Parsing nested object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly)
 * // => null
 */
const objectMultipleKey = function (referenceValue, keyList, getValueOnly) {

    const keyListClone = _stk.clone(keyList);

    keyList.shift();
    if (_stk.isEmpty(keyList)) {

        if (_stk.getTypeof(referenceValue[_stk.first(keyListClone)]) === "array") {

            referenceValue[_stk.first(keyListClone)].push(getValueOnly);

        } else {

            referenceValue[_stk.first(keyListClone)] = getValueOnly;

        }

    } else {

        objectMultipleKey(referenceValue[_stk.first(keyListClone)], keyList, getValueOnly);

    }

};

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
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectSchema({"test": 11,"test2": 11}, {"test2": 11})
 * // => null
 */
const parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (_stk.has(referenceValue, keyOnly) ===false) {

        if (_stk.isEmpty(keyList)) {

            if (_stk.isEmpty(keyOnly) ===false) {

                referenceValue[keyOnly]="";

            }

        } else {

            const firstKey = _stk.first(keyList);

            if (_stk.isEmpty(firstKey)) {

                referenceValue[keyOnly] = [];

            } else {

                referenceValue[keyOnly] = {};

            }

            if (_stk.isEmpty(keyList) ===false) {

                const keyListClone = _stk.clone(keyList);

                keyList.shift();

                parseObjectSchema(referenceValue[keyOnly], defaultConfig, _stk.first(keyListClone), keyList, getValueOnly);

            }

        }

    } else {

        if (_stk.getTypeof(referenceValue[keyOnly]) === "string") {

            referenceValue[keyOnly] = [];

        }

    }

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
const qsParseCallback = function (defaultConfig, defaultSplit, callbacks) {

    _stk.each(defaultSplit, function (__, val) {

        const getKeyAndValue = val.split(defaultConfig.equalSeparator);
        const getKeyOnly = _stk.first(getKeyAndValue);
        const getValueOnly = _stk.arraySlice(getKeyAndValue, one).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > zero) {

            let keyOnly = "";
            const keyList = [];

            const keySubData = getKeyOnly.replace(/^([\w\-_\d]{1,})\[/g, function (whole, sub1) {

                keyOnly=sub1;

                return "[";

            });

            if (_stk.isEmpty(keyOnly)) {

                keyOnly=getKeyOnly;

            }

            keySubData.replace(/(\[[\s\w\-_\d]{0,}\])/g, function (whole, sub1) {

                keyList.push(sub1.replace(/[[\]]/g, ""));

            });

            callbacks(keyOnly, keyList, getValueOnly);

        }

    });

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

    const data = {
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

    return data.replace(/^(\/)/, "").replace(/(\/)$/, "");

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
 * urlComposer('https://example.com')
 *=> true
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
 * setHash('http')
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
 */
UrlComposerInit.prototype.setPathPrefix = function (data) {

    this.variablePathPrefix = data;

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
 */
UrlComposerInit.prototype.setPath = function (data) {

    this.variablePath = data;

};

/**
 * Set HTTP domain name
 *
 * @since 1.1.0
 * @category environment
 * @param {any} data Passing object to convert string
 * @returns {undefined} Return the boolean.
 * @example
 *
 * setDomain('example')
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
 * setDomainTld('com')
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
 */
UrlComposerInit.prototype.setQueryString = function (data) {

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

    const urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    const urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !><!- path !><!- queryString !><!- hash !>';
    const joinPath = [
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
            : '/'+removeSlash(joinPath)
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
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

    const urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    const urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !>';

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

    const matchPatternPath = path.match(pattern.patterns);

    if (_stk.has(matchPatternPath)) {

        const firstMatch = _stk.toString(_stk.first(matchPatternPath)).replace(/^\//g, "")
            .replace(/\/$/g, "");

        const pathClean = _stk.toString(path).replace(/^\//g, "")
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

    const one = 1;
    const zero = 0;

    if (_stk.getTypeof(pattern) ==="json") {

        const patternRegexp = _stk.ifUndefined(pattern, "regexp", "--");
        const listArgument = _stk.ifUndefined(pattern, "arguments", []);

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

        const refRegVal = {};
        let updPattern = _stk.toString(pattern).replace(/([*]{1,})/g, "(.*?)");

        updPattern = _stk.toString(updPattern).replace(/([(]{0,1}[/]{0,1}:[a-zA-Z9-_<>]{1,}[)]{0,1})/g, function (...ags) {

            const replaceSlash = _stk.toString(_stk.first(ags)).replace(/^\//g, "");
            const replaceSlashClean = _stk.toString(replaceSlash).replace(/[:()/]{0,}/g, "")
                .replace(/<(.*?)>/g, "");
            const typeData = _stk.toString(replaceSlash).match(/<([a-zA-Z]{1,})>/i);

            let typeRef = "any";

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

        const listArgument = [];

        updPattern = updPattern.replace(/\((.*?)\)/g, function (...arg) {

            const lengthArg = listArgument.length;

            const firstValue = _stk.first(arg);

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

        const listArgument = _stk.map(_stk.range(_stk.regexCountGroup(pattern)-one, zero), function (value) {

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

    const refPattern = basePattern(this.pattern);
    const refPath = basePath(this.path);

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

    const refParam = {};

    const refPattern = basePattern(this.pattern);
    const refPath = basePath(this.path);

    if (validMatchPatternPath(refPattern, refPath)) {

        const matchPatternPath = refPath.match(refPattern.patterns);

        _stk.each(refPattern.arguments, function (key, value) {

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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
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
const getDomain =function (domain) {

    const referenceDomain = domain.replace(/\b([\w\\+]{1,}:\/{2})\b/g, "");

    const splitDomain = referenceDomain.split("/");
    let getDomainFirstSplit = _stk.first(splitDomain);
    let pathValueDetails = _stk.arraySlice(splitDomain, one).join("/");

    if (_stk.indexOfNotExist(exemptListOfDomain, getDomainFirstSplit) && !(/(\.)/g).test(getDomainFirstSplit)) {

        getDomainFirstSplit = '';
        pathValueDetails = splitDomain.join("/");

    }

    let pathValue = pathValueDetails;
    let hashValue = "";
    let queryValue = "";

    const pathSplitHash = pathValue.split("#");

    if (_stk.count(pathSplitHash) > one) {

        pathValue = _stk.first(pathSplitHash);
        hashValue = _stk.last(pathSplitHash);

    }

    const pathSplitQuery = pathValue.split("?");

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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
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
const getDomainDetails=function (domain) {

    let domainDetails = {
        "domain": "",
        "domainWithTld": "",
        "subdomain": "",
        "tld": ""
    };

    const domainSplit = domain.split(".");
    const getTLD = _stk.last(domainSplit).split(":");

    if (_stk.count(domainSplit) === one) {

        domainDetails = {
            "domain": _stk.first(getTLD),
            "domainWithTld": _stk.first(getTLD),
            "subdomain": "",
            "tld": ""
        };

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

        const getDefaultDomain = _stk.arraySlice(domainSplit, _stk.count(domainSplit) - two, _stk.count(domainSplit) - two);

        domainDetails = {
            "domain": _stk.toString(getDefaultDomain),
            "domainWithTld": getDefaultDomain +"."+_stk.last(domainSplit),
            "subdomain": _stk.arraySlice(domainSplit, zero, _stk.count(domainSplit) - three).join("."),
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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
const isUrlValidFormatVerifier=function (domain) {

    const httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    const validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    const validTLDlen = 63;

    if (httpRegExp.test(domain)) {

        const cleanUrl = getDomain(domain).url.replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");

        if (_stk.indexOfExist(["localhost"], cleanUrl)) {

            return true;

        }
        if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(cleanUrl)) {

            return true;

        }
        const cleanUrlSplit = cleanUrl.split(".");

        if (_stk.count(cleanUrlSplit) >= two) {

            const getTLD = _stk.count(_stk.first(_stk.last(cleanUrlSplit).split("/")).split(""));

            if (getTLD > one && getTLD <= validTLDlen) {

                if (_stk.count(cleanUrlSplit) === two) {

                    return validDomainRegExp.test(_stk.first(cleanUrlSplit));

                }

                if (_stk.count(cleanUrlSplit) >= three) {

                    const getDomainSplit = getDomainDetails(cleanUrl);

                    const regSubDomain =(/^([\w\d-.]{1,})$/g).test(getDomainSplit.subdomain);
                    const regDomain = (/^([\w\d-]{1,})$/g).test(getDomainSplit.domain);

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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
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
const urlDetails=function (domain) {

    const dataReference = {
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

    domain.replace(/\b([\w\\+]{1,}):\/\/\b/g, function (wh, s1) {

        dataReference.protocol = s1;

        return "";

    });

    const hostname = getDomain(domain);

    const splitPort = hostname.url.split(":");

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
    const splitUsernameDomain = dataReference.hostname.split("@");

    if (_stk.count(splitUsernameDomain) === two) {

        dataReference.user = _stk.first(splitUsernameDomain);
        dataReference.hostname = _stk.last(splitUsernameDomain);

        const usernameAndPassword = dataReference.user.split(":");

        if (_stk.count(usernameAndPassword) === two) {

            dataReference.user = _stk.first(usernameAndPassword);
            dataReference.password = _stk.last(usernameAndPassword);

        }

    }

    return dataReference;

};

/**
 * In url or path, you now verified the format of your url
 *
 * @since 1.2.1
 * @category Seq
 * @param {string|object} pattern Passing the completet domain url
 * @param {string} path Passing the completet domain url
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
 * @param {string} domain Passing the completet domain url
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
 * @param {string} domain Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlValidFormat('https://example.com')
 *=> true
 */
function isUrlValidFormat (domain) {

    return isUrlValidFormatVerifier(domain);

}

/**
 * To join the domain and path
 *
 * @since 1.0.0
 * @category String
 * @param {...any} ags The Domain url
 * @returns {string} Return the boolean.
 * @example
 *
 * joinUrlPath('https://example.com','test')
 *=> https://example.com/test
 */
function joinUrlPath (...ags) {

    const replaceDomain = _stk.first(ags).replace(/(\/)$/, "");
    const replacePath = _stk.arraySlice(ags, one);
    const cleanReplacePath = _stk.reduce([], replacePath, function (grand, value) {

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
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isHttpProtocolValid('https://example.com')
 *=> true
 */
function isHttpProtocolValid (host) {

    return (/^(https|http):\/\//g).test(host) && isUrlValidFormat(host);

}

/**
 * Check url has valid ws/wss websocket protocol
 *
 * @since 1.1.0
 * @category Boolean
 * @param {string} host Passing the completet domain url
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
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isHttps('https://example.com')
 *=> true
 */
function isHttps (host) {

    return (/^(https):\/\/\b/g).test(host) && isUrlValidFormat(host);

}

/**
 * Check the domain details and verify it library is access via browser or nodejs
 *
 * @since 1.1.0
 * @category Collection
 * @param {string} host Passing the completet domain url
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

    const dataReference = {
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

        const details = urlDetails(host);

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
 * @param {string} ext Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlExtIsValid('https://example.com/example.js','js')
 *=> true
 */
function isUrlExtValid (host, ext) {

    const regularExpression = new RegExp("(."+ext+")[?#]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&]{0,}$", "g");

    return isHttpProtocolValid(host) &&regularExpression.test(host);

}

urs.getHostDetails=getHostDetails;
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

})(typeof window !== "undefined" ? window : this);