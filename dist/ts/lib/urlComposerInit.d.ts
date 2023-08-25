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
 * urlComposer('https://example.com')
 *=> true
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
     * urlComposer('https://example.com')
     *=> true
     */
    constructor(config: object);
    variableProtocol: any;
    variablePort: any;
    variablePath: any;
    variableDomain: any;
    variableDomainTld: any;
    variableSubdomain: any;
    variableQueryString: any;
    variableHash: any;
    setProtocol(data: any): void;
    setHash(data: any): void;
    setPort(data: any): void;
    setPath(data: any): void;
    setDomain(data: any): void;
    setDomainTld(data: any): void;
    setSubdomain(data: any): void;
    setQueryString(data: any): void;
    /**
     * Compose your url structure in string
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
}
