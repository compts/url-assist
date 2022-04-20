
import {configQueryString} from './lib/config';

import {parseStringConvert} from './lib/queryString';

import {parseObjectConvert, parseObjectSchema} from './lib/queryObject';

import {delimiter, each, first, isEmpty, varExtend, getTypeof, indexOf} from 'structkit';

import url from 'url';

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} host The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
function getHostDetails (host) {

    if (typeof document !== "undefined") {

        const urlAjax = document.createElement('a');

        urlAjax.setAttribute('href', host);

        return {
            "hostArgument": host,
            //  'example.com'
            "hostname": urlAjax.hostname,
            //  '/blog/foo/bar'
            "pathname": urlAjax.pathname,
            //  12345
            "port": urlAjax.port,
            "protocol": urlAjax.protocol.replace(/[:]/g, ""),
            //  '?startIndex=1&pageSize=10'
            "search": urlAjax.search,
            "type": "ajax"
        };

    }

    if (typeof process !== "undefined") {

        const urlHttp = new url.URL(host);

        return {
            "hostArgument": host,
            //  'example.com'
            "hostname": urlHttp.hostname,
            //  '/blog/foo/bar'
            "pathname": urlHttp.pathname,
            //  12345
            "port": urlHttp.port,
            "protocol": urlHttp.protocol.replace(/[:]/g, ""),
            //  '?startIndex=1&pageSize=10'
            "search": urlHttp.search,
            "type": "http"
        };

    }

    return {
        "hostArgument": host,
        //  'example.com'
        "hostname": "",
        //  '/blog/foo/bar'
        "pathname": "",
        //  12345
        "port": "80",
        "protocol": "",
        //  '?startIndex=1&pageSize=10'
        "search": "",
        "type": "invalid"
    };

}

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @param {any} config The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
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
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} value The first number in an addition.
 * @param {any} config The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
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

export {getHostDetails,qsStringify,qsParse};
