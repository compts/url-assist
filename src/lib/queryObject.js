const {isEmpty, has, getTypeof, remove, indexOfExist, someValid, first, setData, getData, flatten, toArray, map, each, arraySlice} = require("structkit");
const {configQueryString} = require("./config");
const {zero, one} = require("./variable");
const {varExtend, indexOfNotExist} = require("structkit");
const {queryDecode} = require("./format");

/**
 * Query String object
 *
 * @since 1.0.0
 * @category Collection
 * @param {string} value Passing string to convert to object
 * @param {any=} config Conversion delimeter
 * @returns {any} Returns the total.
 * @example
 *
 * qsParse("test=1&test2=11")
 *=> {"test": 11,"test2": 11}
 */
function qsParse (value, config) {

    if (indexOfNotExist(["string"], getTypeof(value))) {

        return {};

    }
    if (isEmpty(value)) {

        return {};

    }
    value = queryDecode(value);
    value = value.trim().replace(/^[?#&]/, '');
    let referenceValue = {};
    const defaultConfig = varExtend(configQueryString, config);
    const defaultSplit = value.split(defaultConfig.newLineSeparator);

    // https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

    // Schema for data
    const reFlistKey = [];

    qsParseCallback(defaultConfig, defaultSplit, function (keyOnly, keyList, getValueOnly) {

        referenceValue = parseObjectSchema(referenceValue, defaultConfig, keyOnly, keyList, getValueOnly, reFlistKey, true);


    });

    return referenceValue;

}


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
 * @param {any} reFlistKey Value to replace
 * @param {any} isParent Value to replace
 * @returns {null} Returns the null.
 * @example
 *
 * parseObjectSchema({"test": 11,"test2": 11}, {"test2": 11})
 * // => null
 */
const parseObjectSchema = function (referenceValue, defaultConfig, keyOnly, keyList, getValueOnly, reFlistKey, isParent) {

    const keyRefArray = toArray(keyList);

    const keyFlatten = flatten([
        keyOnly,
        keyRefArray
    ]);
    const keyFlattenJoin = keyFlatten.join(".");


    if (has(referenceValue, keyOnly) ===false) {

        if (isEmpty(keyList)) {


            referenceValue[keyOnly] = getValueOnly;


        } else {


            referenceValue = setData(referenceValue, keyFlattenJoin, getValueOnly);


        }
        reFlistKey.push(keyOnly);


        return referenceValue;

    }


    if (indexOfExist(reFlistKey, keyOnly)) {


        if (indexOfExist([
            "string",
            "number",
            "boolean",
            "null"
        ], getTypeof(referenceValue[keyOnly]))) {


            const isrefExist = someValid(map(isParent
                ?[keyOnly]
                :[keyFlattenJoin], function (params) {

                return getData(referenceValue, params, true) !== null;

            }));

            if (isEmpty(keyList) === false) {

                if (isrefExist) {

                    referenceValue = setData(referenceValue, keyOnly, [
                        referenceValue[keyOnly],
                        setData({}, keyList.join("."), getValueOnly)
                    ]);


                } else {

                    referenceValue = setData(referenceValue, keyOnly, setData({}, keyList.join("."), getValueOnly));


                }

            } else {

                if (isrefExist) {

                    referenceValue = setData(referenceValue, keyOnly, [
                        referenceValue[keyOnly],
                        getValueOnly
                    ]);


                } else {

                    referenceValue = setData(referenceValue, keyOnly, getValueOnly);


                }

            }
            reFlistKey.push(keyFlattenJoin);

            return referenceValue;

        }
        if (getTypeof(referenceValue[keyOnly]) === "array") {

            // If the key is array, then we need to set the value
            const referenceData = referenceValue[keyOnly];

            if (isEmpty(keyList)) {

                referenceData.push(getValueOnly);

            } else {

                referenceData.push(setData({}, keyList.join("."), getValueOnly));

            }
            referenceValue = setData(referenceValue, keyOnly, referenceData);
            reFlistKey.push(keyFlattenJoin);

            return referenceValue;

        }


        let referenceData = referenceValue[keyOnly];

        referenceData = parseObjectSchema(referenceData, defaultConfig, first(keyList), toArray(remove(keyList, zero)), getValueOnly, keyList, false);

        referenceValue = setData(referenceValue, keyOnly, referenceData);


        reFlistKey.push(keyFlattenJoin);

        return referenceValue;


    }

    return referenceValue;


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

    each(defaultSplit, function (val) {

        const getKeyAndValue = val.split(defaultConfig.equalSeparator);
        const getKeyOnly = first(getKeyAndValue);
        const getValueOnly = arraySlice(getKeyAndValue, one).join(defaultConfig.equalSeparator);

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

            callbacks(keyOnly, keyList, convertValueToItsType(getValueOnly));

        }


    });

};

/**
 * Convert value to its type
 *
 * @since 1.2.7
 * @category Seq
 * @param {any} value config defalut value
 * @returns {any} Returns the null.
 * @example
 *
 * qsParseCallback(defaultConfig, defaultSplit, callbacks)
 * // => true
 */
const convertValueToItsType = function (value) {

    if ((/^([0-9]{1,}[.]{1}[0-9]{1,})$/gmi).test(value)) {

        value = parseFloat(value);

    } else if ((/^([0-9]{1,})$/gmi).test(value)) {

        value = parseInt(value);

    } else if (value === "true") {

        value = true;

    } else if (value === "false") {

        value = false;

    } else if (value === "null") {

        value = null;

    }

    return value;

};

exports.qsParse = qsParse;
