/**
 * Query String encode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
declare function queryEncode(query: string): string;
/**
 * Query String decode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
declare function queryDecode(query: string): string;
export { queryEncode, queryDecode };
