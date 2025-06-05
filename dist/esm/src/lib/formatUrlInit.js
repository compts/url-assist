import {first, last, isEmpty} from 'structkit';

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

    const one =1;
    let strPattern = pattern.replace(/\/$/g, "");

    if (ext.stripHash) {

        const rawStr = strPattern.split("#");

        strPattern = first(rawStr);

    }
    let refQueryParam = "";
    const rawStrParamPattern = strPattern.split("?");

    if (rawStrParamPattern.length > one) {

        strPattern = first(rawStrParamPattern);
        refQueryParam = last(rawStrParamPattern);

    }
    if (ext && ext.stripQuery) {

        strPattern = first(rawStrParamPattern);

    }
    if (ext && ext.stripProtocol) {

        const rawStr = strPattern.split("://");

        strPattern = first(rawStr);

    }
    if (ext && ext.stripWww) {

        strPattern = strPattern.replace(/^www\./, "");

    }

    if (ext.slash) {

        strPattern += "/";

    }

    if (ext && ext.stripQuery === false && !isEmpty(refQueryParam)) {

        strPattern = strPattern+"?" + refQueryParam;

    }

    return strPattern;

}

export {formatUrlInit};
