const {templateValue, isEmpty} = require("structkit");
const {qsParse} = require("./queryObject");
const {qsStringify} = require("./queryString");

/**
 * Verify if format is valid
 * @category Seq
 * @since 1.2.1
 * @param {string} domain Passing the completet domain url
 * @param {string} protocol Passing the completet domain url
 * @param {string} port Passing the completet domain url
 * @param {string} subdomain Passing the completet domain url
 * @param {string} tld Passing the completet domain url
 * @returns {any} Return the boolean.
 * @example
 *
 * removeSlash('/example')
 *=> example
 */
function ifValidHost (domain, protocol, port, subdomain, tld) {

    const data = {
        "domain": "",
        "port": "",
        "protocol": "",
        "subdomain": "",
        "tld": ""
    };

    if (!isEmpty(protocol) && !isEmpty(domain)) {


        data.domain= domain;
        data.protocol= protocol;
        data.port= port;
        data.subdomain= subdomain;
        data.tld= tld;

        return data;

    }

    if (!isEmpty(tld) && !isEmpty(domain)) {


        data.domain= domain;
        data.protocol= protocol;
        data.port= port;
        data.subdomain= subdomain;
        data.tld= tld;

        return data;

    }

    return data;

}

/**
 * Remove slash first and last
 * @category Seq
 * @since 1.2.1
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
UrlComposerInit.prototype.getToString = function () {

    const urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    const urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !><!- path !><!- queryString !><!- hash !>';

    return templateValue(urlFormat, {
        "domain": urlData.domain,
        "hash": isEmpty(this.variableHash)
            ? ''
            : '#'+this.variableHash,
        "path": isEmpty(this.variablePath)
            ? ''
            : '/'+removeSlash(this.variablePath)
                .replace(/^(\/)/, "")
                .replace(/(\/)$/, ""),
        "port": isEmpty(urlData.port)
            ? ''
            : ':'+urlData.port,
        "protocol": isEmpty(urlData.protocol)
            ? ''
            : urlData.protocol+"://",
        "queryString": isEmpty(this.variableQueryString)
            ? ''
            : '?'+qsStringify(this.variableQueryString),
        "subdomain": isEmpty(urlData.subdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": isEmpty(urlData.tld)
            ? ''
            : '.'+urlData.tld
    });

};


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
UrlComposerInit.prototype.getDomainString = function () {

    const urlData = ifValidHost(this.variableDomain, this.variableProtocol, this.variablePort, this.variableSubdomain, this.variableDomainTld);
    const urlFormat = '<!- protocol !><!- subdomain !><!- domain !><!- tld !><!- port !>';

    return templateValue(urlFormat, {
        "domain": urlData.domain,
        "port": isEmpty(urlData.port)
            ? ''
            : ':'+urlData.port,
        "protocol": isEmpty(urlData.protocol)
            ? ''
            : urlData.protocol+"://",
        "subdomain": isEmpty(urlData.subdomain)
            ? ''
            :this.variableSubdomain+'.',
        "tld": isEmpty(urlData.tld)
            ? ''
            : '.'+urlData.tld
    });

};

exports.UrlComposerInit = UrlComposerInit;
