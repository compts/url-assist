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
export function getHostDetails(host: string): any;
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
export function formatUrl(pattern: string, ext?: any | undefined): string;
import { qsStringify } from './lib/queryString.js';
import { qsParse } from './lib/queryObject.js';
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
export function isHttps(host: string, config?: object | undefined): boolean;
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
export function isHttpProtocolValid(host: string, config?: object | undefined): boolean;
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
export function joinUrlPath(...ags: any[]): string;
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
export function isUrlExtValid(host: string, ext: string): boolean;
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
export function isWebSocketProtocolValid(host: string): boolean;
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
export function isUrlValidFormat(domain: string, config?: object | undefined): boolean;
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
export function urlComposer(domain: string): any;
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
export function urlPattern(pattern: string | object, path: string): any;
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
export function slugify(pattern: string, ext?: any | undefined): string;
export { qsStringify, qsParse, queryEncode, queryDecode };
