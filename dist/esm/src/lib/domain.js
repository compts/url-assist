import { on } from 'events';

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
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
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

    if (count(last) === three) {

        domainDetails = {
            "domain": domainSplit[one],
            "domainWithTld": domainSplit[one]+"."+last(domainSplit),
            "subdomain": first(domainSplit),
            "tld": last(domainSplit)
        };

    }

    return domainDetails;

};

export {getDomainDetails};
