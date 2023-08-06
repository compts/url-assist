const {configQueryString} = require("./lib/config");
const {parseStringConvert} = require("./lib/queryString");
const {getDomainDetails, isUrlValidFormatVerifier} = require("./lib/domain");
const {parseObjectConvert, qsParseCallback, parseObjectSchema} = require("./lib/queryObject");
const {delimiter, each, first, varExtend, getTypeof, indexOfNotExist} = require("structkit");
const url = require('url');

const one =1;

/**
 * Check url is valid format
 *
 * @since 1.0.0
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
function joinUrlPath (...ags) {

    const replaceDomain = first(ags).replace(/(\/)$/, "");
    const replacePath = delimiter(ags, one);
    const cleanReplacePath = [];

    each(replacePath, function (key, value) {

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
 * @since 1.0.0
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
 * @since 1.0.0
 * @category Seq
 * @param {string} host Passing the completet domain url
 * @returns {any} Returns the object details.
 * @example
 *
 * getHostDetails('https://example.com')
 *=> {
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

        const urlAjax = document.createElement('a');

        urlAjax.setAttribute('href', host);

        return {
            "domainDetails": getDomainDetails(urlAjax.hostname),
            "hash": urlAjax.hash.replace(/^#/, ""),
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

        const urlHttp = new url.URL(host);

        return {
            "domainDetails": getDomainDetails(urlHttp.hostname),
            "hash": urlHttp.hash.replace(/^#/, ""),
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
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsStringify({"test": 11,"test2": 11})
 *=> test=1&test2=11
 */
function qsStringify (value, config) {

    if (indexOfNotExist([
        "json",
        "array"
    ], getTypeof(value))) {

        return "";

    }

    const referenceValue = [];
    const defaultConfig = varExtend(configQueryString, config);

    each(value, function (key, val) {

        parseStringConvert(key, val, getTypeof(val), defaultConfig, referenceValue);

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

    if (indexOfNotExist(["string"], getTypeof(value))) {

        return {};

    }

    value = value.trim().replace(/^[?#&]/, '');

    const referenceValue = {};
    const defaultConfig = varExtend(configQueryString, config);
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

    const regularExpression = new RegExp("(."+ext+")[?]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&]{0,}$", "g");

    return regularExpression.test(host);

}

exports.getHostDetails=getHostDetails;
exports.qsStringify=qsStringify;
exports.qsParse=qsParse;
exports.isHttps=isHttps;
exports.isHttpProtocolValid =isHttpProtocolValid;
exports.joinUrlPath =joinUrlPath;
exports.isUrlExtValid =isUrlExtValid;
exports.isWebSocketProtocolValid =isWebSocketProtocolValid;
exports.isUrlValidFormat =isUrlValidFormat;
