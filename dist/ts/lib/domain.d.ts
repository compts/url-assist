/**
 * Get Domain Details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getDomainDetails("example.com")
 * // =>  domainDetails = {
 *      "domain": "example",
 *      "domainWithTld": "",
 *      "subdomain": "",
 *      "tld": "com"
 *  }
 */
export function getDomainDetails(domain: string): any;
/**
 * Check if domain is valid
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
export function isUrlValidFormatVerifier(domain: string): any;
/**
 * Get domain details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * urlDetails("example.com")
 * // =>  dataReference = {
 *      "hash": "",
 *      "hostname": "",
 *      "hostnamePort": "",
 *      "pathname": "",
 *       "port": "",
 *      "protocol": "",
 *      "search": ""
 *  }
 *
 */
export function urlDetails(domain: string): any;
