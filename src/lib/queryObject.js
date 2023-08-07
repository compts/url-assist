const {isEmpty, has, getTypeof, first, clone, each, delimiter, filter} = require("structkit");

const zero =0;
const one =1;

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

    const filterKeyList = filter(keyList, function (ke, value) {

        return isEmpty(value)===false;

    });

    if (getTypeof(referenceValue[keyOnly]) === "string") {

        referenceValue[keyOnly] = getValueOnly;

    }

    if (getTypeof(referenceValue[keyOnly]) === "array") {

        const firstKey = first(filterKeyList);
        const referenceData = {};

        objectMultipleKey(referenceData, filterKeyList, getValueOnly);
        referenceValue[keyOnly].push(isEmpty(firstKey)
            ? getValueOnly
            : referenceData);

    }

    if (getTypeof(referenceValue[keyOnly]) === "json") {

        objectMultipleKey(referenceValue[keyOnly], filterKeyList, getValueOnly);

    }

};


/**
 * Parsing nested object
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue reference from main function to recursive
 * @param {any} keyList array of keys in array argument
 * @param {any} getValueOnly Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectConvert(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly)
 * // => null
 */
const objectMultipleKey = function (referenceValue, keyList, getValueOnly) {

    const keyListClone = clone(keyList);

    keyList.shift();
    if (isEmpty(keyList)) {

        if (getTypeof(referenceValue[first(keyListClone)]) === "array") {

            referenceValue[first(keyListClone)].push(getValueOnly);

        } else {

            referenceValue[first(keyListClone)] = getValueOnly;

        }

    } else {

        objectMultipleKey(referenceValue[first(keyListClone)], keyList, getValueOnly);

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
 * parseObjectSchema({"test": 11,"test2": 11}, {"test2": 11})
 * // => null
 */
const parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly) {

    if (has(referenceValue, keyOnly) ===false) {

        if (isEmpty(keyList)) {

            if (isEmpty(keyOnly) ===false) {

                referenceValue[keyOnly]="";

            }

        } else {

            const firstKey = first(keyList);

            if (isEmpty(firstKey)) {

                referenceValue[keyOnly] = [];

            } else {

                referenceValue[keyOnly] = {};

            }

            if (isEmpty(keyList) ===false) {

                const keyListClone = clone(keyList);

                keyList.shift();

                parseObjectSchema(referenceValue[keyOnly], defaultConfig, first(keyListClone), keyList, getValueOnly);

            }

        }

    } else {

        if (getTypeof(referenceValue[keyOnly]) === "string") {

            referenceValue[keyOnly] = [];

        }

    }

};

/**
 * Parsing JSON object callback
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} defaultConfig config defalut value
 * @param {any} defaultSplit Key in array
 * @param {any} callbacks array of keys in array argument
 * @returns {any} Returns the null.
 * @example
 *
 * qsParseCallback(defaultConfig, defaultSplit, callbacks)
 * // => true
 */
const qsParseCallback = function (defaultConfig, defaultSplit, callbacks) {

    each(defaultSplit, function (key, val) {

        const getKeyAndValue = val.split(defaultConfig.equalSeparator);
        const getKeyOnly = first(getKeyAndValue);
        const getValueOnly = delimiter(getKeyAndValue, one).join(defaultConfig.equalSeparator);

        if (getKeyAndValue.length > zero) {

            let keyOnly = "";
            const keyList = [];

            const keySubData = getKeyOnly.replace(/^([\w\-_\d]{1,})\[/g, function (whole, sub1) {

                keyOnly=sub1;

                return "[";

            });

            if (isEmpty(keyOnly)) {

                keyOnly=getKeyOnly;

            }

            keySubData.replace(/(\[[\s\w\-_\d]{0,}\])/g, function (whole, sub1) {

                keyList.push(sub1.replace(/[[\]]/g, ""));

            });

            callbacks(keyOnly, keyList, getValueOnly);

        }


    });

};


exports.parseObjectConvert = parseObjectConvert;
exports.parseObjectSchema = parseObjectSchema;
exports.qsParseCallback = qsParseCallback;
