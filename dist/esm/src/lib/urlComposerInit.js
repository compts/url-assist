import {templateValue, isEmpty} from 'structkit';

import {qsParse} from './queryObject.js';

import {qsStringify} from './queryString.js';

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
 * UrlComposerInit('https://example.com')
 *=> https://example.com
 */
function UrlComposerInit (config) {

    this.variableProtocol = config.protocol;
    this.variablePort = config.port;
    this.variablePath = config.pathname;
    this.variablePathPrefix = "";
    this.variableDomain = config.domainDetails.domain;
    this.variableDomainTld = config.domainDetails.tld;
    this.variableSubdomain = config.domainDetails.subdomain;
    this.variableQueryString = qsParse(config.search);
    this.variableHash = config.hash;

}

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
UrlComposerInit.prototype.setProtocol = function (data) {

    this.variableProtocol = data;

};

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
UrlComposerInit.prototype.setHash = function (data) {

    this.variableHash = data;

};

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
UrlComposerInit.prototype.setPort = function (data) {

    this.variablePort = data;

};

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
UrlComposerInit.prototype.setPathPrefix = function (data) {

    this.variablePathPrefix = data;

};

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
UrlComposerInit.prototype.setPath = function (data) {

    this.variablePath = data;

};

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
UrlComposerInit.prototype.setDomain = function (data) {

    this.variableDomain = data;

};

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
UrlComposerInit.prototype.setDomainTld = function (data) {

    this.variableDomainTld = data;

};

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
UrlComposerInit.prototype.setSubdomain = function (data) {

    this.variableSubdomain = data;

};

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
    const joinPath = [
        this.variablePathPrefix,
        this.variablePath
    ].join("/");

    return templateValue(urlFormat, {
        "domain": urlData.domain,
        "hash": isEmpty(this.variableHash)
            ? ''
            : '#'+this.variableHash,
        "path": isEmpty(joinPath)
            ? ''
            : '/'+removeSlash(joinPath)
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

export {UrlComposerInit};
