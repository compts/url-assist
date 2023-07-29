const {isEmpty, has, getTypeof, first} = require("structkit");

/**
 * Parsing query string into JSON object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} defaultConfig config defalut value
 * @param {any} keyOnly Key in array
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly)
 * // => null
 */
const parseObjectConvert = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (getTypeof(referenceValue[keyOnly]) === "string") {

        referenceValue[keyOnly] = getValueOnly;

    }

    if (getTypeof(referenceValue[keyOnly]) === "array") {

        referenceValue[keyOnly].push(getValueOnly);

    }

    if (getTypeof(referenceValue[keyOnly]) === "json") {

        const firstKey = first(keyList).value;

        referenceValue[keyOnly][firstKey]=getValueOnly;

    }

};

/**
 * Parsing JSON object into query string
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} defaultConfig config defalut value
 * @param {any} keyOnly Key in array
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
const parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (has(referenceValue, keyOnly) ===false) {

        if (isEmpty(keyList)) {

            referenceValue[keyOnly]="";

        } else {

            const firstKey = first(keyList).value;

            if (isEmpty(firstKey)) {

                referenceValue[keyOnly] = [];

            } else {

                referenceValue[keyOnly] = {};

            }
            keyList.shift();
            if (isEmpty(keyList) ===false) {

                parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly);

            }

        }

    } else {

        if (getTypeof(referenceValue[keyOnly]) === "string") {

            referenceValue[keyOnly] = [];

        }

    }

};

exports.parseObjectConvert = parseObjectConvert;
exports.parseObjectSchema = parseObjectSchema;
