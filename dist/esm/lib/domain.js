import {count, first, last, arraySlice, indexOfNotExist, isEmpty, filter, varExtend, ifUndefined} from 'structkit';

import {exemptListOfDomain} from './config.js';

import {zero, one, two, three, five, six} from './variable.js';

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
    const referenceDomainNoProtocol = referenceDomain.replace(/^((https|http)?:\/\/)/, "");

    let validUrl = true;

    if ((/^(localhost|localhost:[0-9]{2,})\b/g).test(referenceDomain)) {

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

    const matchIPV6 = referenceDomain.match(/\[?([A-F0-9:]+)?\]/i);

    if (matchIPV6 && validUrl) {

        validUrl = false;
        getDomainFirstSplit = first(matchIPV6);
        pathValueDetails = referenceDomainNoProtocol.replace(getDomainFirstSplit, "");

        pathValueDetails = pathValueDetails.replace(/:([0-9]{2,})?\//g, function (wh, s1) {

            getDomainFirstSplit = getDomainFirstSplit+":"+s1;

            return "";

        });

    }
    if ((/^\[?([A-F0-9]{1,4}(:[A-F0-9]{1,4}){7}|([A-F0-9]{1,4}:){1,7}:|:((:[A-F0-9]{1,4}){1,7}|:)|([A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|([A-F0-9]{1,4}:){1,5}(:[A-F0-9]{1,4}){1,2}|([A-F0-9]{1,4}:){1,4}(:[A-F0-9]{1,4}){1,3}|([A-F0-9]{1,4}:){1,3}(:[A-F0-9]{1,4}){1,4}|([A-F0-9]{1,4}:){1,2}(:[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:((:[A-F0-9]{1,4}){1,6}))\]?$/i).test(getDomainFirstSplit) && validUrl) {

        validUrl = false;

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

        if (count(getTLD) > one) {

            domainDetails = {
                "domain": arraySlice(getTLD, zero, count(getTLD)>=six
                    ?five
                    : count(getTLD)-one).join(":"),
                "domainWithTld": "",
                "subdomain": "",
                "tld": ""
            };

        } else {

            domainDetails = {
                "domain": first(getTLD),
                "domainWithTld": first(getTLD),
                "subdomain": "",
                "tld": ""
            };

        }

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
        "allowIP6": true,
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
        if ((/^\[?([A-F0-9]{1,4}(:[A-F0-9]{1,4}){7}|([A-F0-9]{1,4}:){1,7}:|:((:[A-F0-9]{1,4}){1,7}|:)|([A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|([A-F0-9]{1,4}:){1,5}(:[A-F0-9]{1,4}){1,2}|([A-F0-9]{1,4}:){1,4}(:[A-F0-9]{1,4}){1,3}|([A-F0-9]{1,4}:){1,3}(:[A-F0-9]{1,4}){1,4}|([A-F0-9]{1,4}:){1,2}(:[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:((:[A-F0-9]{1,4}){1,6}))\]?$/i).test(cleanUrl) && validConfig.allowIP6) {

            return true;

        }
        const cleanUrlSplit = cleanUrl.split(".");

        const filterEmpty = filter(cleanUrlSplit, function (valS) {

            return isEmpty(valS) === false;

        });

        // Check if there is a empty in split url
        if (isEmpty(filterEmpty)) {

            return false;

        }

        if (count(cleanUrlSplit) >= two) {

            const tldName = last(cleanUrlSplit);
            const getTLD = count(first(tldName.split("/")).split(""));

            if ((/^[a-zA-Z]{0,}:?([0-9]{2,})$/g).test(tldName)) {

                const tldNameSplit = tldName.split(":");

                if (count(tldNameSplit) === two && (/^[a-zA-Z]{0,}$/g).test(first(tldNameSplit))) {

                    if (isEmpty(first(tldNameSplit))) {

                        return false;

                    }

                    return validDomainRegExp.test(first(cleanUrlSplit));

                }

                return false;

            }
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

    domain.replace(/([\w\\+]{1,}):\/\//g, function (wh, s1) {

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

export {getDomainDetails, isUrlValidFormatVerifier, urlDetails};
