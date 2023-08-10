/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.1.0
 * @class UrlComposerInit
 * @param {object} config Passing the completet domain url
 * @param {object} defaultConfig Passing the completet domain url
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * urlComposer('https://example.com')
 *=> true
 */
export function UrlComposerInit(config: object, defaultConfig: object): any;
export class UrlComposerInit {
    /**
     * Compose your url structure in string
     * @category Seq
     * @since 1.1.0
     * @class UrlComposerInit
     * @param {object} config Passing the completet domain url
     * @param {object} defaultConfig Passing the completet domain url
     * @name urlCompose
     *
     * @returns {any} Return the boolean.
     * @example
     *
     * urlComposer('https://example.com')
     *=> true
     */
    constructor(config: object, defaultConfig: object);
    variableProtocol: any;
    variablePort: any;
    variablePath: any;
    variableDomain: any;
    variableDomainTld: any;
    variableDomainSubdomain: any;
    setProtocol(data: any): void;
    setPort(data: any): void;
    setPath(data: any): void;
    setDomain(data: any): void;
    setDomainTld(data: any): void;
    setDomainSubdomain(data: any): void;
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
