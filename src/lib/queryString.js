const {each, varExtend, getTypeof, indexOfNotExist, indexOf} = require("structkit");
const {configQueryString} = require("./config");
const {zero} = require("./variable");

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

    each(value, function (key, val) {

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
 * @returns {null} Returns null
 * @example
 *
 * parseStringConvert({"test": 11,"test2": 11}, {"test2": 11})
 * // => null
 */
const parseStringConvert=function (key, value, type, config, reference) {


    if (indexOf([
        "json",
        "array"
    ], type) >=zero) {

        each(value, function (ky, vl) {

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

exports.qsStringify = qsStringify;
