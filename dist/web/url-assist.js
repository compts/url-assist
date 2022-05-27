(function(global){
global.urs={}
configQueryString = {

    "arrayFormat": "[]",
    "equalSeparator": "=",
    "newLineSeparator": "&"
};

/**
 * Is Exact
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
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
var parseStringConvert=function (key, value, type, config, reference) {

    if (_stk.indexOf([
        "json",
        "array"
    ], type) >=0) {

        _stk.each(value, function (ky, vl) {

            var keyVal = _stk.indexOf([
                "number",
                "array"
            ], type) >=0
                ?config.arrayFormat
                :"["+ky+"]";

            parseStringConvert(key+keyVal, vl, _stk.getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+value);

    }

};

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue The first number in an addition.
 * @param {any} defaultConfig The first number in an addition.
 * @param {any} keyOnly The first number in an addition.
 * @param {any} keyList The first number in an addition.
 * @param {any} getValueOnly The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
var parseObjectConvert = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (_stk.getTypeof(referenceValue[keyOnly]) === "string") {

        referenceValue[keyOnly] = getValueOnly;

    }

    if (_stk.getTypeof(referenceValue[keyOnly]) === "array") {

        referenceValue[keyOnly].push(getValueOnly);

    }

    if (_stk.getTypeof(referenceValue[keyOnly]) === "json") {

        var firstKey = _stk.first(keyList).value;

        referenceValue[keyOnly][firstKey]=getValueOnly;

    }

    if (_stk.isEmpty(keyList)) {

        console.log(keyList, "firstKey");

    }

}

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue The first number in an addition.
 * @param {any} defaultConfig The first number in an addition.
 * @param {any} keyOnly The first number in an addition.
 * @param {any} keyList The first number in an addition.
 * @param {any} getValueOnly The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
var parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    console.log(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly,"@@@");
    if (_stk.has(referenceValue, keyOnly) ===false) {

        if (_stk.isEmpty(keyList)) {

            referenceValue[keyOnly]="";

        } else {

            var firstKey = _stk.first(keyList).value;

            if (_stk.isEmpty(firstKey)) {

                referenceValue[keyOnly] = [];

            } else {

                referenceValue[keyOnly] = {};

            }
            keyList.shift();
            if (_stk.isEmpty(keyList) ===false) {

                parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

            }

        }

    } else {

        if (_stk.getTypeof(referenceValue[keyOnly]) === "string") {

            referenceValue[keyOnly] = [];

        }

    }

};

/**
 * To join the domain and path
 *
 * @since 1.0.0
 * @category environment
 * @param {string} domain The Domain url
 * @param {string} path The Url path
 * @returns {string} Returns the total.
 * @example
 *
 * joinUrlPath('https://example.com','test')
 * // => https://example.com/test
 */
function joinUrlPath (domain, path) {

    var replaceDomain = domain.replace(/(\/)$/, "");
    var replacePath = path.replace(/^(\/)/, "");

    return replaceDomain+"/"+replacePath;

}

/**
 * Check url has valid https/http protocol
 *
 * @since 1.0.0
 * @category environment
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Returns the total.
 * @example
 *
 * isHttpProtocolValid('https://example.com')
 * // => true
 */
function isHttpProtocolValid (host) {

    return (/^(https|http):\/\//g).test(host);

}

/**
 * Check if url is valid https
 *
 * @since 1.0.0
 * @category environment
 * @param {string} host Passing the completet domain url
 * @returns {boolean} Returns the total.
 * @example
 *
 * isHttps('https://example.com')
 * // => true
 */
function isHttps (host) {

    return (/^(https)$/g).test(host);

}

/**
 * Check the domain details and verify it library is access via browser or nodejs
 *
 * @since 1.0.0
 * @category Seq
 * @param {string} host Passing the completet domain url
 * @returns {any} Returns the total.
 * @example
 *
 * getHostDetails('https://example.com')
 * // => {
 *          "hostArgument": host,
 *          "hostname": 'example.com',
 *          "pathname": /,
 *          "port": 43,
 *          "protocol": https,
 *          "search": '',
 *          "type": "ajax"
 *     }
 */
function getHostDetails (host) {

    if (typeof document !== "undefined") {

        var urlAjax = document.createElement('a');

        urlAjax.setAttribute('href', host);

        return {
            "hostArgument": host,
            "hostname": urlAjax.hostname,
            "pathname": urlAjax.pathname,
            "port": urlAjax.port,
            "protocol": urlAjax.protocol.replace(/[:]/g, ""),
            "search": urlAjax.search,
            "type": "ajax"
        };

    }

    if (typeof process !== "undefined") {

        var urlHttp = new url.URL(host);

        return {
            "hostArgument": host,
            "hostname": urlHttp.hostname,
            "pathname": urlHttp.pathname,
            "port": urlHttp.port,
            "protocol": urlHttp.protocol.replace(/[:]/g, ""),
            "search": urlHttp.search,
            "type": "http"
        };

    }

    return {
        "hostArgument": host,
        "hostname": "",
        "pathname": "",
        "port": "80",
        "protocol": "",
        "search": "",
        "type": "invalid"
    };

}

/**
 * Query String stringify
 *
 * @since 1.0.0
 * @category Seq
 * @param {any} value Passing object to convert string
 * @param {any} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsStringify({"test": 11,"test2": 11})
 * // => test=1&test2=11
 */
function qsStringify (value, config) {

    if (_stk.indexOf([
        "json",
        "array"
    ], _stk.getTypeof(value)) ===-1) {

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
 * @param {any} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsParse(test=1&test2=11)
 * // => {"test": 11,"test2": 11}
 */
function qsParse (value, config) {

    if (_stk.indexOf(["string"], _stk.getTypeof(value)) === -1) {

        return {};

    }

    value = value.trim().replace(/^[?#&]/, '');

    var referenceValue = {};
    var defaultConfig = _stk.varExtend(configQueryString, config);
    var defaultSplit = value.split(defaultConfig.newLineSeparator);

    // https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    // Schema for data
    _stk.each(defaultSplit, function (key, val) {

        var getKeyAndValue = val.split(defaultConfig.equalSeparator);
        var getKeyOnly = _stk.first(getKeyAndValue).value;
        var getValueOnly = _stk.delimiter(getKeyAndValue, 1).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > 0) {

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

                keyList.push(sub1.replace(/[\[\]]/g, ""));

            });

            parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

        }

    });

    // Value for its data
    _stk.each(defaultSplit, function (key, val) {

        var getKeyAndValue = val.split(defaultConfig.equalSeparator);
        var getKeyOnly = _stk.first(getKeyAndValue).value;
        var getValueOnly = _stk.delimiter(getKeyAndValue, 1).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > 0) {

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

                keyList.push(sub1.replace(/[\[\]]/g, ""));

            });

            parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

        }

    });

    return referenceValue;

}

urs.getHostDetails=getHostDetails
urs.qsStringify=qsStringify
urs.qsParse=qsParse
urs.isHttps=isHttps
urs.isHttpProtocolValid=isHttpProtocolValid
urs.joinUrlPath=joinUrlPath

})(typeof window !== "undefined" ? window : this);