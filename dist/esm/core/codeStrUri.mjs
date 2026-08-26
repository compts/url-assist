import {sixteen, zero} from '../config/variable.mjs';

import {toString} from 'structkit';

/**
 * EncodeURIComponent method with special characters encoded
 *
 * @since 1.2.72
 * @category Function
 * @param {string} data String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function coreEncodeURI (data) {

    return encodeURIComponent(toString(data)).replace(/[!'()*"]/g, (ch) => '%' + ch.charCodeAt(zero).toString(sixteen)
        .toUpperCase());

}

/**
 * DecodeURIComponent method with special characters decoded
 *
 * @since 1.2.72
 * @category Function
 * @param {string} data String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function coreDecodeURI (data) {

    return toString(data).replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {

        try {

            return decodeURIComponent(match);

        } catch {

            return match;

        }

    });

}

export {coreEncodeURI, coreDecodeURI};
