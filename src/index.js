const {qsStringify} = require("./lib/queryString");
const {UrlComposerInit} = require("./lib/urlComposerInit");
const {PathPatternInit} = require("./lib/pathPatternInit");
const {getDomainDetails, isUrlValidFormatVerifier, urlDetails} = require("./lib/domain");
const {queryEncode, queryDecode} = require("./lib/queryString");
const {qsParse} = require("./lib/queryObject");
const {arraySlice, first, has, isEmpty, reduce, stringLowerCase, varExtend, mergeWithKey, trim} = require("structkit");
const {one} = require("./lib/variable");
const {formatUrlInit} = require("./lib/formatUrlInit");
const {charMap} = require("./lib/slugConfig");


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
 * @param {string} ext Option you want to set in this function
 * @returns {boolean} Return the boolean.
 * @example
 *
 * isUrlExtIsValid('https://example.com/example.js','js')
 *=> true
 */
function isUrlExtValid (host, ext) {

    const regularExpression = new RegExp("(."+ext+")[?#/]{0,1}[\\w\\d\\=\\_\\-\\$\\%\\@\\&\\#]{0,}$", "g");

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

    let strPattern = pattern;

    const varExt = varExtend({
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

        const refCharMap = mergeWithKey(charMap, varExt.dictStrictMap);

        strPattern = reduce("", strPattern.normalize().split(""), function (sums, value) {

            sums+= has(refCharMap, value)
                ?refCharMap[value]
                :value;

            return sums;

        });

    }


    strPattern = strPattern.replace(/[\n\t\r]/g, " ");
    strPattern = trim(strPattern);
    strPattern = strPattern.replace(/([\s])/g, varExt.delimiter);


    if (varExt.lower) {

        strPattern = stringLowerCase(strPattern);

    }
    if (varExt.isStripDomanName) {

        if (isUrlValidFormat(strPattern)) {

            const details = getHostDetails(strPattern);

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

    const varExt = varExtend({
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

exports.getHostDetails=getHostDetails;
exports.formatUrl=formatUrl;
exports.qsStringify=qsStringify;
exports.qsParse=qsParse;
exports.isHttps=isHttps;
exports.isHttpProtocolValid =isHttpProtocolValid;
exports.joinUrlPath =joinUrlPath;
exports.isUrlExtValid =isUrlExtValid;
exports.isWebSocketProtocolValid =isWebSocketProtocolValid;
exports.isUrlValidFormat =isUrlValidFormat;
exports.urlComposer = urlComposer;
exports.urlPattern = urlPattern;
exports.slugify = slugify;
exports.queryEncode = queryEncode;
exports.queryDecode = queryDecode;
