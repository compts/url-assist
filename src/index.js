const {configQueryString} = require("./lib/config");
const {parseStringConvert} = require("./lib/queryString");
const {parseObjectConvert, parseObjectSchema} = require("./lib/queryObject");
const {delimiter, each, first, isEmpty, varExtend, getTypeof, indexOf} = require("structkit");
const url = require('url');

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

    const replaceDomain = domain.replace(/(\/)$/, "");
    const replacePath = path.replace(/^(\/)/, "");

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

        const urlAjax = document.createElement('a');

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

        const urlHttp = new url.URL(host);

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

    if (indexOf([
        "json",
        "array"
    ], getTypeof(value)) ===-1) {

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
 * @param {any} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsParse(test=1&test2=11)
 * // => {"test": 11,"test2": 11}
 */
function qsParse (value, config) {

    if (indexOf(["string"], getTypeof(value)) === -1) {

        return {};

    }

    value = value.trim().replace(/^[?#&]/, '');

    const referenceValue = {};
    const defaultConfig = varExtend(configQueryString, config);
    const defaultSplit = value.split(defaultConfig.newLineSeparator);

    // https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    // Schema for data
    each(defaultSplit, function (key, val) {

        const getKeyAndValue = val.split(defaultConfig.equalSeparator);
        const getKeyOnly = first(getKeyAndValue).value;
        const getValueOnly = delimiter(getKeyAndValue, 1).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > 0) {

            let keyOnly = "";
            const keyList = [];

            const keySubData = getKeyOnly.replace(/^([\w\-_\d]{1,})\[/g, function (whole, sub1) {

                keyOnly=sub1;

                return "[";

            });

            if (isEmpty(keyOnly)) {

                keyOnly=getKeyOnly;

            }

            keySubData.replace(/(\[[\s\w\-_\d]{0,}\])/g, function (whole, sub1) {

                keyList.push(sub1.replace(/[\[\]]/g, ""));

            });

            parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

        }


    });

    // Value for its data
    each(defaultSplit, function (key, val) {

        const getKeyAndValue = val.split(defaultConfig.equalSeparator);
        const getKeyOnly = first(getKeyAndValue).value;
        const getValueOnly = delimiter(getKeyAndValue, 1).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > 0) {

            let keyOnly = "";
            const keyList = [];

            const keySubData = getKeyOnly.replace(/^([\w\-_\d]{1,})\[/g, function (whole, sub1) {

                keyOnly=sub1;

                return "[";

            });

            if (isEmpty(keyOnly)) {

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
exports.getHostDetails=getHostDetails;
exports.qsStringify=qsStringify;
exports.qsParse=qsParse;
exports.isHttps=isHttps;
exports.isHttpProtocolValid =isHttpProtocolValid;
exports.joinUrlPath =joinUrlPath;

