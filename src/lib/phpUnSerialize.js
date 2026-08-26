
const {zero, one, two} = require("../config/variable");
const convertValue = require("../core/convertValue");

const {curry, each, range, reduce, getValue, toArray, first, arraySlice, indexOf} = require("structkit");

/**
 * Create a serialize data if you are coming to php
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * phpUnSerialize('s:6:"Violet";')
 * // => 'Violet'
 */
function phpUnSerialize (value) {

    return curry(function (rawValue) {

        return parseTypeValObj(rawValue);

    }, one)(value);

    // }, [value], one);

}

/**
 * Convert the value to its type in serialize
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeValObj ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
const getObjectValue = function (value) {

    const splitOpen = value.split("{");
    const splitClose = reduce(function (total, mVal) {

        let rawVal = mVal;

        if (rawVal.match(/;(\})[a-z]:\d:(.*)/)) {

            const spltRawVal = rawVal.split("}");


            rawVal = spltRawVal.join("};");


        }
        total.push(rawVal);


        return total;

    }, [], arraySlice(splitOpen, one)).join("{")
        .replace(/\}[;]{1,}$/g, "");


    return splitClose;


};

/**
 * Convert the value to its type in serialize
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * getObjectType ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
const getObjectType = function (value) {

    const getMatch = value.match(/\b([a-z]){1}:([0-9]+)\b/g);

    if (getMatch !== null) {

        return {
            "is_valid": true,
            "matches": getMatch
        };

    }


    return {
        "is_valid": false,
        "matches": []
    };

};

/**
 * Convert the value to its type in serialize
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeValObj ( 'a:1:{i:0;s:3:"22s";};')
 * // => ["22s"]
 */
const parseTypeValObj = function (value) {

    if (value === "N;") {

        return null;

    }

    const getMatch = getObjectType(value);

    if (getMatch.is_valid) {

        const splitValue = getMatch.matches[zero].split(":");

        if (splitValue[zero] === "s") {

            const stringSplit = value.split(";");
            const slitGetStr = first(stringSplit).split(":");

            return slitGetStr[two].replace(/^"/g, "").replace(/"$/g, "");

        }

        if (splitValue[zero] === "O") {

            const stringSplit = value.split(";");
            const slitGetStr = first(stringSplit).split(":");

            return slitGetStr[two].replace(/^"/g, "").replace(/"$/g, "");

        }

        if (splitValue[zero] === "i") {

            return convertValue(splitValue[one]);

        }

        if (splitValue[zero] === "a") {

            let objValue = getObjectValue(value).split(";");

            const argVal = {};
            // This will help as check if the deep type was in array or json
            let isArrayValue = true;
            let counterArrayValue =zero;


            each(range(convertValue(splitValue[one]) - one, zero), function () {

                const refobjKey = parseTypeValObj(objValue[zero]+";");

                if (isArrayValue && refobjKey !== counterArrayValue) {

                    isArrayValue = false;

                }

                let isValidObject = false;
                let rawCount = one;

                if (objValue[one].match(/[a-z]:[0-9]+:\{[a-z]:[0-9]/g)) {

                    rawCount = indexOf("}", objValue);
                    isValidObject = true;

                }


                argVal[refobjKey] = parseTypeValObj(arraySlice(objValue, one).join(";")+";");;

                if (isValidObject) {

                    objValue = arraySlice(objValue, rawCount + one);
                    counterArrayValue += rawCount;

                } else {

                    objValue = arraySlice(objValue, two);
                    counterArrayValue += one;

                }


            });

            return isArrayValue
                ?toArray(getValue(argVal))
                :argVal;


        }

    }

    return null;


};

module.exports=phpUnSerialize;

