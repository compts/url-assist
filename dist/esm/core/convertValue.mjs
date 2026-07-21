import {getTypeof} from 'structkit';

/**
 * Convert date to its preferred value
 *
 * @since 1.4.9
 * @category Function
 * @param {string} value String to split
 * @returns {string} Returns the total.
 * @example
 *
 * convertValue("split-this-string")
 *=>"split this string"
 */
function convertValue (value) {

    if (getTypeof(value) === "string") {

        if ((/^[0-9]{1,}$/g).test(value)) {

            return parseInt(value);

        }

        if ((/^[0-9]{1,}[.]{1}[0-9]{1,}$/g).test(value)) {

            return parseFloat(value);

        }

        return value;

    }

    return value;

}
export default convertValue;

