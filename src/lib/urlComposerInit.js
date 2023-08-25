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
 * removeSlash('/example')
 *=> example
 */
function removeSlash (data) {

    return data.replace(/^(\/)/, "").replace(/(\/)$/, "");

}

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
function UrlComposerInit (config) {

    this.variableProtocol = config.protocol;
    this.variablePort = config.port;
    this.variablePath = config.pathname;
    this.variableDomain = config.domainDetails.domain;
    this.variableDomainTld = config.domainDetails.tld;
    this.variableSubdomain = config.domainDetails.subdomain;
    this.variableQueryString = qsParse(config.search);
    this.variableHash = config.hash;

}


UrlComposerInit.prototype.setProtocol = function (data) {

    this.variableProtocol = data;

};
UrlComposerInit.prototype.setHash = function (data) {

    this.variableHash = data;

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

    const urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !><!- path !><!- queryString !><!- hash !>';

    return templateValue(urlFormat, {
        "domain": this.variableDomain,
        "hash": isEmpty(this.variableHash)
            ? ''
            : '#'+this.variableHash,
        "path": isEmpty(this.variablePath)
            ? ''
            : '/'+removeSlash(this.variablePath)
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
        "port": isEmpty(this.variablePort)
            ? ''
            : ':'+this.variablePort,
        "protocol": isEmpty(this.variableProtocol)
            ? ''
            : this.variableProtocol+"://",
        "queryString": isEmpty(this.variableQueryString)
            ? ''
            : '?'+qsStringify(this.variableQueryString),
        "subdomain": isEmpty(this.variableSubdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": isEmpty(this.variableDomainTld)
            ? ''
            : '.'+this.variableDomainTld
    });

};

exports.UrlComposerInit = UrlComposerInit;
