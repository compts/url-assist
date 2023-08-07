const {varExtend} = require("structkit");

/**
 * Compose your url structure in string
 *
 * @since 1.1.0
 * @category environment
 * @param {object} config Passing the completet domain url
 * @param {object} defaultConfig Passing the completet domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * urlComposer('https://example.com')
 *=> true
 */
function UrlComposerInit (config, defaultConfig) {

    this.config = varExtend(config, defaultConfig);

}

exports.UrlComposerInit = UrlComposerInit;
