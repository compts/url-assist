const {count, first, last, arraySlice, indexOfNotExist, isEmpty, toString, varExtend, ifUndefined} = require("structkit");
const {exemptListOfDomain} = require("./config");
const {zero, one, two, three} = require("./variable");

/**
 * Get if domain segmet details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect
 * @returns {any} Options of function
 * @example
 *
 * getDomain("example.com")
 * // =>  {
 *        "hash": "hashValue",
 *       "path": ""
 *       "search": "",
 *       "url": "example.com"
 *   }
 *
 */
const getDomain =function (domain) {

    const referenceDomain = domain.replace(/\b([\w\\+]{1,}:\/{2,})\b/g, "");

    const splitDomain = referenceDomain.split("/");
    let getDomainFirstSplit = first(splitDomain);
    let pathValueDetails = arraySlice(splitDomain, one).join("/");

    let validUrl = true;

    if ((/^(localhost|localhost:[0-9]{2,})$/g).test(referenceDomain)) {

        validUrl = false;
        pathValueDetails = referenceDomain.replace(/\b(localhost:[0-9]{2,}|localhost)/g, "");
        getDomainFirstSplit = referenceDomain.replace(pathValueDetails, "");

    }
    if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(referenceDomain) && validUrl) {

        validUrl = false;
        const getPath = referenceDomain.replace((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g, ""));

        if (ifUndefined(getPath) === false) {

            pathValueDetails = getPath;

        }

        getDomainFirstSplit = referenceDomain.replace(pathValueDetails, "");

    }

    if (indexOfNotExist(exemptListOfDomain, getDomainFirstSplit) && !(/(\.)/g).test(getDomainFirstSplit) && validUrl) {

        getDomainFirstSplit = '';
        pathValueDetails = splitDomain.join("/");

    }

    let pathValue = pathValueDetails;
    let hashValue = "";
    let queryValue = "";

    const pathSplitHash = pathValue.split("#");

    if (count(pathSplitHash) > one) {

        pathValue = first(pathSplitHash);
        hashValue = last(pathSplitHash);

    }

    const pathSplitQuery = pathValue.split("?");

    if (count(pathSplitQuery) > one) {

        pathValue = first(pathSplitQuery);
        queryValue = last(pathSplitQuery);

    }

    return {
        "hash": hashValue,
        "path": pathValue
            .replace(/^(\/)/, "")
            .replace(/(\/)$/, ""),
        "search": queryValue,
        "url": getDomainFirstSplit
    };

};


/**
 * Get Domain Details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @returns {any} Returns return object details of domain.
 * @example
 *
 * getDomainDetails("example.com")
 * // =>  domainDetails = {
 *      "domain": "example",
 *      "domainWithTld": "",
 *      "subdomain": "",
 *      "tld": "com"
 *  }
 */
const getDomainDetails=function (domain) {


    let domainDetails = {
        "domain": "",
        "domainWithTld": "",
        "subdomain": "",
        "tld": ""
    };

    if ((/^(localhost|localhost:[0-9]{2,})$/g).test(domain)) {

        domainDetails.domain = domain;

        return domainDetails;

    }

    if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(domain)) {

        domainDetails.domain = domain;

        return domainDetails;

    }

    const domainSplit = domain.split(".");
    const getTLD = last(domainSplit).split(":");

    if (count(domainSplit) === one) {

        domainDetails = {
            "domain": first(getTLD),
            "domainWithTld": first(getTLD),
            "subdomain": "",
            "tld": ""
        };

    }

    if (count(domainSplit) === two) {

        domainDetails = {
            "domain": first(domainSplit),
            "domainWithTld": first(domainSplit)+"."+last(domainSplit),
            "subdomain": "",
            "tld": first(getTLD)
        };

    }

    if (count(domainSplit) >= three) {

        const getDefaultDomain = arraySlice(domainSplit, one, count(domainSplit) - two).join(".");

        domainDetails = {
            "domain": getDefaultDomain,
            "domainWithTld": getDefaultDomain +"."+last(domainSplit),
            "subdomain": first(domainSplit),
            "tld": first(getTLD)
        };

    }

    return domainDetails;

};

/**
 * Check if domain is valid
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns boolean type if url is valid format.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
const isUrlValidFormatVerifier=function (domain, config) {

    const validConfig = varExtend({
        "allowIP4": true,
        "allowLocalhost": true
    }, config);
    const httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    const validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    const validTLDlen = 63;

    if (httpRegExp.test(domain)) {

        const cleanUrl = getDomain(domain).url.replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");


        if ((/^(localhost|localhost:[0-9]{2,})$/g).test(cleanUrl) && validConfig.allowLocalhost) {

            return true;

        }
        if ((/^([0-9]{1,3}\.){3}([0-9]{1,3}|[0-9]{1,3}:[0-9]{0,})$/g).test(cleanUrl) && validConfig.allowIP4) {

            return true;

        }
        const cleanUrlSplit = cleanUrl.split(".");

        if (count(cleanUrlSplit) >= two) {

            const getTLD = count(first(last(cleanUrlSplit).split("/")).split(""));

            if (getTLD > one && getTLD <= validTLDlen) {

                if (count(cleanUrlSplit) === two) {

                    return validDomainRegExp.test(first(cleanUrlSplit));

                }

                if (count(cleanUrlSplit) >= three) {

                    const getDomainSplit = getDomainDetails(cleanUrl);

                    const regSubDomain =(/^([\w\d-.]{1,})$/g).test(getDomainSplit.subdomain);
                    const regDomain = (/^([\w\d-]{1,})$/g).test(getDomainSplit.domain);

                    return regSubDomain && regDomain;

                }

            }

        }

    }

    return false;

};


/**
 * Get domain details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain Arguments for domain or url you want to dissect
 * @returns {any} Returns return object details of domain.
 * @example
 *
 * urlDetails("example.com")
 * // =>  dataReference = {
 *      "hash": "",
 *      "hostname": "",
 *      "hostnamePort": "",
 *      "pathname": "",
 *       "port": "",
 *      "protocol": "",
 *      "search": ""
 *  }
 *
 */
const urlDetails=function (domain) {

    const dataReference = {
        "hash": "",
        "hostname": "",
        "hostnamePort": "",
        "password": "",
        "pathname": "",
        "port": "",
        "protocol": "",
        "search": "",
        "user": ""
    };

    domain.replace(/\b([\w\\+]{1,}):\/\/\b/g, function (wh, s1) {

        dataReference.protocol = s1;

        return "";

    });

    const hostname = getDomain(domain);

    const splitPort = hostname.url.split(":");

    dataReference.hostnamePort = hostname.url;
    dataReference.search = hostname.search;
    dataReference.hash = hostname.hash;
    dataReference.pathname = hostname.path;
    dataReference.hostname = first(splitPort);
    dataReference.port = count(splitPort) > one
        ? last(splitPort)
        : "";

    if ((/^([\d]{1,})$/g).test(dataReference.port) === false) {

        dataReference.port ="";

    }

    if (isEmpty(dataReference.port)) {

        dataReference.hostname = hostname.url;

    } else {

        dataReference.hostname = arraySlice(splitPort, zero, count(splitPort) - two).join(":");

    }
    const splitUsernameDomain = dataReference.hostname.split("@");

    if (count(splitUsernameDomain) === two) {

        dataReference.user = first(splitUsernameDomain);
        dataReference.hostname = last(splitUsernameDomain);

        const usernameAndPassword = dataReference.user.split(":");

        if (count(usernameAndPassword) === two) {

            dataReference.user = first(usernameAndPassword);
            dataReference.password = last(usernameAndPassword);

        }

    }

    return dataReference;

};

exports.getDomainDetails = getDomainDetails;
exports.isUrlValidFormatVerifier = isUrlValidFormatVerifier;
exports.urlDetails = urlDetails;

