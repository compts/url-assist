import {each, varExtend, getTypeof, indexOfNotExist, indexOf} from 'structkit';

import {configQueryString} from './config.js';

import {zero} from './variable.js';

/**
 * Query String stringify
 *
 * @since 1.0.0
 * @category Collection
 * @param {any} value Passing object to convert string
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsStringify({"test": 11,"test2": 11})
 *=> test=1&test2=11
 */
function qsStringify (value, config) {

    if (indexOfNotExist([
        "json",
        "array"
    ], getTypeof(value))) {

        return "";

    }

    const referenceValue = [];
    const defaultConfig = varExtend(configQueryString, config);

    each(value, function (val, key) {

        parseStringConvert(key, val, getTypeof(val), defaultConfig, referenceValue);

    });

    return defaultConfig.startWith+referenceValue.join(defaultConfig.newLineSeparator);

}

/**
 * Parse query string to object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} key The index of array or object
 * @param {any} value The passing value from either array or object
 * @param {any} type The the type of argument
 * @param {any} config Options of function
 * @param {any} reference The value that you pass from outside
 * @returns {undefined} Returns null
 * @example
 *
 * parseStringConvert({"test": 11,"test2": 11}, {"test2": 11})
 * // => undefined
 */
const parseStringConvert=function (key, value, type, config, reference) {

    if (indexOf([
        "json",
        "array"
    ], type) >=zero) {

        each(value, function (vl, ky) {

            const keyVal = indexOf([
                "number",
                "array"
            ], type) >=zero
                ?config.arrayFormat
                :"["+ky+"]";

            let defineKey = keyVal;

            if ((/^\[(.*?)\]$/g).test(ky) && indexOfNotExist([
                "number",
                "array"
            ], type)) {

                defineKey = ky;

            }
            parseStringConvert(key+""+defineKey, vl, getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+value);

    }

};

export {qsStringify};
