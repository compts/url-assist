import {first} from 'structkit';

/**
 * To normalize the format of the URL
 *
 * @since 1.2.6
 * @category string
 * @param {string} pattern Passing the completet domain url
 * @param {any=} ext Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrlInit('helloworld')
 *=> helloworld
 */
function formatUrlInit (pattern, ext) {

    let strPattern = pattern.replace(/\/$/g, "");

    if (ext.stripHash) {

        const rawStr = strPattern.split("#");

        strPattern = first(rawStr);

    }

    if (ext.slash) {

        strPattern += "/";

    }

    return strPattern;

}

export {formatUrlInit};
