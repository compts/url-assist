/**
 * Get Domain Details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @returns {any} Returns return object details of domain.
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
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns boolean type if url is valid format.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
export function isUrlValidFormatVerifier(domain: string, config: object | null): any;
/**
 * Get domain details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect
 * @returns {any} Returns return object details of domain.
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
