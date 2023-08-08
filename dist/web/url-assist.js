(function(global){
global.urs={}
configQueryString = {

    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&"
};

var zero =0;

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
var parseStringConvert=function (key, value, type, config, reference) {

    if (_stk.indexOf([
        "json",
        "array"
    ], type) >=zero) {

        _stk.each(value, function (ky, vl) {

            var keyVal = _stk.indexOf([
                "number",
                "array"
            ], type) >=zero
                ?config.arrayFormat
                :"["+ky+"]";

            parseStringConvert(key+keyVal, vl, _stk.getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+value);

    }

};

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.1.0
 * @class UrlComposerInit
 * @param {object} config Passing the completet domain url
 * @param {object} defaultConfig Passing the completet domain url
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * urlComposer('https://example.com')
 *=> true
 */
function UrlComposerInit (config, defaultConfig) {

    this.variableProtocol = _stk.isEmpty(config.protocol)
        ? defaultConfig.protocol
        :config.protocol;
    this.variablePort = config.port;
    this.variablePath = config.pathname;
    this.variableDomain = config.domainDetails.domain;
    this.variableDomainTld = config.domainDetails.tld;
    this.variableDomainSubdomain = config.domainDetails.subdomain;

}

UrlComposerInit.prototype.setProtocol = function (data) {

    this.variableProtocol = data;

};
UrlComposerInit.prototype.setPort = function (data) {

    this.variablePort = data;

};
UrlComposerInit.prototype.setPath = function (data) {

    this.variablePath = data;

};
UrlComposerInit.prototype.setDomain = function (data) {

    this.variableDomain = data;

};
UrlComposerInit.prototype.setDomainTld = function (data) {

    this.variableDomainTld = data;

};
UrlComposerInit.prototype.setDomainSubdomain = function (data) {

    this.variableDomainSubdomain = data;

};

/**
 * Compose your url structure in string
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

    var urlFormat = '<!- protocol !>://<!- subdomain !><!- domain !>.<!- tld !><!- port !><!- path !>';

    return _stk.templateValue(urlFormat, {
        "domain": this.variableDomain,
        "path": _stk.isEmpty(this.variablePath)
            ? ''
            : '/'+this.variablePath
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
        "port": _stk.isEmpty(this.variablePort)
            ? ''
            : ':'+this.variablePort,
        "protocol": this.variableProtocol,
        "subdomain": _stk.isEmpty(this.variableDomainSubdomain)
            ? ''
            :this.variableDomainSubdomain+'.',
        "tld": this.variableDomainTld
    });

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
var getDomain =function (domain) {

    var one =1;

    var referenceDomain = domain.replace(/\b([\w\\+]{1,}:\/{2})\b/g, "");

    var splitDomain = referenceDomain.split("/");

    var pathValueDetails = _stk.delimiter(splitDomain, one).join("/");

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
        "url": _stk.first(splitDomain)
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
 *      "domain": "",
 *      "domainWithTld": "",
 *      "subdomain": "",
 *      "tld": ""
 *  }
 */
var getDomainDetails=function (domain) {

    var one =1;
    var two =2;
    var three = 3;

    var domainDetails = {
        "domain": "",
        "domainWithTld": "",
        "subdomain": "",
        "tld": ""
    };

    var domainSplit = domain.split(".");
    var getTLD = _stk.last(domainSplit).split(":");

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

    if (_stk.count(domainSplit) === three) {

        domainDetails = {
            "domain": domainSplit[one],
            "domainWithTld": domainSplit[one]+"."+_stk.last(domainSplit),
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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
var isUrlValidFormatVerifier=function (domain) {

    var httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    var validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    var one =1;
    var two =2;
    var theee =3;
    var four = 63;

    if (httpRegExp.test(domain)) {

        var cleanUrl = getDomain(domain).url.replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");
        var cleanUrlSplit = cleanUrl.split(".");

        if (_stk.count(cleanUrlSplit) === two || _stk.count(cleanUrlSplit) === theee) {

            var getTLD = _stk.count(_stk.first(_stk.last(cleanUrlSplit).split("/")).split(""));

            if (getTLD > one && getTLD <= four) {

                if (_stk.count(cleanUrlSplit) === two) {

                    return validDomainRegExp.test(_stk.first(cleanUrlSplit));

                }

                if (_stk.count(cleanUrlSplit) === theee) {

                    var regSubDomain =validDomainRegExp.test(_stk.first(cleanUrlSplit));
                    var regDomain = (/^([\w\d-]{1,})$/g).test(cleanUrlSplit[one].toString());

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

    var zero =0;
    var one =1;
    var two =2;

    domain.replace(/\b([\w\\+]{1,}):\/\/\b/g, function (wh, s1) {

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

        dataReference.hostname = _stk.delimiter(splitPort, zero, _stk.count(splitPort) - two).join(":");

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

var zero =0;
var one =1;

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
var parseObjectConvert = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    var filterKeyList = _stk.filter(keyList, function (ke, value) {

        return _stk.isEmpty(value)===false;

    });

    if (_stk.getTypeof(referenceValue[keyOnly]) === "string") {

        referenceValue[keyOnly] = getValueOnly;

    }

    if (_stk.getTypeof(referenceValue[keyOnly]) === "array") {

        var firstKey = _stk.first(filterKeyList);
        var referenceData = {};

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
var objectMultipleKey = function (referenceValue, keyList, getValueOnly) {

    var keyListClone = _stk.clone(keyList);

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
var parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (_stk.has(referenceValue, keyOnly) ===false) {

        if (_stk.isEmpty(keyList)) {

            if (_stk.isEmpty(keyOnly) ===false) {

                referenceValue[keyOnly]="";

            }

        } else {

            var firstKey = _stk.first(keyList);

            if (_stk.isEmpty(firstKey)) {

                referenceValue[keyOnly] = [];

            } else {

                referenceValue[keyOnly] = {};

            }

            if (_stk.isEmpty(keyList) ===false) {

                var keyListClone = _stk.clone(keyList);

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
var qsParseCallback = function (defaultConfig, defaultSplit, callbacks) {

    _stk.each(defaultSplit, function (key, val) {

        var getKeyAndValue = val.split(defaultConfig.equalSeparator);
        var getKeyOnly = _stk.first(getKeyAndValue);
        var getValueOnly = _stk.delimiter(getKeyAndValue, one).join(defaultConfig.equalSeparator);

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

            callbacks(keyOnly, keyList, getValueOnly);

        }

    });

};

var one =1;

/**
 * Compose your url structure in string
 *
 * @since 1.1.0
 * @category environment
 * @param {string} domain Passing the completet domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * data = urlComposer('https://example.com')
 * data.getToString()
 *=> 'https://example.com'
 */
function urlComposer (domain) {

    var defaultConfig = {
        "protocol": "https"
    };

    return new UrlComposerInit(getHostDetails(domain), defaultConfig);

}

/**
 * Check url is valid format
 *
 * @since 1.1.0
 * @category environment
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
 * @category environment
 * @param {...any} ags The Domain url
 * @returns {string} Return the boolean.
 * @example
 *
 * joinUrlPath('https://example.com','test')
 *=> https://example.com/test
 */
function joinUrlPath () {

    var ags=arguments;

    var replaceDomain = _stk.first(ags).replace(/(\/)$/, "");
    var replacePath = _stk.delimiter(ags, one);
    var cleanReplacePath = [];

    _stk.each(replacePath, function (key, value) {

        cleanReplacePath.push(value.replace(/^(\/)/, ""));

    });

    return replaceDomain+"/"+cleanReplacePath.join("/");

}

/**
 * Check url has valid https/http protocol
 *
 * @since 1.0.0
 * @category environment
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isHttpProtocolValid('https://example.com')
 *=> true
 */
function isHttpProtocolValid (host) {

    return (/^(https|http):\/\//g).test(host);

}

/**
 * Check url has valid ws/wss websocket protocol
 *
 * @since 1.1.0
 * @category environment
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
 * @category environment
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isHttps('https://example.com')
 *=> true
 */
function isHttps (host) {

    return (/^(https):\/\/\b/g).test(host);

}

/**
 * Check the domain details and verify it library is access via browser or nodejs
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} host Passing the completet domain url
 * @returns {any} Returns the object details.
 * @example
 *
 * getHostDetails('https://example.com')
 * => {
 *          "domainDetails": {
 *              "domain": "example",
 *              "domainWithTld": "example.com",
 *               "subdomain": "",
 *               "tld": "com"
 *           },
 *          "hostArgument": host,
 *          "hostname": 'example.com',
 *          "pathname": /,
 *          "port": '',
 *          "hash": ''
 *          "user": ''
 *          "protocol": https,
 *          "search": ''
 *     }
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
 * Query String stringify
 *
 * @since 1.0.0
 * @category Seq
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

    _stk.each(value, function (key, val) {

        parseStringConvert(key, val, _stk.getTypeof(val), defaultConfig, referenceValue);

    });

    return referenceValue.join(defaultConfig.newLineSeparator);

}

/**
 * Query String object
 *
 * @since 1.0.0
 * @category Seq
 * @param {string} value Passing string to convert to object
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsParse(test=1&test2=11)
 *=> {"test": 11,"test2": 11}
 */
function qsParse (value, config) {

    if (_stk.indexOfNotExist(["string"], _stk.getTypeof(value))) {

        return {};

    }

    value = value.trim().replace(/^[?#&]/, '');

    var referenceValue = {};
    var defaultConfig = _stk.varExtend(configQueryString, config);
    var defaultSplit = value.split(defaultConfig.newLineSeparator);

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
 * Check if url extenstion,is valid
 *
 * @since 1.0.2
 * @category environment
 * @param {string} host Passing the completet domain url
 * @param {string} ext Passing the completet domain url
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlExtIsValid('https://example.com/example.js','js')
 *=> true
 */
function isUrlExtValid (host, ext) {

    var regularExpression = new RegExp("(."+ext+")[?]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&]{0,}$", "g");

    return regularExpression.test(host);

}

urs.getHostDetails=getHostDetails
urs.qsStringify=qsStringify
urs.qsParse=qsParse
urs.isHttps=isHttps
urs.isHttpProtocolValid=isHttpProtocolValid
urs.joinUrlPath=joinUrlPath
urs.isUrlExtValid=isUrlExtValid
urs.isWebSocketProtocolValid=isWebSocketProtocolValid
urs.isUrlValidFormat=isUrlValidFormat
urs.urlComposer=urlComposer

})(typeof window !== "undefined" ? window : this);