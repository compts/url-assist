const {templateValue, isEmpty} = require("structkit");
const {qsParse} = require("./queryObject");
const {qsStringify} = require("./queryString");

/**
 * Remove slash first and last
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {string} data Passing the completet domain url
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * urlComposer('https://example.com')
 *=> true
 */
function removeSlash (data) {

    return data.replace(/^(\/)/, "").replace(/(\/)$/, "");

}

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
function UrlComposerInit (config, defaultConfig) {

    this.variableProtocol = isEmpty(config.protocol)
        ? defaultConfig.protocol
        :config.protocol;
    this.variablePort = config.port;
    this.variablePath = config.pathname;
    this.variableDomain = config.domainDetails.domain;
    this.variableDomainTld = config.domainDetails.tld;
    this.variableSubdomain = config.domainDetails.subdomain;
    this.variableQueryString = qsParse(config.search);

}


UrlComposerInit.prototype.setProtocol = function (data) {

    this.variableProtocol = data;

};
UrlComposerInit.prototype.setPort = function (data) {

    this.variablePort = data;


};
UrlComposerInit.prototype.setPath = function (data) {

    this.variablePath = data;


};
UrlComposerInit.prototype.setDomain = function (data) {

    this.variableDomain = data;


};
UrlComposerInit.prototype.setDomainTld = function (data) {

    this.variableDomainTld = data;


};
UrlComposerInit.prototype.setSubdomain = function (data) {

    this.variableSubdomain = data;

};

UrlComposerInit.prototype.setQueryString = function (data) {

    this.variableQueryString = data;

};

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
UrlComposerInit.prototype.getToString = function () {

    const urlFormat = '<!- protocol !>://<!- subdomain !><!- domain !>.<!- tld !><!- port !><!- path !><!- queryString !>';

    return templateValue(urlFormat, {
        "domain": this.variableDomain,
        "path": isEmpty(this.variablePath)
            ? ''
            : '/'+removeSlash(this.variablePath)
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
        "port": isEmpty(this.variablePort)
            ? ''
            : ':'+this.variablePort,
        "protocol": this.variableProtocol,
        "queryString": isEmpty(this.variableQueryString)
            ? ''
            : '?'+qsStringify(this.variableQueryString),
        "subdomain": isEmpty(this.variableSubdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": this.variableDomainTld
    });

};

exports.UrlComposerInit = UrlComposerInit;
