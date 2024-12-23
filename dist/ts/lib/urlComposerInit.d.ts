/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.1.0
 * @class UrlComposerInit
 * @param {object} config Passing the completet domain url=
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * UrlComposerInit('https://example.com')
 *=> https://example.com
 */
export function UrlComposerInit(config: object): any;
export class UrlComposerInit {
    /**
     * Compose your url structure in string
     * @category Seq
     * @since 1.1.0
     * @class UrlComposerInit
     * @param {object} config Passing the completet domain url=
     * @name urlCompose
     *
     * @returns {any} Return the boolean.
     * @example
     *
     * UrlComposerInit('https://example.com')
     *=> https://example.com
     */
    constructor(config: object);
    variableProtocol: any;
    variablePort: any;
    variablePath: any;
    variablePathPrefix: string;
    variableDomain: any;
    variableDomainTld: any;
    variableSubdomain: any;
    variableQueryString: any;
    variableHash: any;
    /**
     * Set HTTP protocol
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setProtocol('http')
     *  http://example.com
     */
    setProtocol(data: any): undefined;
    /**
     * Set HTTP hash
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setHash('test')
     *  http://example.com#test
     */
    setHash(data: any): undefined;
    /**
     * Set HTTP port
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setPort(8080)
     * http://example.com:8080#test
     */
    setPort(data: any): undefined;
    /**
     * Set HTTP prefix path
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setPathPrefix('v1')
     * http://example.com:8080/v1#test
     */
    setPathPrefix(data: any): undefined;
    /**
     * Set HTTP path
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setPath('id')
     * http://example.com:8080/v1/id#test
     */
    setPath(data: any): undefined;
    /**
     * Set HTTP domain name
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the undefined.
     * @example
     *
     * setDomain('helloworld')
     * http://helloworld.com:8080/v1/id#test
     */
    setDomain(data: any): undefined;
    /**
     * Set HTTP TLD
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setDomainTld('xyz')
     * http://helloworld.xyz:8080/v1/id#test
     */
    setDomainTld(data: any): undefined;
    /**
     * Set HTTP subdomain
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setSubdomain('www')
     * http://www.helloworld.xyz:8080/v1/id#test
     */
    setSubdomain(data: any): undefined;
    /**
     * Set HTTP query string
     *
     * @since 1.1.0
     * @category environment
     * @param {any} data Passing object to convert string
     * @returns {undefined} Return the boolean.
     * @example
     *
     * setQueryString('a=1')
     * http://www.helloworld.xyz:8080/v1/id?a=1#test
     */
    setQueryString(data: any): undefined;
    /**
     * Get your url structure in string
     *
     * @since 1.1.0
     * @category environment
     * @returns {string} Return the boolean.
     * @example
     *
     * getToString()
     *=> 'www.example.com'
     */
    getToString(): string;
    /**
     * Get your domain only  in string
     *
     * @since 1.2.6
     * @category environment
     * @returns {string} Return the boolean.
     * @example
     *
     * getDomainString()
     *=> 'www.example.com'
     */
    getDomainString(): string;
}
