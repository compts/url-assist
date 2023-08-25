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
import { qsStringify } from './lib/queryString';
import { qsParse } from './lib/queryObject';
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
export function isHttps(host: string): boolean;
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
export function isHttpProtocolValid(host: string): boolean;
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
export function joinUrlPath(...ags: any[]): string;
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
export function isUrlExtValid(host: string, ext: string): boolean;
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
export function isWebSocketProtocolValid(host: string): boolean;
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
export function isUrlValidFormat(domain: string): boolean;
/**
 * Compose your url structure in string
 *
 * @since 1.1.0
 * @category environment
 * @param {string} domain Passing the completet domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * data = urlComposer('https://example.com');
 * data.getToString()
 *=> 'https://example.com'
 */
export function urlComposer(domain: string): any;
export { qsStringify, qsParse };
