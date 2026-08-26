import { qsStringify } from './lib/queryString.mjs';
import { queryEncode, queryDecode } from './lib/format.mjs';
import { qsParse } from './lib/queryObject.mjs';
import { qoute, unQoute } from './lib/qoutes.mjs';
import phpSerialize from './lib/phpSerialize.mjs';
import phpUnSerialize from './lib/phpUnSerialize.mjs';
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
declare function urlPattern(pattern: string | object, path: string): any;
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
declare function urlComposer(domain: string): any;
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
declare function isUrlValidFormat(domain: string, config?: object | undefined): boolean;
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
declare function joinUrlPath(...ags: any[]): string;
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
declare function isHttpProtocolValid(host: string, config?: object | undefined): boolean;
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
declare function isWSProtocolValid(host: string, config?: object | undefined): boolean;
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
declare function isHttps(host: string, config?: object | undefined): boolean;
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
declare function getHostDetails(host: string): any;
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
declare function isUrlExtValid(host: string, ext: string): boolean;
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
declare function charsetToEn(words: string, ext?: any | undefined): string;
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
declare function slugify(pattern: string, ext?: any | undefined): string;
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
declare function formatUrl(pattern: string, ext?: any | undefined): string;
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
declare function encodeURI(data: string): string;
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
declare function decodeURI(data: string): string;
export { getHostDetails, formatUrl, qsStringify, qsParse, isHttps, isHttpProtocolValid, joinUrlPath, isUrlExtValid, isWSProtocolValid, isUrlValidFormat, urlComposer, urlPattern, slugify, queryEncode, queryDecode, phpSerialize, phpUnSerialize, qoute, unQoute, charsetToEn, encodeURI, decodeURI };
