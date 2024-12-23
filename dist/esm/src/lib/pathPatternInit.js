import {getTypeof, each, first, isEmpty, ifUndefined, count,
    toInteger, toString, regexCountGroup, range, map, has, getKey, toArray, last} from 'structkit';

import {objRegExpKey} from './config.js';

/**
 * Verify if pattern and path are match
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {any} pattern Passing the completet domain url=
 * @param {any} path Passing the completet domain url=
 *
 * @returns {bool} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function validMatchPatternPath (pattern, path) {

    const matchPatternPath = path.match(pattern.patterns);

    if (has(matchPatternPath)) {

        const firstMatch = toString(first(matchPatternPath)).replace(/^\//g, "")
            .replace(/\/$/g, "");

        const pathClean = toString(path).replace(/^\//g, "")
            .replace(/\/$/g, "");

        return toString(firstMatch)===toString(pathClean);

    }

    return false;

}

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {any} pattern Passing the completet domain url=
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function basePattern (pattern) {

    const one = 1;
    const zero = 0;

    if (getTypeof(pattern) ==="json") {

        const patternRegexp = ifUndefined(pattern, "regexp", "--");
        const listArgument = ifUndefined(pattern, "arguments", []);

        if (patternRegexp ==="--") {

            throw new Error("`regexp` is missing in parameter");

        }

        if (getTypeof(new RegExp(patternRegexp)) !=="regexp") {

            throw new Error("`regexp` is must be regular expression format");

        }
        if (regexCountGroup(new RegExp(patternRegexp)) !== count(listArgument)) {

            throw new Error("Regular expression group must be equal to `arguments`");

        }

        return {
            "arguments": listArgument,
            "patterns": new RegExp(patternRegexp)
        };

    }

    if (getTypeof(pattern) ==="string") {

        const refRegVal = {};
        let updPattern = toString(pattern).replace(/([*]{1,})/g, "(.*?)");

        updPattern = toString(updPattern).replace(/([(]{0,1}[/]{0,1}:[a-zA-Z9-_<>]{1,}[)]{0,1})/g, function (...ags) {

            const replaceSlash = toString(first(ags)).replace(/^\//g, "");
            const replaceSlashClean = toString(replaceSlash).replace(/[:()/]{0,}/g, "")
                .replace(/<(.*?)>/g, "");
            const typeData = toString(replaceSlash).match(/<([a-zA-Z]{1,})>/i);

            let typeRef = "any";

            if (!isEmpty(typeData)) {

                typeRef = toString(typeData[one]);

            }

            if ((/^\(\/(.*?)\)$/g).test(replaceSlash)) {

                refRegVal[count(refRegVal)]= {
                    "name": replaceSlashClean,
                    "regexp": "(?:\\/"+ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{0,})"
                };

                return "(@"+last(toArray(getKey(refRegVal)))+"@)";

            }

            if ((/^\//g).test(first(ags))) {

                refRegVal[count(refRegVal)]= {
                    "name": replaceSlashClean,
                    "regexp": "/("+ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{1,})"
                };

                return "(@"+last(toArray(getKey(refRegVal)))+"@)";

            }

            refRegVal[count(refRegVal)]= {
                "name": replaceSlashClean,
                "regexp": "("+ifUndefined(objRegExpKey, typeRef, objRegExpKey.any)+"{1,})"
            };

            return "(@"+last(toArray(getKey(refRegVal)))+"@)";

        });

        const listArgument = [];

        updPattern = updPattern.replace(/\((.*?)\)/g, function (...arg) {

            const lengthArg = listArgument.length;

            const firstValue = first(arg);

            if ((/\(@[0-9]{1,}@\)/g).test(firstValue)) {

                listArgument.push({
                    "index": lengthArg,
                    "name": refRegVal[toInteger(firstValue)].name
                });

                return refRegVal[toInteger(firstValue)].regexp;

            }

            listArgument.push({
                "index": lengthArg,
                "name": "arg"+lengthArg
            });

            return firstValue;

        });

        return {
            "arguments": listArgument,
            "patterns": new RegExp(updPattern)
        };

    }

    if (getTypeof(pattern) ==="regexp") {

        const listArgument = map(range(regexCountGroup(pattern)-one, zero), function (value) {

            return {
                "index": value,
                "name": "arg"+value

            };

        });

        return {
            "arguments": listArgument,
            "patterns": pattern
        };

    }

    return null;

}

/**
 * Compose your url structure in string
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {object} path Passing the completet domain url=
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function basePath (path) {

    return path;

}

/**
 * Details of your path
 * @category Seq
 * @since 1.2.1
 * @class UrlComposerInit
 * @param {object} pattern Passing the completet domain url=
 * @param {object} path Passing the completet domain url=
 * @name urlCompose
 *
 * @returns {any} Return the boolean.
 * @example
 *
 * new PathPatternInit('https://example.com')
 *=> true
 */
function PathPatternInit (pattern, path) {

    this.pattern = pattern;
    this.path = path;

}

/**
 * Check if pattern and path is match
 *
 * @since 1.2.1
 * @category environment
 * @returns {boolean} Return the boolean.
 * @example
 *
 * urlPattern(":id", "1").isValid()
 *=> true
 */
PathPatternInit.prototype.isValid = function () {

    const refPattern = basePattern(this.pattern);
    const refPath = basePath(this.path);

    return validMatchPatternPath(refPattern, refPath);

};

/**
 * Check if pattern and path is match
 *
 * @since 1.2.1
 * @category environment
 * @returns {any} Return the object.
 * @example
 *
 * urlPattern(":id", "1").getParam()
 *=> {"id": '1'}
 */
PathPatternInit.prototype.getParam = function () {

    const refParam = {};

    const refPattern = basePattern(this.pattern);
    const refPath = basePath(this.path);

    if (validMatchPatternPath(refPattern, refPath)) {

        const matchPatternPath = refPath.match(refPattern.patterns);

        each(refPattern.arguments, function (key, value) {

            refParam[value.name] = matchPatternPath[value.index + (count(matchPatternPath)-count(refPattern.arguments))];

        });

    }

    return refParam;

};

export {PathPatternInit};
