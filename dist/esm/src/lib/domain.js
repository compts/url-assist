import {count, first, last} from 'structkit';

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

    if (count(domainSplit) === two) {

        domainDetails = {
            "domain": first(domainSplit),
            "domainWithTld": first(domainSplit)+"."+last(domainSplit),
            "subdomain": "",
            "tld": last(domainSplit)
        };

    }

    if (count(domainSplit) === three) {

        domainDetails = {
            "domain": domainSplit[one],
            "domainWithTld": domainSplit[one]+"."+last(domainSplit),
            "subdomain": first(domainSplit),
            "tld": last(domainSplit)
        };

    }

    return domainDetails;

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
const isUrlValidFormatVerifier=function (domain) {

    const httpRegExp = new RegExp("^(http|https):\\/\\/", "g");
    const validDomainRegExp = new RegExp("^([\\w\\d\\-]{1,})$", "g");

    const one =1;
    const two =2;
    const theee =3;
    const four = 63;

    if (httpRegExp.test(domain)) {

        const cleanUrl = domain.replace(httpRegExp, "").replace(/([#?]{1}[[\w\d=_\-$%@&]{0,}]{0,})/g, "");
        const cleanUrlSplit = cleanUrl.split(".");

        if (count(cleanUrlSplit) === two || count(cleanUrlSplit) === theee) {

            const getTLD = count(first(last(cleanUrlSplit).split("/")).split(""));

            if (getTLD > one && getTLD <= four) {

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

export {getDomainDetails,isUrlValidFormatVerifier};
