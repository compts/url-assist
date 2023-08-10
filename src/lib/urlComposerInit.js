const {templateValue, isEmpty} = require("structkit");


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
    this.variableDomainSubdomain = config.domainDetails.subdomain;

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
UrlComposerInit.prototype.setDomainSubdomain = function (data) {

    this.variableDomainSubdomain = data;


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

    const urlFormat = '<!- protocol !>://<!- subdomain !><!- domain !>.<!- tld !><!- port !><!- path !>';

    return templateValue(urlFormat, {
        "domain": this.variableDomain,
        "path": isEmpty(this.variablePath)
            ? ''
            : '/'+this.variablePath
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
        "port": isEmpty(this.variablePort)
            ? ''
            : ':'+this.variablePort,
        "protocol": this.variableProtocol,
        "subdomain": isEmpty(this.variableDomainSubdomain)
            ? ''
            :this.variableDomainSubdomain+'.',
        "tld": this.variableDomainTld
    });

};

exports.UrlComposerInit = UrlComposerInit;
