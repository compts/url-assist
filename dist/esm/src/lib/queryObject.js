import {isEmpty, has, getTypeof, first} from 'structkit';

/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue The first number in an addition.
 * @param {any} defaultConfig The first number in an addition.
 * @param {any} keyOnly The first number in an addition.
 * @param {any} keyList The first number in an addition.
 * @param {any} getValueOnly The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
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
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} referenceValue The first number in an addition.
 * @param {any} defaultConfig The first number in an addition.
 * @param {any} keyOnly The first number in an addition.
 * @param {any} keyList The first number in an addition.
 * @param {any} getValueOnly The first number in an addition.
 * @returns {any} Returns the total.
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

export {parseObjectConvert,parseObjectSchema};
