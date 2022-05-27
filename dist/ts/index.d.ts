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
export function getHostDetails(host: string): any;
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
export function qsStringify(value: any, config: any): any;
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
export function qsParse(value: string, config: any): any;
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
export function isHttps(host: string): boolean;
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
export function isHttpProtocolValid(host: string): boolean;
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
export function joinUrlPath(domain: string, path: string): string;
