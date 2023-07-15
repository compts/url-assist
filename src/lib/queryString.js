const {each, getTypeof, indexOf} = require("structkit");
const zero =0;

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} key The first number in an addition.
 * @param {any} value The first number in an addition.
 * @param {any} type The first number in an addition.
 * @param {any} config The first number in an addition.
 * @param {any} reference The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
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

            parseStringConvert(key+keyVal, vl, getTypeof(vl), config, reference);

        });

    } else {

        reference.push(key+""+config.equalSeparator+""+value);

    }

};

exports.parseStringConvert = parseStringConvert;
