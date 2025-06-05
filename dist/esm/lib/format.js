

/**
 * Query String encode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
function queryEncode (query) {

    let updateValue = query.replace(/\+/g, ' ');

    try {

        updateValue = encodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

}

/**
 * Query String decode
 *
 * @since 1.2.7
 * @category string
 * @param {string} query Passing the completet domain url
 * @returns {string} Return the string.
 * @example
 *
 * formatUrl('helloworld')
 *=> helloworld/
 */
function queryDecode (query) {

    let updateValue = query.replace(/\+/g, ' ');

    try {

        updateValue = decodeURIComponent(updateValue);

        return updateValue;

    } catch (err) {

        return updateValue;

    }

}

export {queryEncode,queryDecode};
