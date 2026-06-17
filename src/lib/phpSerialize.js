const {one, zero} = require("./variable");

const {curry, count, range, getKey, getValue, toArray, map, getTypeof, indexOfExist} = require("structkit");


/**
 * Create a serialize data if you are coming to php
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {string} Returns number for subtracted value
 * @example
 *
 * phpSerialize(["22s"])
 * // => 'a:1:{i:0;s:3:"22s";}'
 */
function phpSerialize (value) {

    return curry(function (rawValue) {

        const dataType = getTypeof(rawValue);

        if (indexOfExist(dataType, [
            "array",
            "json",
            "object",
            "set",
            "map"
        ])) {

            const getKeyVal = toArray(getKey(rawValue));
            const getValueVal = toArray(getValue(rawValue));


            const mapData = map(function (mValue, kValue) {

                const refMapKey = getKeyVal[kValue];
                const refMapValue = getValueVal[kValue];

                return parseTypeVal(getTypeof(refMapKey), refMapKey) +""+parseTypeVal(getTypeof(refMapValue), refMapValue);

            }, range(count(rawValue) - one, zero));

            return "a:"+count(mapData)+":{"+mapData.join("")+"}";

        }

        return parseTypeVal(dataType, value);

    }, one)(value);

}

/**
 * Convert the value to its type in serialize
 *
 * @since 1.4.9
 * @category Collection
 * @param {any} typeValue Arugment that you want to convert to serialize string
 * @param {any} value Arugment that you want to convert to serialize string
 * @returns {any} Returns number for subtracted value
 * @example
 *
 * parseTypeVal ("string", "value")
 * // => 0
 */
const parseTypeVal = function (typeValue, value) {

    if (indexOfExist(typeValue, [
        "array",
        "json",
        "object",
        "set",
        "map"
    ])) {

        return phpSerialize(value);

    }

    if (typeValue === "string") {

        return "s:"+count(value)+":\""+value+"\";";

    }
    if (typeValue === "function") {

        return "O:"+count(value.name)+":\""+value.name+"\":0:{};";

    }
    if (typeValue === "number") {

        return "i:"+value+";";

    }

    return "N;";


};

module.exports=phpSerialize;

