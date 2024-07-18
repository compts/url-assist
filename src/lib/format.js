
/**
 * Decoding URI component
 *
 * @since 1.2.6
 * @category Seq
 * @param {any} value config defalut value
 * @returns {any} Returns the null.
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

exports.decodeStr = decodeStr;
