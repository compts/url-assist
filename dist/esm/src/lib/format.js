
/**
 * Decoding URI component
 *
 * @since 1.2.6
 * @category Seq
 * @param {any} value URI string that you want to convert
 * @returns {any} Returns the string of querystring.
 * @example
 *
 * decodeStr("tests+test")
 * // => tests test
 */
const decodeStr = function (value) {

    let updateValue = value.replace(/\+/g, ' ');

    try {

        updateValue = decodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

};

export {decodeStr};
