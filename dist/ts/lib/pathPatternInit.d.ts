/**
 * Details of your path
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {object} pattern Passing the completet domain url=
 * @param {object} path Passing the completet domain url=
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
export function PathPatternInit(pattern: object, path: object): any;
export class PathPatternInit {
    /**
     * Details of your path
     * @category Seq
     * @since 1.2.1
     * @class UrlComposerInit
     * @param {object} pattern Passing the completet domain url=
     * @param {object} path Passing the completet domain url=
     * @name urlCompose
     *
     * @returns {any} Return the boolean.
     * @example
     *
     * new PathPatternInit('https://example.com')
     *=> true
     */
    constructor(pattern: object, path: object);
    pattern: any;
    path: any;
    /**
     * Check if pattern and path is match
     *
     * @since 1.2.1
     * @category environment
     * @returns {boolean} Return the boolean.
     * @example
     *
     * urlPattern(":id", "1").isValid()
     *=> true
     */
    isValid(): boolean;
    /**
     * Check if pattern and path is match
     *
     * @since 1.2.1
     * @category environment
     * @returns {any} Return the object.
     * @example
     *
     * urlPattern(":id", "1").getParam()
     *=> {"id": '1'}
     */
    getParam(): any;
}
