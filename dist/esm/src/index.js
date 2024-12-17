import {qsStringify} from './lib/queryString.js';

import {UrlComposerInit} from './lib/urlComposerInit.js';

import {PathPatternInit} from './lib/pathPatternInit.js';

import {getDomainDetails, isUrlValidFormatVerifier, urlDetails} from './lib/domain.js';

import {qsParse} from './lib/queryObject.js';

import {arraySlice, first, has, isEmpty, reduce, getTypeof, stringLowerCase, varExtend, mergeWithKey} from 'structkit';

import {one} from './lib/variable.js';

import {formatUrlInit} from './lib/formatUrlInit.js';

import {charMap} from './lib/slugConfig.js';

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
 * @param {object=} config Passing the completet domain url
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
 * @returns {string} Return the boolean.
 * @example
 *
 * joinUrlPath('https://example.com','test')
 *=> https://example.com/test
 */
function joinUrlPath (...ags) {

    const replaceDomain = first(ags).replace(/(\/)$/, "");
    const replacePath = arraySlice(ags, one);
    const cleanReplacePath = reduce([], replacePath, function (grand, value) {

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
 * @param {object=} config Passing the completet domain url
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
 * @param {object=} config Passing the completet domain url
 * @returns {boolean} Return the boolean.
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

    if (isEmpty(host) === false) {

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

    const regularExpression = new RegExp("(."+ext+")[?#/]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&]{0,}$", "g");

    return isHttpProtocolValid(host) &&regularExpression.test(host);

}

/**
 * Create url slug from words
 *
 * @since 1.2.6
 * @category string
 * @param {string} pattern Passing the completet domain url
 * @param {any=} ext Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * slugify('hello world')
 *=> hello-world
 */
function slugify (pattern, ext) {

    let strPattern = pattern;

    const varExt = varExtend({
        "delimiter": "-",
        "dictStrictMap": {},
        "lower": true,
        "remove": null,
        "replaceStrictMap": false,
        "strict": false
    }, ext);

    if (varExt.replaceStrictMap) {

        const refCharMap = mergeWithKey(charMap, varExt.dictStrictMap);

        strPattern = reduce("", strPattern.split(""), function (sums, value) {

            sums+= has(refCharMap, value)
                ?refCharMap[value]
                :value;

            return sums;

        });

    }
    if (varExt.strict) {

        strPattern = strPattern.replace(/[\s]{2,}/g, " ");
        strPattern = strPattern.replace(/[^\w\d\s]/g, "");

    }

    strPattern = strPattern.replace(/[\n\t\r]/g, " ");
    strPattern = strPattern.replace(/([\s])/g, varExt.delimiter);

    if (varExt.lower) {

        strPattern = stringLowerCase(strPattern);

    }

    if (getTypeof(varExt.remove)==="regexp") {

        strPattern = strPattern.replace(varExt.remove, "");

    }

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

    const varExt = varExtend({
        "slash": true,
        "stripHash": false
    }, ext);

    if ((/\s/g).test(pattern)) {

        throw new Error('The Url must remove the space');

    }
    if ((/[^\w\d\-_#@?/:.=%[\]+&]/g).test(pattern)) {

        throw new Error('The Url must remove special charaster');

    }

    return formatUrlInit(pattern, varExt);

}

export {getHostDetails,formatUrl,qsStringify,qsParse,isHttps,isHttpProtocolValid,joinUrlPath,isUrlExtValid,isWebSocketProtocolValid,isUrlValidFormat,urlComposer,urlPattern,slugify};
