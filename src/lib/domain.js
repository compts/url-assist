const {count, first, last, arraySlice, isEmpty, toString} = require("structkit");

/**
 * Get if domain segmet details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
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

    const one =1;

    const referenceDomain = domain.replace(/\b([\w\\+]{1,}:\/{2})\b/g, "");

    const splitDomain = referenceDomain.split("/");


    const pathValueDetails = arraySlice(splitDomain, one).join("/");

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
        "url": first(splitDomain)
    };

};


/**
 * Get Domain Details
 *
 * @since 1.1.0
 * @category Seq
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getDomainDetails("example.com")
 * // =>  domainDetails = {
 *      "domain": "",
 *      "domainWithTld": "",
 *      "subdomain": "",
 *      "tld": ""
 *  }
 */
const getDomainDetails=function (domain) {

    const zero =0;
    const one =1;
    const two =2;
    const three = 3;

    let domainDetails = {
        "domain": "",
        "domainWithTld": "",
        "subdomain": "",
        "tld": ""
    };

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

        const getDefaultDomain = arraySlice(domainSplit, count(domainSplit) - two, count(domainSplit) - two);

        domainDetails = {
            "domain": toString(getDefaultDomain),
            "domainWithTld": getDefaultDomain +"."+last(domainSplit),
            "subdomain": arraySlice(domainSplit, zero, count(domainSplit) - three).join("."),
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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isUrlValidFormatVerifier("example.com")
 * // =>  false
 *
 */
const isUrlValidFormatVerifier=function (domain) {

    const httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    const validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    const one =1;
    const two =2;
    const theee =3;
    const validTLDlen = 63;

    if (httpRegExp.test(domain)) {

        const cleanUrl = getDomain(domain).url.replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");
        const cleanUrlSplit = cleanUrl.split(".");

        if (count(cleanUrlSplit) === two || count(cleanUrlSplit) === theee) {

            const getTLD = count(first(last(cleanUrlSplit).split("/")).split(""));

            if (getTLD > one && getTLD <= validTLDlen) {

                if (count(cleanUrlSplit) === two) {

                    return validDomainRegExp.test(first(cleanUrlSplit));

                }

                if (count(cleanUrlSplit) === theee) {

                    const regSubDomain =validDomainRegExp.test(first(cleanUrlSplit));
                    const regDomain = (/^([\w\d-]{1,})$/g).test(cleanUrlSplit[one].toString());

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
 * @param {string} domain The first number in an addition.
 * @returns {any} Returns the total.
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

    const zero =0;
    const one =1;
    const two =2;

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

