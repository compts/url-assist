/**
 * Url qoute for safe url or domain
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the quoted uri.
 * @example
 *
 * qoute("?see=asda asd asd ()")
 * // =>  %3Fsee%3Dasda%20asd%20asd%20()
 *
 */
declare function qoute(data: string, config: object | null): any;
/**
 * Unquote a quoted uri
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the unquoted uri.
 * @example
 *
 * unQoute("%3Fsee%3Dasda%20asd%20asd%20%28%29")
 * // =>  ?see=asda asd asd ()
 *
 */
declare function unQoute(data: string, config: object | null): any;
export { qoute, unQoute };
