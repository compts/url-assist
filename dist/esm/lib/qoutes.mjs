import {varExtend, reduce} from 'structkit';

import {coreEncodeURI, coreDecodeURI} from '../core/codeStrUri.mjs';

/**
 * Url qoute for safe url or domain
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the quoted uri.
 * @example
 *
 * qoute("?see=asda asd asd ()")
 * // =>  %3Fsee%3Dasda%20asd%20asd%20()
 *
 */
function qoute (data, config) {

    const defineConfig = varExtend({"safe": null}, config);

    data = coreEncodeURI(data);

    if (defineConfig.safe !== null) {

        data = reduce(function (total, value) {

            const encodedChar = coreEncodeURI(value);

            total = total.replaceAll(encodedChar, value);

            return total;

        }, data, defineConfig.safe.split(""));

    }

    return data;

}

/**
 * Unquote a quoted uri
 *
 * @since 1.2.72
 * @category Seq
 * @param {string} data Arguments for domain or url you want to dissect.
 * @param {object?} config Options of function
 * @returns {any} Returns the unquoted uri.
 * @example
 *
 * unQoute("%3Fsee%3Dasda%20asd%20asd%20%28%29")
 * // =>  ?see=asda asd asd ()
 *
 */
function unQoute (data, config) {

    const defineConfig = varExtend({"plusToSpace": false}, config);

    if (defineConfig.plusToSpace) {

        data= data.replace(/\+/g, ' ');

    }
    data = coreDecodeURI(data);

    return data;

}

export {qoute, unQoute};
