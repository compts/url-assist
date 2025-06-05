(function(global){
global._stk={};
var __p = "@argument/place";

__=__p

/**
 * Placeholder of argument
 *
 * @since 1.4.8
 * @category String
 * @example
 *
 * __
 * // => @argument/place
 */

_stk.__=__;

/**
 * Create a separate `has` inside core folder
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value Either JSON or Array
 * @param {any=} key For key or index of data
 * @returns {boolean} Returns true or false.
 * @example
 *
 * _has({'as':1}, 'as')
 * // => true
 */
function _has (value, key) {

    if (typeof key === "undefined") {

        return value !== null && typeof value !== "undefined";

    }

    return Object.prototype.hasOwnProperty.call(value, key);

}

var negOne = -1;
var zero = 0;
var one = 1;
var two = 2;
var three = 3;
var four = 4;
var oneHundred = 100;

/**
 * Reviewing your curry arguments details
 *
 * @since 1.4.8
 * @category String
 * @param {any[]} args Any data you want to check its property
 * @returns {string} Get the property of variable
 * @example
 *
 * curryArgReview([])
 * => {}
 */
function curryArgReview (args) {

    var objs = {};
    var placeList = [];
    var validList = [];
    var argIncter = 0;

    for (var arg in args) {

        if (_has(args, arg)) {

            var value = args[arg];

            if (__ === value) {

                objs[argIncter] = {
                    "index": placeList.length,
                    "type": "place",
                    "val": value
                };
                placeList.push(value);
                argIncter +=one;

            } else {

                objs[argIncter] = {
                    "index": validList.length,
                    "type": "valid",
                    "val": value
                };

                validList.push(value);
                argIncter +=one;

            }

        }

    }

    return {
        "argInc": argIncter,
        "argss": objs,
        "place": placeList,
        "valid": validList

    };

}

/**
 * Create your curry function
 *
 * @since 1.4.8
 * @category Function
 * @param {any} fn Any data you want to check its property
 * @param {any[]} args Any data you want to check its property
 * @param {number=} NoDefaultArgs Any data you want to check its property
 * @returns {string} Get the property of variable
 * @example
 *
 * curryArg(function(){}, [])
 * => array
 */
function curryArg (fn, args, NoDefaultArgs) {

    var RefNoDefaultArgs = NoDefaultArgs || zero;

    if (RefNoDefaultArgs > args.length - argumentUndefinedCounter(args)) {

        for (var kk=0; kk<RefNoDefaultArgs;) {

            if (_has(args, kk)) {

                if (typeof args[kk] === "undefined") {

                    args[kk] = __;

                }

            }
            kk += one;

        }

    }

    var checkValue = curryArgReview(args);

    if (checkValue.place.length > zero) {

        return function () {

    var argSub=arguments;

            var clneCheckValue = [];

            var reviewArgValue = curryArgReview(argSub);

            if (reviewArgValue.place.length > zero) {

                return curryArg(fn, args);

            }
            for (var ii=0; ii<checkValue.argInc;) {

                if (_has(checkValue.argss, ii)) {

                    var argValue = checkValue.argss[ii];

                    if (argValue.type === "place") {

                        if (_has(argSub, argValue.index)) {

                            clneCheckValue.push(argSub[argValue.index]);

                        }

                    } else {

                        clneCheckValue.push(argValue.val);

                    }

                }

                ii += one;

            }

            return fn.apply(this, clneCheckValue);

        };

    }

    return fn.apply(this, args);

}

/**
 * Count undefined in arguments
 *
 * @since 1.4.8
 * @category String
 * @param {any[]} args Any data you want to check its property
 * @param {number=} NoDefaultArgs Any data you want to check its property
 * @returns {string} Get the property of variable
 * @example
 *
 * argumentUndefinedCounter([])
 * => 0
 */
function argumentUndefinedCounter (args) {

    var counter = 0;

    for (var arg in args) {

        if (_has(args, arg)) {

            var value = args[arg];

            if (typeof value === "undefined") {

                counter += one;

            }

        }

    }

    return counter;

}

/**
 * Check if object has value or null or undefined
 *
 * @since 1.0.1
 * @category Boolean
 * @param {...any?} args Either JSON or Array
 * @returns {boolean} Returns true or false.
 * @example
 *
 * has({'as':1}, 'as')
 * // => true
 */
function has () {

    var args=arguments;

    return curryArg(function (aa, bb) {

        return _has(aa, bb);

    }, args);

}

var objectCallType = {"[object Array]": "object",
    "[object Object]": "object",
    "[object String]": "string"};

var objectCallTypeAll = {"[object Arguments]": "arguments",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Function]": "function",
    "[object Null]": "null",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object Promise]": "promise",
    "[object RegExp]": "regexp",
    "[object String]": "string",
    "[object Uint16Array]": "uint16Array",
    "[object Uint8Array]": "uint8Array",
    "[object Undefined]": "undefined"};

/**
 * Is Json valid format
 *
 * @since 1.3.1
 * @category Seq
 * @param {any} value Value you want to check JSON is Valid
 * @param {string=} valueType Get value type
 * @returns {any} Returns true or false if valid json format
 * @example
 *
 * isJson('{}' )
 *=> true
 */
function isJson (value, valueType) {

    var getValueType = Object.prototype.toString.call(value);

    if (has(objectCallType, getValueType) === false) {

        return false;

    }

    var getValueTypeRef = objectCallType[getValueType];

    if (has(valueType)) {

        getValueTypeRef = valueType;

    }

    if (getValueTypeRef === "string") {

        if (!(/\[(.*?)\]/g).test(value) && !(/\{(.*?)\}/g).test(value)) {

            return false;

        }

        var stripValue=value.replace(/(&quot;)/gi, '"', value).replace(/(&nbsp;)/gi, ' ', value);

        return (/^[\],:{}\s]*$/).test(stripValue.replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));

    }

    var isValid =true;

    try {

        return checkIfFunctionNotExistObject(value);

    } catch (err) {

        isValid = false;

    } finally {

        isValid = false;

    }

    return isValid;

}

/**
 * Check if object has no function
 *
 * @since 1.3.1
 * @category Seq
 * @param {array|object} obj String you want to convert to JSON
 * @returns {any} Returns the total.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function checkIfFunctionNotExistObject (obj) {

    var getValueType = Object.prototype.toString.call(obj);

    if (getValueType === "[object Function]") {

        throw new Error("Function must not exist");

    }

    var isValid = false;

    if (getValueType === "[object Object]") {

        isValid = true;

    }

    if (getValueType === "[object Array]") {

        if (obj.length === zero) {

            return true;

        }

        isValid = true;

    }
    if (isValid) {

        for (var key in obj) {

            if (has(obj, key)) {

                checkIfFunctionNotExistObject(obj[key]);

            }

        }

    }

    return true;

}

/**
 * Get type of the variable
 *
 * @since 1.4.8
 * @category String
 * @param {any} objectValue Any data you want to check its property
 * @returns {string} Get the property of variable
 * @example
 *
 * getTypeofInternal([])
 * => array
 */
function getTypeofInternal (objectValue) {

    var objectType = Object.prototype.toString.call(objectValue);

    if (objectType === "[object Object]") {

        return isJson(objectValue, "object")
            ?"json"
            :"object";

    }

    if (has(objectCallTypeAll, objectType)) {

        return objectCallTypeAll[objectType];

    }

    return typeof objectValue;

}

/**
 * GlobalEach
 * @category Seq
 * @class
 * @name getKit
 */
function GlobalEach () {

    this.continue = true;

}

/**
 * Each or for loop function you are familiar with
 *
 * @since 1.0.1
 * @category Collection
 * @param {boolean} value Array or json.
 * @returns {null} Null return
 * @example
 *
 * each([1,2],(value,key,localGlobal)=>{ })
 *
 */
GlobalEach.prototype.isContinue = function (value) {

    this.continue = value;

};

/**
 * Each or for loop function you are familiar with
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue Array or json.
 * @param {Function=} func Function to execute the loop with callback key,
 * @returns {any} Array or json
 * @example
 *
 * each([1,2],(value,key,localGlobal)=>{ })
 *
 */
function each (objectValue, func) {

    var re_loop=[];

    var typeofs=getTypeofInternal(objectValue);

    var localGlobal = new GlobalEach();

    if (typeofs === "json"||typeofs === "array"||typeofs === "object"||typeofs === "arguments") {

        for (var ins in objectValue) {

            if (has(objectValue, ins)) {

                if (localGlobal.continue === false) {

                    break;

                }
                var bool_func = true;

                if (getTypeofInternal(objectValue[ins]) === "function") {

                    if ((/\b_/g).test(ins)) {

                        bool_func= false;

                    }

                }
                if (bool_func) {

                    try {

                        if (has(func)) {

                            func(objectValue[ins], ins, localGlobal);

                        } else {

                            re_loop[ins]=objectValue[ins];

                        }

                    } catch (error) {

                        console.log(error);

                    }

                } else {

                    re_loop=null;

                }

            }

        }

        return re_loop;

    }

    return null;

}

/**
 * Base reduce
 *
 * @since 1.4.8
 * @category Core
 * @param {any} defaultValue Array in number
 * @param {any[]} listData decimal point and default value is
 * @param {any} func The data you want to map
 * @returns {number} Returns the total.
 * @example
 *
 * baseReduce(2,[1,2],(total,value)=>total+value)
 * // => 5
 */
function baseReduce (defaultValue, listData, func) {

    var that = this;

    each(listData, function (av, ak) {

        defaultValue = func.apply(that, [
            defaultValue,
            av,
            ak
        ]);

    });

    return defaultValue;

}

/**
 * Ge the empty value of specify argument type
 *
 * @since 1.0.1
 * @category Any
 * @param {any} value Any value type that you want an empty return
 * @returns {any} Returns empty either Json or Array
 * @example
 *
 * empty([])
 * => []
 */
function empty (value) {

    if (getTypeofInternal(value) === "json") {

        return {};

    }

    if (getTypeofInternal(value) === "array" || getTypeofInternal(value) === "arguments") {

        return [];

    }

    if (getTypeofInternal(value) === "string") {

        return '';

    }
    if (getTypeofInternal(value) === "number") {

        return zero;

    }
    if (getTypeofInternal(value) === "uint16Array") {

        return Uint16Array.from([]);

    }
    if (getTypeofInternal(value) === "uint8Array") {

        return Uint8Array.from([]);

    }

    return value;

}

/**
 * Append data for json and array
 *
 * @since 1.4.8
 * @category Any
 * @param {any} objectValue The data either json or array
 * @param {any} val Value for array index and json
 * @param {any=} key Json key
 * @returns {any} Returns the total.
 * @example
 *
 * baseAppend({'as':1}, 'as',2)
 * // => {'as':2}
 */
function baseAppend (objectValue, val, key) {

    var typeofs=getTypeofInternal(objectValue);

    if (typeofs === "json") {

        objectValue[key]=val;

    }
    if (typeofs === "array") {

        objectValue.push(val);

    }

    return objectValue;

}

/**
 * To map the value of json or array
 *
 * @since 1.4.8
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any=} func Callback function
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * baseMap([1,2],function(value) { return value+2 } )
 *=> [3, 4]
 */
function baseMap (objectValue, func) {

    var value_arry=empty(objectValue);
    var cnt=zero;

    var that = this;

    each(objectValue, function (value, key) {

        if (has(func)) {

            var dataFunc = func.apply(
                that,
                [
                    value,
                    key,
                    cnt
                ]
            );

            value_arry = baseAppend(value_arry, dataFunc, key);
            cnt += one;

        }

    });

    return value_arry;

}

/**
 * To map the value of json or array
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any=} func Callback function
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * map([1,2],function(value) { return value+2 } )
 *=> [3, 4]
 */
function map (objectValue, func) {

    return curryArg(function (rawObjectValue, rawFunc) {

        return baseMap(rawObjectValue, rawFunc);

    }, [
        objectValue,
        func
    ]);

}

/**
 * Counting the lenght in array, json or string
 *
 * @since 1.0.1
 * @category Math
 * @param {any=} objectValue Json or array that you want to cound
 * @param {boolean=} json_is_empty_check If data is json, it will check its map data
 * @returns {number} Returns the total.
 * @example
 *
 * count([1,2])
 * // => 2
 *
 * count({"s" :1, "s2": 2}, true)// Counting the object inside, you must this to true
 * // => 2
 */
function count (objectValue, json_is_empty_check) {

    var cnt=0;
    var incByOne=1;
    var defaultValueForFalse=0;
    var json_is_empty_check_default=json_is_empty_check||false;
    var get_json=getTypeofInternal(objectValue);

    if (has(objectValue) === false) {

        return defaultValueForFalse;

    }

    if (get_json === "array") {

        return objectValue.length;

    } else if (get_json === "object" && has(objectValue, "style")&&has(objectValue, "nodeType")&&has(objectValue, "ownerDocument")) {

        for (var inc in objectValue) {

            if (!isNaN(inc)) {

                cnt += incByOne;

            }

        }

    } else {

        var rawObjectValue = objectValue;

        if (get_json === "string") {

            rawObjectValue = rawObjectValue.split("");

        }

        each(rawObjectValue, function () {

            cnt += incByOne;

        });

    }

    if (get_json === "json"&&json_is_empty_check_default === true) {

        var jsn_parse=objectValue;
        var cnts=0;

        each(jsn_parse, function () {

            cnts += incByOne;

        });

        return cnts;

    }

    return cnt;

}

/**
 * Index Of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {array|object} objectValue Array
 * @param {number} value key of array
 * @param {number} start The first index in array
 * @param {number} end The last index in array
 * @param {boolean} isGetLast If True first index if False last index
 * @returns {number|object|string} Returns the total.
 * @example
 *
 * indexOf([1,2], 1)
 * // => 0
 */
function getIndexOf (objectValue, value, start, end, isGetLast) {

    var indexOfDefaultValue=-1;
    var incrementDefaultValue=1;

    var referenceValue = -1;

    if (getTypeofInternal(objectValue) === "array") {

        for (var inc=start; inc<end;) {

            var isValidMatch = false;

            if (getTypeofInternal(value) === "json") {

                isValidMatch = searchValueInJson(objectValue[inc], value);

            } else {

                if (objectValue[inc] === value) {

                    isValidMatch = true;

                }

            }

            if (isValidMatch) {

                if (isGetLast === false) {

                    return inc;

                }
                referenceValue = inc;

            }

            inc += incrementDefaultValue;

        }

    }

    return isGetLast === false
        ?indexOfDefaultValue
        :referenceValue;

}

/**
 * Index Of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} objectValue Array
 * @param {number} searchValue key of array
 * @returns {boolean} Returns the total.
 * @example
 *
 * searchValueInJson([1,2], 1)
 * // => 0
 */
function searchValueInJson (objectValue, searchValue) {

    var counter = 0;
    var increment = 1;

    each(objectValue, function (value, key) {

        if (has(searchValue, key)) {

            if (searchValue[key] === value) {

                counter += increment;

            }

        }

    });

    return count(objectValue) === counter;

}

/**
 * Index of array
 *
 * @since 1.0.1
 * @category Math
 * @param {any} objectValue Array
 * @param {any} value Value in array
 * @returns {number} Returns the index.
 * @example
 *
 * indexOf([1,2], 1)
 * // => 0
 */
function indexOf (objectValue, value) {

    var start = 0;

    var indexValue = getIndexOf(objectValue, value, start, count(objectValue), false);

    return indexValue;

}

/**
 * Check index of array is Exist or not
 *
 * @since 1.3.1
 * @category Boolean
 * @param {any[]} arrayObject Array
 * @param {any} value Value for array lookup
 * @returns {boolean} Return boolean.
 * @example
 *
 * indexOfExist([312], 32)
 * // => false
 */
function indexOfExist (arrayObject, value) {

    return indexOf(arrayObject, value) >= zero;

}

/**
 * Get key value
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} jsn Json or Array
 * @param {boolean} typ Types of instruction
 * @returns {array|object} Expected return from instruction
 * @example
 *
 * getKeyVal([1,2],"first_index")
 *=>{"key":1,"value":1}
 */
function getKeyVal (jsn, typ) {

    var ky=[],
        vl=[];
    var list_raw = [];

    each(jsn, function (vv, kk) {

        ky.push(kk);
        vl.push(vv);
        list_raw.push({
            "key": kk,
            "value": vv
        });

    });
    if (indexOfExist([
        "key",
        "value"
    ], typ)) {

        var ars=typ === "key"
            ?ky
            :vl;

        return count(ars) === one

            ?ars[zero]
            :ars;

    }
    if (typ === "first_index") {

        return count(list_raw)>zero
            ?list_raw[zero]
            :{"value": ''};

    }
    if (typ === "last_index") {

        return count(list_raw)>zero
            ?list_raw[count(list_raw)-one]
            :{"value": ''};

    }

    return null;

}

/**
 * Get the first value of array
 *
 * @since 1.0.1
 * @category Any
 * @param {any} objectValue The data is array
 * @returns {any} Returns first value of `objectValue`.
 * @example
 *
 * first([1,2,3])
 *=> 1
 */
function first (objectValue) {

    return getKeyVal(objectValue, "first_index").value;

}

/**
 * Get type of the variable
 *
 * @since 1.0.1
 * @category String
 * @param {...any} args Any data you want to check its property in multiple arguments
 * @returns {string|string[]} Get the property of variable
 * @example
 *
 * getTypeof([])
 * => array
 * getTypeof([],{})
 * => [array,json]
 */
function getTypeof () {

    var args=arguments;

    var getTypes = map(args, function (value) {

        return getTypeofInternal(value);

    });

    return count(getTypes) === one
        ?first(getTypes)
        :getTypes;

}

/**
 * To convert any data type(except the data has been already been an array) into array type
 *
 * @since 1.0.1
 * @category Array
 * @param {any} value Value you want to convert in array
 * @returns {any[]} Return in array.
 * @example
 *
 * toArray(1)
 *=>[1]
 */
function toArray (value) {

    var return_val = value;

    if (getTypeof(return_val) !== "array") {

        return_val = [value];

    }

    return return_val;

}

/**
 * Counting the true in list of array
 *
 * @since 1.4.8
 * @category Any
 * @param {any[]} objectValue The data is array
 * @returns {any} Returns the total.
 * @example
 *
 * baseCountValidList([true,true])
 * // => 2
 */
function baseCountValidList (objectValue) {

    return baseReduce(zero, objectValue, function (total, value) {

        var values = toArray(value);

        total +=baseReduce(zero, values, function (subtotal, subvalue) {

            if (subvalue && getTypeofInternal(subvalue) === "boolean") {

                return subtotal +one;

            }

            return subtotal;

        });

        return total;

    });

}

/**
 * In array, you need to check all value is true
 *
 * @since 1.4.8
 * @category Condition
 * @param {...any?} arg List of value you need to check if true
 * @returns {boolean} Returns true or false.
 * @example
 *
 * allValid(true, false)
 * // => false
 */
function allValid () {

    var arg=arguments;

    return curryArg(function () {

    var rawValue=arguments;

        return baseCountValidList(rawValue);

    }, arg) === count(arg);

}

_stk.allValid=allValid;


/**
 * Append data for json or array
 *
 * @since 1.0.1
 * @category Any
 * @param {any} objectValue Value either json or array
 * @param {any} val Value for array index and json
 * @param {any=} key Json key
 * @returns {any} Returns the total.
 * @example
 *
 * append({'as':1}, 'as',2)
 * // => {'as':2}
 */
function append (objectValue, val, key) {

    return curryArg(function (rawObjectValue, rawVal, rawKey) {

        return baseAppend(rawObjectValue, rawVal, rawKey);

    }, [
        objectValue,
        val,
        key
    ], two);

}

_stk.append=append;


/**
 * Check index of array Not or exist
 *
 * @since 1.4.1
 * @category Boolean
 * @param {any[]} arrayObject Array
 * @param {any} value Value for array lookup
 * @returns {boolean} Return boolean.
 * @example
 *
 * indexOfNotExist([312], 32)
 * // => true
 */
function indexOfNotExist (arrayObject, value) {

    return indexOf(arrayObject, value) === negOne;

}

/**
 * Append If Array does not Exist
 *
 * @since 1.0.1
 * @category Array
 * @param {any} arrayObject Data is Array
 * @param {any=} value Value for array lookup
 * @returns {any[]} Return array.
 * @example
 *
 * appendIsArrayExist([312], [32])
 * // => [312, 32]
 */
function appendIsArrayExist (arrayObject, value) {

    var ary_type=getTypeof(arrayObject);
    var ary_type1=getTypeof(value);

    if (ary_type === "array" && ary_type1 === "array") {

        each(value, function (val) {

            if (indexOfNotExist(arrayObject, val)) {

                arrayObject.push(val);

            }

        });

        return arrayObject;

    }

    return [];

}

_stk.appendIsArrayExist=appendIsArrayExist;


/**
 * To return the value selected either start or start to end index
 *
 * @since 1.3.1
 * @category Array
 * @param {any} objectValue Array
 * @param {number=} min Minumum of 2
 * @param {number=} max Maximum base on array count
 * @returns {any[]} Returns the total.
 * @example
 *
 * arraySlice([1,2],1)
 * // => [2]
 *
 * arraySlice([1,2,3,4],2,4)
 * // => [3, 4]
 */
function arraySlice (objectValue, min, max) {

    var ran_var=[];
    var defaultValueZero=0;
    var defaultValueNegativeOne=-1;
    var ran_min=has(min)
        ?min
        :defaultValueZero;
    var ran_max=has(max)
        ?max
        :count(objectValue);

    if (has(min)) {

        if (defaultValueZero > min) {

            ran_min = defaultValueZero;
            ran_max = count(objectValue) + (defaultValueNegativeOne+ min);

        }

    }

    if (has(max)) {

        if (defaultValueZero > max) {

            var raw_ran_min = defaultValueZero > min
                ?count(objectValue) + (defaultValueNegativeOne+ min)
                :min;
            var raw_ran_max =count(objectValue) + max;

            if (raw_ran_min < raw_ran_max) {

                ran_min = raw_ran_min;
                ran_max = raw_ran_max;

            } else {

                ran_min = raw_ran_min;
                ran_max = raw_ran_min;

            }

        }

    }

    each(objectValue, function (value, key) {

        if (ran_min <= parseInt(key) && ran_max >= parseInt(key)) {

            ran_var.push(value);

        }

    });

    return ran_var;

}

/**
 * Array Concat
 *
 * @since 1.0.1
 * @category Array
 * @param {...any?} arg Multiple arguments of array that you want to concat
 * @returns {any[]} Returns the array.
 * @example
 *
 * arrayConcat([1], 2)
 * // => [1,2]
 */
function arrayConcat () {

    var arg=arguments;

    return curryArg(function () {

    var argsub=arguments;

        if (argsub.length < one) {

            return [];

        }

        var return_val=toArray(first(argsub));
        var arrayValue = toArray(arraySlice(argsub, one));

        each(arrayValue, function (value) {

            return_val = return_val.concat(toArray(value));

        });

        return return_val;

    }, arg);

}

_stk.arrayConcat=arrayConcat;


/**
 * Generate array of data from specific limit or where the index to start
 *
 * @since 1.0.1
 * @category Seq
 * @param {number} maxValue Max value you to generate in array, default value 1
 * @param {number=} minValue Min value you to generate in array , default value 10
 * @param {string|number=} step  Specify the logic of increment or decrement
 * @returns {any[]} Return in array.
 * @example
 *
 * range(10)
 *=>[1,2,3,4,5,6,7,8,9,10]
 */
function range (maxValue, minValue, step) {

    var emptyDefaultValue=0;
    var tenDefaultValue=10;

    var incrementDefaultValue=1;

    var incrementValue=has(step)
        ?step
        :incrementDefaultValue;
    var minValueRef=has(minValue)
        ?minValue
        :incrementDefaultValue;
    var maxValueRef=has(maxValue)
        ?maxValue
        :tenDefaultValue;
    var output=[];

    for (var inc=minValueRef; inc <= maxValueRef;) {

        if (getTypeof(incrementValue) === "string") {

            output.push(inc);

            var render = new Function('inc', "return "+inc+incrementValue);

            inc = render.call(inc);

        }
        if (getTypeof(incrementValue) === "number") {

            output.push(inc);
            if (incrementValue<emptyDefaultValue) {

                inc -= incrementValue;

            } else {

                inc += incrementValue;

            }

        }

    }

    return output;

}

/**
 * Repeat value in array
 *
 * @since 1.4.7
 * @category Array
 * @param {any} value String you want to duplicate
 * @param {number} valueRepetion how many times you want to repeate
 * @returns {any[]} Return in string or number.
 * @example
 *
 * arrayRepeat("s",2 )
 *=>['s','s']
 */
function arrayRepeat (value, valueRepetion) {

    var emptyDefaultValue=0;
    var nm_rpt=valueRepetion||emptyDefaultValue;

    return map(range(nm_rpt), function () {

        return value;

    });

}

_stk.arrayRepeat=arrayRepeat;

_stk.arraySlice=arraySlice;


/**
 * Addition logic in satisfying two argument
 *
 * @since 1.4.8
 * @category Math
 * @param {number} value1 First number
 * @param {number=} value2 Second number
 * @returns {number|any} Returns number for added value
 * @example
 *
 * add(1, 1)
 * // => 2
 */
function add (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa + bb;

    }, [
        value1,
        value2
    ], two);

}

/**
 * Check if data is empty, null and undefined are now considered as empty
 *
 * @since 1.0.1
 * @category Boolean
 * @param {any} value JSON , Array and String
 * @returns {boolean} Returns true or false
 * @example
 *
 * isEmpty('')
 * // => true
 */
function isEmpty (value) {

    var typeofvalue = getTypeofInternal(value);

    var invalidList = [
        'null',
        'undefined'
    ];

    if (typeofvalue === "json" || typeofvalue === "array") {

        return count(value, typeofvalue === "json") === zero;

    }
    if (typeofvalue === "number") {

        return value === zero;

    }

    if (indexOfExist(invalidList, typeofvalue)) {

        return true;

    }

    if (typeofvalue === "uint16Array") {

        return value.length ===zero;

    }
    if (typeofvalue === "uint8Array") {

        return value.length ===zero;

    }

    return (/^\s*$/gmi).test(value);

}

/**
 * Array sum of value
 *
 * @since 1.0.1
 * @category Math
 * @param {number[]} arrayObject Array of number
 * @param {number=} delimeter decimal point and default value is 0
 * @returns {number} Returns the total.
 * @example
 *
 * arraySum([1,2], 2)
 * // => 3.00
 * arraySum([1,2])
 * // => 3
 */
function arraySum (arrayObject, delimeter) {

    var defaultLimitDecimal = 0;
    var arrayObjects=arrayObject||[];
    var delimeters=delimeter||defaultLimitDecimal;

    var sum = baseReduce(zero, arrayObjects, add);

    return isEmpty(delimeters)
        ? parseInt(sum)
        :sum.toFixed(delimeters);

}

_stk.arraySum=arraySum;


/**
 * Async replace regexp argument
 *
 * @since 1.3.1
 * @category Utility
 * @param {any} value String data
 * @param {any} search Regexp or string to look for match
 * @param {Function|String=} toReplace Replace value.
 * @returns {Promise<string>} String in promise function
 * @example
 *
 * asyncReplace("asd",/s/g,"@")
 * // => Promise{<fulfilled>: 'a@d'}
 */
function asyncReplace (value, search, toReplace) {

    return curryArg(function (rawValue, rawSearch, rawToReplace) {

        try {

            if (getTypeof(rawToReplace) === "function") {

                var values = [];

                String.prototype.replace.call(rawValue, rawSearch, function () {

    var arg=arguments;

                    values.push(rawToReplace(...arg));

                    return "";

                });

                return Promise.all(values).then(function (resolvedValues) {

                    return String.prototype.replace.call(rawValue, rawSearch, function () {

                        return resolvedValues.shift();

                    });

                });

            }

            return Promise.resolve(String.prototype.replace.call(rawValue, rawSearch, rawToReplace));

        } catch (error) {

            return Promise.reject(error);

        }

    }, [
        value,
        search,
        toReplace
    ]);

}

_stk.asyncReplace=asyncReplace;


/**
 * Cloning the data either in JSON or array that be used as different property
 *
 * @since 1.0.1
 * @category Any
 * @param {any} objectValue data you want to clone
 * @returns {any} Returns clone data
 * @example
 *
 * clone([1,2])
 * // => [1,2]
 */
function clone (objectValue) {

    var variable=empty(objectValue);

    each(objectValue, function (value, key) {

        append(variable, value, key);

    });

    return variable;

}

_stk.clone=clone;


/**
 * Get key Array or JSON
 *
 * @since 1.0.1
 * @category String
 * @param {any} objectValue Either JSON or Array type
 * @returns {string} Returns it respective key or index
 * @example
 *
 * getKey({"s":1})
 * => s
 */
function getKey (objectValue) {

    return getKeyVal(objectValue, "key");

}

/**
 * Divide logic in satisfying two argument
 *
 * @since 1.4.8
 * @category Math
 * @param {number} value1 First number
 * @param {number=} value2 Second number
 * @returns {number|any} Returns number for divided value
 * @example
 *
 * divide(1, 1)
 * // => 1
 */
function divide (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa / bb;

    }, [
        value1,
        value2
    ], two);

}

/**
 * Multiply logic in satisfying two argument
 *
 * @since 1.4.8
 * @category Math
 * @param {number} value1 First number
 * @param {number=} value2 Second number
 * @returns {number|any} Returns number for mutiplied value
 * @example
 *
 * multiply(1, 1)
 * // => 1
 */
function multiply (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa * bb;

    }, [
        value1,
        value2
    ], two);

}

/**
 * Subtract logic in satisfying two argument
 *
 * @since 1.4.8
 * @category Math
 * @param {number} value1 First number
 * @param {number=} value2 Second number
 * @returns {number|any} Returns number for subtracted value
 * @example
 *
 * subtract(1, 1)
 * // => 0
 */
function subtract (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa - bb;

    }, [
        value1,
        value2
    ], two);

}

/**
 * Logic in convert string to compute, similar on how the calculator works
 *
 * @since 1.4.8
 * @category Seq
 * @param {string} formula Formula you want to execution, it follows the idea of algebraic expression concept
 * @param {any=} args Object argument that to fill in variable define at algbraic expression
 * @returns {number|any} Returns the total.
 * @example
 *
 * calculate('1+1')
 *=> 2
 * calculate('1+as',{as:1})
 *=> 2
 */
function calculate (formula, args) {

    return curryArg(function (rawFormula, rawArgs) {

        if (getTypeof(rawArgs) === "json") {

            var argsKey = new RegExp("\\b("+toArray(getKey(rawArgs)).join("|")+")\\b", "g");

            rawFormula = rawFormula.replace(argsKey, function (mm, m1) {

                return rawArgs[m1];

            });

        }

        var strFormula = rawFormula.replace(/\((.*?)\)/, function (mm, m1) {

            return compute(m1);

        });

        return parseFloat(compute(strFormula));

    }, [
        formula,
        args
    ]);

}

/**
 * Logic in convert string or number to valid number
 *
 * @since 1.4.8
 * @category Seq
 * @param {string} formula The second number in an addition.
 * @returns {boolean|any} Returns the total.
 * @example
 *
 * calculate(/(\d)/g, 0,1)
 *=> 1
 */
function compute (formula) {

    var regexpNumber = /([\d]+!|[\d.%]+|[//*\-+\x^]|\|[\d]+\|)/g;
    var matches = formula.match(regexpNumber);

    if (count(matches) === one) {

        matches = formula.match(/([\d]+|[%])/g);

        if (count(matches) === one) {

            return convert(matches[zero], zero, "right");

        }

    }
    if (count(matches) === two) {

        if (matches[zero] === "-") {

            return convert(matches.join(""), zero, "right");

        }

    }

    if (count(matches) < three) {

        throw new Error("Invalid formula");

    }

    var counter = zero;
    var result = zero;

    for (var ii = zero; ii<Math.ceil(count(matches)/three); ii +=one) {

        if (ii === zero) {

            result = process(convert(matches[zero], matches[two], "right"), matches[one], convert(matches[zero], matches[two], "left"));

        } else {

            if (count(matches) > counter + four) {

                result = process(convert(result, matches[counter + four], "right"), matches[counter + three], convert(result, matches[counter + four], "left"));
                counter += two;

            }

        }

    }

    return parseFloat(result);

}

/**
 * Logic in convert string or number to valid number
 *
 * @since 1.4.8
 * @category Seq
 * @param {number} a1 The second number in an addition.
 * @param {string} operator The second number in an addition.
 * @param {number} b1 The second number in an addition.
 * @returns {number|any} Returns the total.
 * @example
 *
 * calculate(/(\d)/g, 0,1)
 *=> 1
 */
function process (a1, operator, b1) {

    switch (operator) {

    case '+':
        return add(parseFloat(a1), parseFloat(b1));
    case '-':
        return subtract(parseFloat(a1), parseFloat(b1));
    case 'x':
    case '*':
        return multiply(parseFloat(a1), parseFloat(b1));
    case '/':
        return divide(parseFloat(a1), parseFloat(b1));
    case '%':
        return parseInt(a1) % parseInt(b1);
    case '^':
        return parseFloat(a1) ** parseFloat(b1);
    default:
        break;

    }
    throw new Error("Invalid operator");

}

/**
 * Logic in convert string or number to valid number
 *
 * @since 1.4.8
 * @category Seq
 * @param {number} a1 The second number in an addition.
 * @param {string} b1 The second number in an addition.
 * @param {string} pos The second number in an addition.
 * @returns {number|any} Returns the total.
 * @example
 *
 * calculate(/(\d)/g, 0,1)
 *=> 1
 */
function convert (a1, b1, pos) {

    if ((/^(\d{1,}|\d{1,}\.\d{1,})%$/).test(b1) && (/^(\d{1,}|\d{1,}\.\d{1,})$/).test(a1) && pos ==="left") {

        return parseFloat(a1) * parseFloat(b1.replace(/%/g, "")/ oneHundred);

    }

    if ((/^(\d{1,}|\d{1,}\.\d{1,})%$/).test(b1) && (/^(\d{1,}|\d{1,}\.\d{1,})%$/).test(a1)) {

        if (pos === "right") {

            return parseFloat(a1.replace(/%/g, "")/ oneHundred);

        }

        if (pos === "left") {

            return parseFloat(b1.replace(/%/g, "")/ oneHundred);

        }

    }

    if ((/^(\d{1,})!$/).test(b1) || (/^(\d{1,})!$/).test(a1)) {

        var value = one;

        if (pos === "right") {

            value = parseInt(a1.replace(/!/g, ""));

        }

        if (pos === "left") {

            value = parseInt(b1.replace(/!/g, ""));

        }

        var inc = one;

        for (var vv = one; vv <= value;) {

            inc *= vv;
            vv+=one;

        }

        return inc;

    }

    if ((/^|(\d{1,})|$/).test(b1) || (/^|(\d{1,})|$/).test(a1)) {

        if (pos === "right") {

            return Math.abs(a1);

        }

        if (pos === "left") {

            return Math.abs(b1);

        }

    }

    if (pos === "right") {

        return a1;

    }

    return b1;

}

_stk.calculate=calculate;

_stk.count=count;


/**
 * Decrement value
 *
 * @since 1.4.8
 * @category Math
 * @param {any} value Value you want to convert in array
 * @param {any=} default_value Value to want to start counting
 * @returns {number} Return in number.
 * @example
 *
 * dec(1)
 *=>0
 */
function dec (value, default_value) {

    var return_val = value;
    var inc_n = getTypeof(default_value) === "number"
        ? default_value
        : one;

    if (getTypeof(return_val) === "number") {

        return_val -= inc_n;

        return return_val;

    }

    return zero;

}

_stk.dec=dec;


/**
 *  Returns the second argument if it is not null, `undefined` or `NaN`, otherwise returns the first argument.
 *
 * @since 1.4.87
 * @category Boolean
 * @param {any} defaultValue Any first value type
 * @param {any=} value2 Any first value type
 * @returns {any} Returns true or false.
 * @example
 *
 * defaultTo(1,2)
 * // => 2
 */
function defaultTo (defaultValue, value2) {

    return curryArg(function (aa, bb) {

        if (isNaN(bb)) {

            return aa;

        }
        if (_has(bb) === false) {

            return aa;

        }

        return bb;

    }, [
        defaultValue,
        value2
    ], two);

}

_stk.defaultTo=defaultTo;

_stk.divide=divide;

_stk.empty=empty;

_stk.each=each;


/**
 * To check if the two arguments are equal
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any first value type
 * @param {any=} value2 Any second value type
 * @returns {boolean|any} Returns true or false.
 * @example
 *
 * equal('as', 'as')
 * // => true
 */
function equal (value1, value2) {

    return curryArg(function (aa, bb) {

        if (getTypeofInternal(aa) !== getTypeofInternal(bb)) {

            return false;

        }

        return aa === bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.equal=equal;


/**
 * Filter the data in for loop
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue The data either json or array
 * @param {Function=} func The second number in an addition.
 * @returns {any} Returns data either json or array.
 * @example
 *
 * filter([1,2,3,34],function(value, key){ return key%2 === 0 })
 *
 * => [2, 34]
 */
function filter (objectValue, func) {

    var jsn_var=empty(objectValue);
    var jsn_type=getTypeof(objectValue);

    if (!(/(json|array)/g).test(jsn_type)) {

        return [];

    }
    each(objectValue, function (value, key) {

        if (has(func)) {

            if (func(value, key)) {

                append(jsn_var, value, key);

            }

        }

    });

    return jsn_var;

}

_stk.filter=filter;

_stk.first=first;


/**
 * Flatten an array to a single level.
 *
 * @since 1.4.87
 * @category Condition
 * @param {any} arg First number
 * @returns {any} Returns true or false.
 * @example
 *
 * flatten([1,2,3,4,[5,6],7])
 * // => [1,2,3,4,5,6,7]
 */
function flatten (arg) {

    return curryArg(function (rawValue) {

        return baseReduce([], rawValue, function (total, value) {

            if (getTypeofInternal(value) === "array") {

                each(value, function (valEach) {

                    total.push(valEach);

                });

            } else {

                total.push(value);

            }

            return total;

        });

    }, [arg]);

}

_stk.flatten=flatten;


/**
 * To Increment value
 *
 * @since 1.4.8
 * @category Array
 * @param {any} value Value you want to convert in array
 * @param {any=} default_value Value to want to start counting
 * @returns {number} Return in number.
 * @example
 *
 * inc(1)
 *=>2
 */
function inc (value, default_value) {

    var return_val = value;
    var inc_n = getTypeof(default_value) === "number"
        ? default_value
        : one;

    if (getTypeof(return_val) === "number") {

        return_val += inc_n;

        return return_val;

    }

    return zero;

}

/**
 * To String
 *
 * @since 1.4.5
 * @category String
 * @param {any=} value Value you to convert in double
 * @returns {string} Return in double.
 * @example
 *
 * toString(1)
 *=> '1'
 */
function toString (value) {

    var notInList = [
        "object",
        "json",
        "promise"
    ];

    var gettypeof = getTypeof(value);

    if (has(value) && indexOfNotExist(notInList, gettypeof)) {

        return value.toString();

    }

    return '';

}

/**
 * Get Data in array or json using string to search the data either by its key or index
 *
 * @since 1.4.87
 * @category Collection
 * @param {any=} data Either Json or Array data.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=> 1
 * @example
 * getData({"a":{"a":2},"b":{"a":3}},"a:a")
 *=> {a: 2}
 */
function schemaSplitData (data) {

    var split_strReplace= toString(data).replace(/([.]{1,})/g, ":");

    var spl_len= split_strReplace.split(":");
    var spl=[];

    each(spl_len, function (value) {

        spl.push(value);

    });

    return spl;

}

/**
 * Get Data in array or json using string to search the data either by its key or index
 *
 * @since 1.0.1
 * @category Collection
 * @param {any=} objectValue Either Json or Array data.
 * @param {any=} split_str Search key or index.
 * @param {any=} isStrict to check if delimiter are match in counter, default value is false.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=> 1
 * @example
 * getData({"a":{"a":2},"b":{"a":3}},"a:a")
 *=> {a: 2}
 */
function getData (objectValue, split_str, isStrict) {

    var refIsStrict = isStrict || false;

    if (!has(objectValue) || isEmpty(objectValue)) {

        return empty(objectValue);

    }

    return curryArg(function (rawObjectValue, rawSplit_str) {

        var spl= schemaSplitData(rawSplit_str);

        var jsn_total={};
        var counter = 0;

        each(spl, function (value) {

            if (has(rawObjectValue, value)) {

                if ((/^\s+$/).test(rawObjectValue[value]) === false) {

                    jsn_total=rawObjectValue[value];
                    counter=inc(counter);

                }

            } else {

                if (has(jsn_total, value)) {

                    jsn_total=jsn_total[value];
                    counter=inc(counter);

                }

            }

        });

        if (refIsStrict && spl.length !== counter) {

            return spl.length === counter
                ?jsn_total
                :null;

        }

        return jsn_total;

    }, [
        objectValue,
        split_str
    ]);

}

/**
 * Looking the data in JSON and Array base on object value
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} whereValue Json or Array
 * @param {any} objectValue1 Json or Array for lookup to whereValue
 * @param {boolean=} isExist Default value is True
 * @returns {boolean|any} Returns the boolean if the has the value you are looking at.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 *
 * isExact({"s1":{"s2":2}},{"s1:s2":2})
 * // => true
 */
function isExact (whereValue, objectValue1, isExist) {

    return curryArg(function (rawWhereValue, rawObjectValue1, rawIsExist) {

        if (rawObjectValue1 === null) {

            return false;

        }

        var local_is_exist=has(rawIsExist)&&getTypeofInternal(rawIsExist) === "boolean"
            ?rawIsExist
            :true;
        var val_s=(/(json|array|object)/g).test(getTypeofInternal(rawWhereValue))
            ?rawWhereValue
            :[rawWhereValue];
        var key_s=(/(json|array|object)/g).test(getTypeofInternal(rawObjectValue1))
            ?rawObjectValue1
            :[rawObjectValue1];
        var cnt=0;
        var incrementDefaultValue=1;

        each(key_s, function (kv, kk) {

            if (indexOfExist([
                "json",
                "object"
            ], getTypeofInternal(rawWhereValue))) {

                if (has(val_s, kk)) {

                    var local_is_valid = localValidation(val_s[kk], kv, local_is_exist);

                    if (local_is_valid) {

                        cnt += incrementDefaultValue;

                    }

                }

            }

            if (getTypeofInternal(rawWhereValue) === "array") {

                var local_is_valid = local_is_exist
                    ?indexOfExist(val_s, kv)
                    :indexOfNotExist(val_s, kv);

                if (local_is_valid) {

                    cnt += incrementDefaultValue;

                }

            }

        });

        if (isEmpty(cnt)) {

            each(val_s, function (kv, kk) {

                if (indexOfExist([
                    "json",
                    "object"
                ], getTypeofInternal(rawWhereValue))) {

                    var gdata = getData(key_s, kk);

                    if (!isEmpty(gdata)) {

                        var local_is_valid = localValidation(gdata, kv, local_is_exist);

                        if (local_is_valid) {

                            cnt += incrementDefaultValue;

                        }

                    }

                }

            });

        }

        return cnt === count(rawWhereValue);

    }, [
        whereValue,
        objectValue1,
        isExist
    ], two);

}

/**
 * Check the value if equal to each value
 *
 * @since 1.4.8.1
 * @category Collection
 * @param {any} keys string or number
 * @param {any} vals string, number or function
 * @param {boolean=} isExist Default value is True
 * @returns {boolean} Returns the boolean if the has the value you are looking at.
 * @example
 *
 * localValidation("as","as",true)
 * // => true
 * localValidation("as","as",false)
 * // => false
 */
function localValidation (keys, vals, isExist) {

    if (isExist) {

        if (getTypeofInternal(vals) === "function") {

            return vals(keys);

        }

        return keys === vals;

    }

    if (getTypeofInternal(vals) === "function") {

        return vals(keys) === false;

    }

    return keys !== vals;

}

/**
 * Looking the data in JSON and Array base on object value with the help regexp
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} whereValue Either Json or array
 * @param {any} objectValue1 use as lookup data in data
 * @returns {boolean} Returns the boolean if the has the value with the help regexp you are looking at.
 * @example
 *
 * isExactbyRegExp({"test": 11,"test2": 11}, {"test2": /\d/g})
 * // => false
 */
function isExactbyRegExp (whereValue, objectValue1) {

    if (objectValue1 === null) {

        return false;

    }

    if (getTypeof(whereValue) !== "json" && getTypeof(whereValue) !== "string" && getTypeof(whereValue) !== "regexp" && getTypeof(whereValue) !== "number") {

        return false;

    }

    var key_s=(/(json|array)/g).test(getTypeof(objectValue1))
        ?objectValue1
        :[objectValue1];
    var cnt=0;
    var incrementDefaultValue=1;
    var local_is_valid = null;

    each(key_s, function (kv, kk) {

        if (getTypeof(whereValue) === "json") {

            if (has(whereValue[kk])) {

                if (getTypeof(whereValue[kk]) === "regexp") {

                    local_is_valid = whereValue[kk];

                } else {

                    local_is_valid = new RegExp(whereValue[kk]);

                }
                if (local_is_valid.test(kv)) {

                    cnt += incrementDefaultValue;

                }

            }

        } else {

            if (getTypeof(whereValue) === "regexp") {

                local_is_valid = whereValue;

            } else {

                local_is_valid = new RegExp(whereValue);

            }
            if (local_is_valid.test(kv)) {

                cnt += incrementDefaultValue;

            }

        }

    });

    return cnt >zero;

}

/**
 * Where Loop Execution
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} jsn The second number in an addition.
 * @param {object} whr The second number in an addition.
 * @param {function} func The second number in an addition.
 * @param {boolean} isExist The second number in an addition.
 * @param {string} types The second number in an addition.
 * @returns {array|object} Returns the total.
 * @example
 *
 * whereLoopExecution({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 */
function whereLoopExecution (jsn, whr, func, isExist, types) {

    var json_convertion = getTypeof(jsn) === "array"
        ? jsn
        : [jsn];
    var jsn_s= count(jsn, true) === zero
        ? json_convertion
        : jsn;
    var whr_s=whr||{};
    var variable=empty(jsn);
    var filterData = {};

    each(jsn_s, function (jv, jk, isContinueRef1) {

        if (getTypeof(jsn) === "array") {

            filterData = jv;

        }
        if (getTypeof(jsn) === "json") {

            filterData[jk]=jv;

        }

        if (types === "where") {

            if (isExact(whr_s, filterData, isExist)) {

                append(variable, jv, jk);
                if (has(func)) {

                    func(jv, jk);

                }

            }

        }
        if (types === "where_once") {

            if (isExact(whr_s, filterData, isExist)) {

                if (isEmpty(variable)) {

                    append(variable, jv, jk);
                    isContinueRef1.isContinue(false);

                }

                if (has(func)) {

                    func(jv, jk);

                }

            }

        }
        if (types === "like") {

            if (isExactbyRegExp(whr_s, filterData)) {

                append(variable, jv, jk);
                if (has(func)) {

                    func(jv, jk);

                }

            }

        }

    });

    return variable;

}

/**
 * Get the value in array the value in json given the search value was in json
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue Json to Array
 * @param {any} objectValueWhere Data you want to search in key
 * @param {Function=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * where({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 * where([{"s1":{"s2":2}},{"s1":{"s2":3}}],{"s1.s2":2})
 *=>[{"s1":{"s2":2}}]
 */
function where (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'where');

}

/**
 * Remove data in either JSON or Array using key or woth value, a revise logic
 *
 * @since 1.4.85
 * @category Collection
 * @param {any} objectValue Json or array
 * @param {any} value if objectValue, json is must be object or array index you want to remove
 * @param {number=} value2 Last row in index
 * @returns {any[]} Returns the total.
 * @example
 *
 * remove([1,2,3],0 )
 *=>[2, 3]
 */
function remove (objectValue, value, value2) {

    var type_js=getTypeof(objectValue);
    var reslt =null;

    var isValueAFunction = getTypeof(value) === "function";

    if (type_js === "array") {

        var lastRow = has(value2)
            ?value2
            :count(objectValue);

        reslt=[];
        each(objectValue, function (av, ak) {

            if (isValueAFunction) {

                if (value(av, ak)) {

                    reslt.push(av);

                }

            } else {

                if (value === lastRow) {

                    if (parseInt(ak) !== value) {

                        reslt.push(av);

                    }

                } else {

                    if (parseInt(ak) > value && parseInt(ak) <= lastRow) {

                        reslt.push(av);

                    }

                }

            }

        });

        return reslt;

    }

    if (type_js === "json") {

        reslt={};
        var jsn_vw=[];

        each(objectValue, function () {

            where(objectValue, value, function (jk) {

                jsn_vw.push(jk);

            });

        });

        each(objectValue, function (av, ak) {

            if (isValueAFunction) {

                if (value(av, ak)) {

                    reslt[ak]=av;

                }

            } else {

                if (indexOfExist(jsn_vw, av) === false) {

                    reslt[ak]=av;

                }

            }

        });

        return reslt;

    }

    return [];

}

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned items from both lists. The returned list is truncated to the length of the shorter of the two input lists
 *
 * @since 1.4.87
 * @category Condition
 * @param {any} value First number
 * @param {number=} deepLimit First number
 * @returns {any} Returns array
 * @example
 *
 * fromPairs([[5,6],[7,2]])
 * // => {5:6,7:2}
 */
function fromPairs (value, deepLimit) {

    var defineDeepLimit = defaultTo(two);

    if (getTypeofInternal(value) !== "array") {

        throw new Error("Value must be an array");

    }

    return baseReduce({}, value, function (total, subBalue) {

        if (getTypeofInternal(subBalue) === "array") {

            if (subBalue.length > one) {

                var depthValue = getDepthValue(remove(subBalue, zero, defineDeepLimit(deepLimit)));

                append(total, depthValue, subBalue[zero]);

            }

        }

        return total;

    });

}

/**
 * Recursively retrieves the value from an array of pairs, removing any zero values and returning the first non-empty value.
 *
 * @since 1.4.87
 * @category Condition
 * @param {any} value First number
 * @param {number} deepLimit First number
 * @returns {any} Returns array
 * @example
 *
 * fromPairs([[5,6],[7,2]])
 * // => {5:6,7:2}
 */
function getDepthValue (value) {

    var getRmoveValue = remove(value, zero);

    if (isEmpty(getRmoveValue)) {

        return first(value);

    }

    var dataObj = {};

    dataObj[first(value)] = getDepthValue(getRmoveValue);

    return dataObj;

}

_stk.fromPairs=fromPairs;

_stk.getData=getData;

_stk.add=add;

_stk.getKey=getKey;

_stk.getTypeof=getTypeof;
/**
 * Generate unique value id
 *
 * @since 1.0.1
 * @category String
 * @param {any=} option type unique id
 * @returns {string} Get Unique Key.
 * @example
 *
 * getUniq()
 * => dur82ht126uqgszn62j04a
 */
function getUniq (option) {

    var optionValue = option||"default";

    if (optionValue === "default") {

        var defaultRandomValue=2;
        var defaultSubstrValue=36;
        var str_rand1=Math
            .random()
            .toString(defaultSubstrValue)
            .substring(defaultRandomValue)+Math.random()
            .toString(defaultSubstrValue)
            .substring(defaultRandomValue);

        return str_rand1;

    }

    return "";

}

_stk.getUniq=getUniq;


/**
 * Get value of json or array
 *
 * @since 1.0.1
 * @category String
 * @param {any} objectValue Either JSON or Array
 * @returns {string} Returns it respective value
 * @example
 *
 * getValue({"s":1})
 * => 1
 */
function getValue (objectValue) {

    return getKeyVal(objectValue, "value");

}

_stk.getValue=getValue;


/**
 * To group the value of json or array
 *
 * @since 1.4.8
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any=} func Callback function
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * groupBy([1,2,3,4,5,6,7], function (value) { return value % 2})
 *=> {0:[2,4,6], 1:[1,3,5,7]}
 */
function groupBy (objectValue, func) {

    var value_arry=clone(empty(objectValue));

    var groupData = {};

    each(objectValue, function (value, key) {

        if (has(func)) {

            var dataFunc = func(value, key);

            if (!has(groupData, dataFunc)) {

                groupData[dataFunc] = value_arry;

            }
            groupData[dataFunc] = append(clone(groupData[dataFunc]), value, key);

        }

    });

    return groupData;

}

_stk.groupBy=groupBy;


/**
 *  To check if the two arguments are greater
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any first value type
 * @param {any=} value2 Any second value type
 * @returns {boolean} Returns true or false.
 * @example
 *
 * gt(1, 2)
 * // => false
 */
function gt (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa > bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.gt=gt;


/**
 *  To check if the two arguments are greater than to equal
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any first value type
 * @param {any=} value2 Any second value type
 * @returns {boolean} Returns true or false.
 * @example
 *
 * gte(1, 2)
 * // => false
 */
function gte (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa >= bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.gte=gte;

_stk.has=has;


/**
 * Check if data is undefined
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue Either JSON or array
 * @param {any} value1 Check the key of value
 * @param {any=} value2 if value not exist, this value will be return
 * @returns {any} Returns filled value from its index
 * @example
 *
 * ifUndefined({'as':1}, 'as','as2')
 * // => 1
 */
function ifUndefined (objectValue, value1, value2) {

    if (!has(value2)) {

        if (has(objectValue)) {

            return objectValue;

        }

        return value1;

    }

    if (has(objectValue, value1)) {

        return objectValue[value1];

    }

    return value2;

}

_stk.ifUndefined=ifUndefined;

_stk.inc=inc;

_stk.indexOf=indexOf;

_stk.indexOfExist=indexOfExist;

_stk.indexOfNotExist=indexOfNotExist;


/**
 * Insert value in Json object or array
 *
 * @since 1.0.1
 * @category Object
 * @param {any} objectValue Either Json or array
 * @param {any} value Data you want to insert
 * @returns {null} Returns null
 * @example
 * var ss = {"A":1}
 * insert(ss,{'as':1})
 * // => {A: 1, as: 1}
 */
function insert (objectValue, value) {

    if (has(objectValue)) {

        var jsn_type=getTypeof(value);

        if (jsn_type === "json") {

            each(value, function (_value, key) {

                objectValue[key]=_value;

            });

        }

        if (jsn_type === "array") {

            objectValue.push(value);

        }

    }

}

_stk.insert=insert;

_stk.isEmpty=isEmpty;

_stk.isExact=isExact;

_stk.isExactbyRegExp=isExactbyRegExp;

_stk.isJson=isJson;


/**
 * Convert Json To Array base on search value you provide
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue Json
 * @param {string} value Search key or index.
 * @returns {boolean} Returns Array
 * @example
 *
 * jsonToArray({"a":{"a":2},"b":{"a":3}},"a")
 * => [2, 3]
 */
function jsonToArray (objectValue, value) {

    var arry=[];

    each(objectValue, function (_value) {

        if (has(value)) {

            var valueData = getData(_value, value);

            if (isEmpty(valueData) === false) {

                arry.push(valueData);

            }

        } else {

            arry.push(_value);

        }

    });

    return arry;

}

_stk.jsonToArray=jsonToArray;


/**
 * Get the last value of array or JSON
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The data is array
 * @returns {any} Returns last value of `objectValue`.
 * @example
 *
 * last([1,2] )
 *=>2
 */
function last (objectValue) {

    return getKeyVal(objectValue, "last_index").value;

}

_stk.last=last;


/**
 * Get the last index Of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Array
 * @param {any} value Value you are searching for
 * @returns {any} Return get the index or array
 * @example
 *
 * lastIndexOf([1,2], 1)
 * // => 0
 */
function lastIndexOf (objectValue, value) {

    var start = 0;

    var indexValue = getIndexOf(objectValue, value, start, count(objectValue), true);

    return indexValue;

}

_stk.lastIndexOf=lastIndexOf;


/**
 * Searching the data either in array or json object to get similar value of data
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Json or Array
 * @param {any} objectValueWhere Data you want to search that is identical to key of object or array
 * @param {any=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * like({"s1":1,"s2":1},{"s1":1})
 *=>{s1: 1, s2: 1}
 */
function like (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'like');

}

_stk.like=like;


/**
 * Specify the limit, similar in splice bt the return was object to ensure the order are not shuffle and key is number format
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Data must be array
 * @param {number} minValue Minimum value
 * @param {number=} maxValue Maximum value
 * @param {Function=} func Callback function
 * @returns {any} Returns the object.
 * @example
 *
 * limit([1,2],1,2 )
 *=>{'1':2}
 */
function limit (objectValue, minValue, maxValue, func) {

    var cnt=0;
    var glo_jsn={};
    var glo_indtfd = null;
    var emptyDefaultValue=0;
    var minValueReserve=has(minValue)
        ?minValue
        :emptyDefaultValue;
    var maxValueReserve=has(maxValue)
        ?maxValue
        :count(objectValue);
    var incrementDefaultValue=1;

    each(objectValue, function (meth, key) {

        if (cnt >= minValueReserve && cnt <= maxValueReserve) {

            if (has(func)) {

                glo_indtfd=func(meth, key);

                if (has(glo_indtfd)) {

                    glo_jsn[key]=glo_indtfd;

                }

            } else {

                glo_jsn[key]=meth;

            }

        }

        cnt += incrementDefaultValue;

    });

    return glo_jsn;

}

_stk.limit=limit;


/**
 * To check if the two arguments are less than to equal
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any first value type
 * @param {any=} value2 Any second value type
 * @returns {boolean|any} Returns true or false.
 * @example
 *
 * lte(1, 2)
 * // => true
 */
function lte (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa <= bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.lte=lte;

_stk.map=map;


/**
 * A Function to map the data either an array or an object using getData function.
 *
 * @since 1.3.1
 * @category Array
 * @param {any[]} objectValue Json in array format
 * @param {string} valueFormat Key look up format
 * @returns {any[]} Return array or object.
 * @example
 *
 * mapGetData([{"Asd":1}],"Asd")
 *=>[1]
 */
function mapGetData (objectValue, valueFormat) {

    return map(objectValue, function (value) {

        return getData(value, valueFormat);

    });

}

_stk.mapGetData=mapGetData;


/**
 * To check if the two arguments are less
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any first value type
 * @param {any=} value2 Any second value type
 * @returns {boolean|any} Returns true or false.
 * @example
 *
 * lt(1, 2)
 * // => true
 */
function lt (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa < bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.lt=lt;


/**
 * Merging two json object
 *
 * @since 1.4.8.1
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any} mergeValue data that you want to merge or replace from `objectValue`
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * mergeWithKey({"s":1},{"ss":1})
 *=> {"s":1,"ss":1}
 */
function mergeWithKey (objectValue, mergeValue) {

    return curryArg(function (rawObjectValue, rawMergeValue) {

        if (indexOfExist([
            "array",
            "string",
            "number"
        ], getTypeofInternal(rawObjectValue))|| indexOfExist([
            "array",
            "string",
            "number"
        ], getTypeofInternal(rawMergeValue))) {

            throw new Error("Invalid , both value must be json");

        }

        each(rawMergeValue, function (sVal, sKey) {

            rawObjectValue = baseAppend(rawObjectValue, sVal, sKey);

        });

        return rawObjectValue;

    }, [
        objectValue,
        mergeValue
    ]);

}

/**
 * Selecting multiple search data using `getData` logic in the loop
 *
 * @since 1.4.8.1
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any} whereValue where clause for you to merge the two set of data
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * selectInData({"s":1},{"ss":"s"})
 *=> {"ss":1}
 */
function selectInData (objectValue, whereValue) {

    return curryArg(function (rawObjectValue, rawWhereValue) {

        return baseMap(rawWhereValue, function (value) {

            var rawDataToArray = baseMap(toArray(rawObjectValue), function (value2) {

                var rawData = getData(value2, value);

                return isEmpty(rawData)
                    ?value
                    :rawData;

            });

            return getTypeof(rawObjectValue)==="json"
                ?first(rawDataToArray)
                :rawDataToArray;

        });

    }, [
        objectValue,
        whereValue
    ]);

}

/**
 * Merging two json/array object with the help of where clause
 *
 * @since 1.4.8.1
 * @category Collection
 * @param {any} objectValue The data you want to map
 * @param {any} mergeValue data that you want to merge
 * @param {any} whereValue where clause for you to merge the two set of data, where clause at `$1`  for `objectValue` and `$2`  for `mergeValue`
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * mergeInWhere([{"s":23,"id":1}],[{"id":1,"title":"test only"}],{"$1.id":"$2.id","$2.title":"test only"})
 *=> [{ "id":1, "s":23, "title":"test only"}]
 */
function mergeInWhere (objectValue, mergeValue, whereValue) {

    return curryArg(function (rawObjectValue, rawMergeValue, rawWhereValue) {

        var rawObjectType = getTypeofInternal(rawObjectValue);

        if (getTypeofInternal(rawMergeValue) !== rawObjectType) {

            throw new Error("Invalid , both value must be "+rawObjectType);

        }

        return baseMap(rawObjectValue, function (value) {

            each(mergeValue, function (subValue) {

                var joinValue = {
                    "$1": value,
                    "$2": subValue
                };
                var selectData = selectInData(joinValue, rawWhereValue);
                var whereData = where(subValue, selectData);

                if (isEmpty(whereData) === false) {

                    value = mergeWithKey(value, subValue);

                }

            });

            return value;

        });

    }, [
        objectValue,
        mergeValue,
        whereValue
    ]);

}

_stk.mergeInWhere=mergeInWhere;

_stk.mergeWithKey=mergeWithKey;

_stk.multiply=multiply;


/**
 * To check if its not equal
 *
 * @since 1.4.8
 * @category Boolean
 * @param {any} value1 Any value type
 * @param {any} value2 Any value type
 * @returns {boolean} Returns true or false.
 * @example
 *
 * noteq('as', 'as')
 * // => false
 */
function noteq (value1, value2) {

    return curryArg(function (aa, bb) {

        return aa !== bb;

    }, [
        value1,
        value2
    ], two);

}

_stk.noteq=noteq;


/**
 * String Lower case case
 *
 * @since 1.4.5
 * @category String
 * @param {string} value String data
 * @returns {string} Returns camel sting data
 * @example
 *
 * stringLowerCase('The fish is goad   with Goat-1ss')
 *=> 'the fish is goad   with goat-1ss
 */
function stringLowerCase (value) {

    return toString(value).toLowerCase();

}

/**
 * Var extend was use in replacing from `objectValueReplace` if not existed at objectValue
 *
 * @since 1.0.1
 * @category Collection
 * @param {object} objectValue Json, Array or Object
 * @param {object} objectValueReplace Json, Array or Object that you want to assign to `objectValue`
 * @returns {array} Return Json or Array or Object.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function varExtend (objectValue, objectValueReplace) {

    return curryArg(function (rawObjectValue, rawObjectValueReplace) {

        var jsn_bool={
            "false": false,
            "true": true
        };

        var listValid = [
            "json",
            "object"
        ];

        if (indexOfExist(listValid, getTypeof(rawObjectValue)) && indexOfExist(listValid, getTypeof(rawObjectValueReplace))) {

            var jsn_s={};

            for (var key in rawObjectValue) {

                if (has(rawObjectValue, key)) {

                    if (indexOfExist(getKey(jsn_bool), stringLowerCase(rawObjectValue[key]))) {

                        jsn_s[key]=jsn_bool[stringLowerCase(rawObjectValue[key])];

                    } else {

                        jsn_s[key]=rawObjectValue[key];

                    }

                }

            }

            for (var key in rawObjectValueReplace) {

                if (has(jsn_s, key)) {

                    if (getTypeof(jsn_s[key]) === "json") {

                        jsn_s[key]=replaceValue(jsn_s[key], rawObjectValueReplace[key]);

                    } else {

                        jsn_s[key]=rawObjectValueReplace[key];

                    }

                }

            }

            return jsn_s;

        }

        return objectValue;

    }, [
        objectValue,
        objectValueReplace
    ]);

}

/**
 * Replace Value
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} objectValue Json or Array
 * @param {object} objectValueReplace Json or Array that you want to assign to `objectValue`
 * @returns {array} Return Json or Array.
 * @example
 *
 * replaceValue({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function replaceValue (objectValue, objectValueReplace) {

    for (var key in objectValueReplace) {

        if (getTypeof(objectValue[key]) === "json") {

            objectValue[key] =replaceValue(objectValue[key], objectValueReplace[key]);

        } else {

            objectValue[key] = objectValueReplace[key];

        }

    }

    return objectValue;

}

/**
 * On delay
 *
 * @since 1.4.1
 * @category Function
 * @param {any} func a Callback function
 * @param {object=} wait timer for delay
 * @param {object=} option option for delay
 * @returns {object} Returns object.
 * @example
 *
 *  onDelay(()=>{})
 *=>'11'
 */
function onDelay (func, wait, option) {

    var zero = 0;
    var extend = varExtend(option, {
        "limitCounterClear": 0
    });

    var valueWaited = wait || zero;

    var timeout = setTimeout(function () {

        func();

    }, valueWaited);

    var sequence = new ClassDelay(timeout, extend);

    return sequence;

}

/**
 * On wait
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} timeout timer for delay
 * @param {object} extend option for delay
 * @returns {object} Returns object.
 * @example
 *
 *  onWait(()=>{})
 *=>'11'
 */
function ClassDelay (timeout, extend) {

    this.timeout = timeout;

    this.extend = extend;

}

ClassDelay.prototype.cancel = function () {

    clearTimeout(this.timeout);

};

_stk.onDelay=onDelay;


/**
 * On sequence
 *
 * @since 1.4.1
 * @category Seq
 * @param {any} func a Callback function
 * @param {object=} wait timer for delay
 * @param {object=} option option for delay
 * @returns {string} Returns object.
 * @example
 *
 *  onSequence(()=>{})
 *=>'11'
 */
function onSequence (func, wait, option) {

    var zero = 0;
    var one = 1;
    var extend = varExtend(option, {
        "limitCounterClear": 0
    });

    var valueWaited = wait || zero;
    var counter = 0;

    var interval = setInterval(function () {

        func();
        if (extend.limitCounterClear >zero) {

            if (counter === extend.limitCounterClear) {

                clearInterval(interval);

            }

        }

        counter += one;

    }, valueWaited);

    var sequence = new ClassSequence(interval, extend);

    return sequence;

}

/**
 * On wait
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} interval timer for delay
 * @param {object} extend The option for delay
 * @returns {any} Returns the object.
 * @example
 *
 *  onWait(()=>{})
 *=>'11'
 */
function ClassSequence (interval, extend) {

    this.interval = interval;

    this.extend = extend;

}

ClassSequence.prototype.cancel = function () {

    clearInterval(this.interval);

};

_stk.onSequence=onSequence;

var getWindow = function () {

    if (typeof window !== 'undefined') {

        return window;

    }

    return {};

};

/**
 * On wait
 *
 * @since 1.4.1
 * @category Function
 * @param {any} func a Callback function
 * @param {object=} wait timer for delay
 * @returns {string} Returns the total.
 * @example
 *
 *  onWait(()=>{})
 *=>'11'
 */
function onWait (func, wait) {

    var browserWindow = getWindow();
    var timerId = null;

    var useReqeustAdnimation = typeof browserWindow.requestAnimationFrame === "function";

    /**
     * On wait
     *
     * @since 1.4.1
     * @category Seq
     * @param {any} pendingFunc The second number in an addition.
     * @param {object} waiting The second number in an addition.
     * @returns {string} Returns the total.
     * @example
     *
     *  onWait(()=>{})
     *=>'11'
     */
    function startTimer (pendingFunc, waiting) {

        if (useReqeustAdnimation) {

            clearTimer();

            return browserWindow.requestAnimationFrame();

        }

        return onDelay(pendingFunc, waiting);

    }

    /**
     * On wait
     * @returns {any} Returns the total.
     *
     */
    function clearTimer () {

        if (useReqeustAdnimation) {

            browserWindow.cancelAnimationFrame(timerId);

        }

        timerId.cancel();

    }

    /**
     * On wait
     * @returns {any} Returns the total.
     *
     */
    function bootLoader () {

        timerId = startTimer(func, wait);

        return {};

    }

    return bootLoader();

}

_stk.onWait=onWait;


/**
 * Get the value in array the value in json given the search value was in json
 *
 * @since 1.4.8.7
 * @category Collection
 * @param {any} objectValue Json to Array
 * @param {any} objectValueWhere Data you want to search in key
 * @param {Function=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * whereOnce({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 * whereOnce([{"s1":{"s2":2}},{"s1":{"s2":3}}],{"s1.s2":2})
 *=>[{"s1":{"s2":2}}]
 */
function whereOnce (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'where_once');

}

/* eslint-disable sort-keys */
var entity = [
    {
        "decimal": "&#160;",
        "entity": "&nbsp;",
        "html": " ",
        "hex": "&#xA0;"
    },
    {"decimal": "&#34;",
        "entity": "&quot;",
        "hex": "&#x22;",
        "html": '"',
        "title": "quotation mark = APL quote"},
    {"decimal": "&#38;",
        "entity": "&amp;",
        "hex": "&#x26;",
        "html": "&",
        "title": "ampersand"},
    {"decimal": "&#60;",
        "entity": "&lt;",
        "hex": "&#x3C;",
        "html": "<",
        "title": "less-than sign"},
    {"decimal": "&#62;",
        "entity": "&gt;",
        "hex": "&#x3E;",
        "html": ">",
        "title": "greater-than sign"},
    {"decimal": "&#710;",
        "entity": "&circ;",
        "hex": "&#x2C6;",
        "html": "^",
        "title": "modifier letter circumflex accent"},
    {"decimal": "&#123;",
        "entity": "&lbrace;",
        "hex": "&#x7B;",
        "html": "{",
        "title": "Left curly bracket"},
    {"decimal": "&#125;",
        "entity": "&rbrace;",
        "hex": "&#x7D;",
        "html": "}",
        "title": "Right curly bracket"},
    {
        "decimal": "&#161;",
        "entity": "&iexcl;",
        "html": "¡",
        "hex": "&#xA1;"
    },
    {
        "decimal": "&#162;",
        "entity": "&cent;",
        "html": "¢",
        "hex": "&#xA2;"
    },
    {
        "decimal": "&#163;",
        "entity": "&pound;",
        "html": "£",
        "hex": "&#xA3;"
    },
    {
        "decimal": "&#164;",
        "entity": "&curren;",
        "html": "¤",
        "hex": "&#xA4;"
    },
    {
        "decimal": "&#165;",
        "entity": "&yen;",
        "html": "¥",
        "hex": "&#xA5;"
    },
    {
        "decimal": "&#166;",
        "entity": "&brvbar;",
        "html": "¦",
        "hex": "&#xA6;"
    },
    {
        "decimal": "&#167;",
        "entity": "&sect;",
        "html": "§",
        "hex": "&#xA7;"
    },
    {
        "decimal": "&#168;",
        "entity": "&uml;",
        "html": "¨",
        "hex": "&#xA8;"
    },
    {
        "decimal": "&#169;",
        "entity": "&copy;",
        "html": "©",
        "hex": "&#xA9;"
    },
    {
        "decimal": "&#170;",
        "entity": "&ordf;",
        "html": "ª",
        "hex": "&#xAA;"
    },
    {
        "decimal": "&#171;",
        "entity": "&laquo;",
        "html": "«",
        "hex": "&#xAB;"
    },
    {
        "decimal": "&#172;",
        "entity": "&not;",
        "html": "¬",
        "hex": "&#xAC;"
    },
    {
        "decimal": "&#173;",
        "entity": "&shy;",
        "html": "­",
        "hex": "&#xAD;"
    },
    {
        "decimal": "&#174;",
        "entity": "&reg;",
        "html": "®",
        "hex": "&#xAE;"
    },
    {
        "decimal": "&#175;",
        "entity": "&macr;",
        "html": "¯",
        "hex": "&#xAF;"
    },
    {
        "decimal": "&#176;",
        "entity": "&deg;",
        "html": "°",
        "hex": "&#xB0;"
    },
    {
        "decimal": "&#177;",
        "entity": "&plusmn;",
        "html": "±",
        "hex": "&#xB1;"
    },
    {
        "decimal": "&#178;",
        "entity": "&sup2;",
        "html": "²",
        "hex": "&#xB2;"
    },
    {
        "decimal": "&#179;",
        "entity": "&sup3;",
        "html": "³",
        "hex": "&#xB3;"
    },
    {
        "decimal": "&#180;",
        "entity": "&acute;",
        "html": "´",
        "hex": "&#xB4;"
    },
    {
        "decimal": "&#181;",
        "entity": "&micro;",
        "html": "µ",
        "hex": "&#xB5;"
    },
    {
        "decimal": "&#182;",
        "entity": "&para;",
        "html": "¶",
        "hex": "&#xB6;"
    },
    {
        "decimal": "&#184;",
        "entity": "&cedil;",
        "html": "¸",
        "hex": "&#xB8;"
    },
    {
        "decimal": "&#185;",
        "entity": "&sup1;",
        "html": "¹",
        "hex": "&#xB9;"
    },
    {
        "decimal": "&#186;",
        "entity": "&ordm;",
        "html": "º",
        "hex": "&#xBA;"
    },
    {
        "decimal": "&#187;",
        "entity": "&raquo;",
        "html": "»",
        "hex": "&#xBB;"
    },
    {
        "decimal": "&#188;",
        "entity": "&frac14;",
        "html": "¼",
        "hex": "&#xBC;"
    },
    {
        "decimal": "&#189;",
        "entity": "&frac12;",
        "html": "½",
        "hex": "&#xBD;"
    },
    {
        "decimal": "&#190;",
        "entity": "&frac34;",
        "html": "¾",
        "hex": "&#xBE;"
    },
    {
        "decimal": "&#191;",
        "entity": "&iquest;",
        "html": "¿",
        "hex": "&#xBF;"
    },
    {
        "decimal": "&#215;",
        "entity": "&times;",
        "html": "×",
        "hex": "&#xD7;"
    },
    {
        "decimal": "&#247;",
        "entity": "&divide;",
        "html": "÷",
        "hex": "&#xF7;"
    },
    {
        "decimal": "&#8704;",
        "entity": "&forall;",
        "html": "∀",
        "hex": "&#x2200;"
    },
    {
        "decimal": "&#8706;",
        "entity": "&part;",
        "html": "∂",
        "hex": "&#x2202;"
    },
    {
        "decimal": "&#8707;",
        "entity": "&exist;",
        "html": "∃",
        "hex": "&#x2203;"
    },
    {
        "decimal": "&#8709;",
        "entity": "&empty;",
        "html": "∅",
        "hex": "&#x2205;"
    },
    {
        "decimal": "&#8711;",
        "entity": "&nabla;",
        "html": "∇",
        "hex": "&#x2207;"
    },
    {
        "decimal": "&#8712;",
        "entity": "&isin;",
        "html": "∈",
        "hex": "&#x2208;"
    },
    {
        "decimal": "&#8713;",
        "entity": "&notin;",
        "html": "∉",
        "hex": "&#x2209;"
    },
    {
        "decimal": "&#8715;",
        "entity": "&ni;",
        "html": "∋",
        "hex": "&#x220B;"
    },
    {
        "decimal": "&#8719;",
        "entity": "&prod;",
        "html": "∏",
        "hex": "&#x220F;"
    },
    {
        "decimal": "&#8721;",
        "entity": "&sum;",
        "html": "∑",
        "hex": "&#x2211;"
    },
    {
        "decimal": "&#8722;",
        "entity": "&minus;",
        "html": "−",
        "hex": "&#x2212;"
    },
    {
        "decimal": "&#8727;",
        "entity": "&lowast;",
        "html": "∗",
        "hex": "&#x2217;"
    },
    {
        "decimal": "&#8730;",
        "entity": "&radic;",
        "html": "√",
        "hex": "&#x221A;"
    },
    {
        "decimal": "&#8733;",
        "entity": "&prop;",
        "html": "∝",
        "hex": "&#x221D;"
    },
    {
        "decimal": "&#8734;",
        "entity": "&infin;",
        "html": "∞",
        "hex": "&#x221E;"
    },
    {
        "decimal": "&#8736;",
        "entity": "&ang;",
        "html": "∠",
        "hex": "&#x2220;"
    },
    {
        "decimal": "&#8743;",
        "entity": "&and;",
        "html": "∧",
        "hex": "&#x2227;"
    },
    {
        "decimal": "&#8744;",
        "entity": "&or;",
        "html": "∨",
        "hex": "&#x2228;"
    },
    {
        "decimal": "&#8745;",
        "entity": "&cap;",
        "html": "∩",
        "hex": "&#x2229;"
    },
    {
        "decimal": "&#8746;",
        "entity": "&cup;",
        "html": "∪",
        "hex": "&#x222A;"
    },
    {
        "decimal": "&#8747;",
        "entity": "&int;",
        "html": "∫",
        "hex": "&#x222B;"
    },
    {
        "decimal": "&#8756;",
        "entity": "&there4;",
        "html": "∴",
        "hex": "&#x2234;"
    },
    {
        "decimal": "&#8764;",
        "entity": "&sim;",
        "html": "∼",
        "hex": "&#x223C;"
    },
    {
        "decimal": "&#8773;",
        "entity": "&cong;",
        "html": "≅",
        "hex": "&#x2245;"
    },
    {
        "decimal": "&#8776;",
        "entity": "&asymp;",
        "html": "≈",
        "hex": "&#x2248;"
    },
    {
        "decimal": "&#8800;",
        "entity": "&ne;",
        "html": "≠",
        "hex": "&#x2260;"
    },
    {
        "decimal": "&#8801;",
        "entity": "&equiv;",
        "html": "≡",
        "hex": "&#x2261;"
    },
    {
        "decimal": "&#8804;",
        "entity": "&le;",
        "html": "≤",
        "hex": "&#x2264;"
    },
    {
        "decimal": "&#8805;",
        "entity": "&ge;",
        "html": "≥",
        "hex": "&#x2265;"
    },
    {
        "decimal": "&#8834;",
        "entity": "&sub;",
        "html": "⊂",
        "hex": "&#x2282;"
    },
    {
        "decimal": "&#8835;",
        "entity": "&sup;",
        "html": "⊃",
        "hex": "&#x2283;"
    },
    {
        "decimal": "&#8836;",
        "entity": "&nsub;",
        "html": "⊄",
        "hex": "&#x2284;"
    },
    {
        "decimal": "&#8838;",
        "entity": "&sube;",
        "html": "⊆",
        "hex": "&#x2286;"
    },
    {
        "decimal": "&#8839;",
        "entity": "&supe;",
        "html": "⊇",
        "hex": "&#x2287;"
    },
    {
        "decimal": "&#8853;",
        "entity": "&oplus;",
        "html": "⊕",
        "hex": "&#x2295;"
    },
    {
        "decimal": "&#8855;",
        "entity": "&otimes;",
        "html": "⊗",
        "hex": "&#x2297;"
    },
    {
        "decimal": "&#8869;",
        "entity": "&perp;",
        "html": "⊥",
        "hex": "&#x22A5;"
    },
    {
        "decimal": "&#8901;",
        "entity": "&sdot;",
        "html": "⋅",
        "hex": "&#x22C5;"
    },
    {
        "decimal": "&#913;",
        "entity": "&Alpha;",
        "html": "Α",
        "hex": "&#x391;"
    },
    {
        "decimal": "&#914;",
        "entity": "&Beta;",
        "html": "Β",
        "hex": "&#x392;"
    },
    {
        "decimal": "&#915;",
        "entity": "&Gamma;",
        "html": "Γ",
        "hex": "&#x393;"
    },
    {
        "decimal": "&#916;",
        "entity": "&Delta;",
        "html": "Δ",
        "hex": "&#x394;"
    },
    {
        "decimal": "&#917;",
        "entity": "&Epsilon;",
        "html": "Ε",
        "hex": "&#x395;"
    },
    {
        "decimal": "&#918;",
        "entity": "&Zeta;",
        "html": "Ζ",
        "hex": "&#x396;"
    },
    {
        "decimal": "&#919;",
        "entity": "&Eta;",
        "html": "Η",
        "hex": "&#x397;"
    },
    {
        "decimal": "&#920;",
        "entity": "&Theta;",
        "html": "Θ",
        "hex": "&#x398;"
    },
    {
        "decimal": "&#921;",
        "entity": "&Iota;",
        "html": "Ι",
        "hex": "&#x399;"
    },
    {
        "decimal": "&#922;",
        "entity": "&Kappa;",
        "html": "Κ",
        "hex": "&#x39A;"
    },
    {
        "decimal": "&#923;",
        "entity": "&Lambda;",
        "html": "Λ",
        "hex": "&#x39B;"
    },
    {
        "decimal": "&#924;",
        "entity": "&Mu;",
        "html": "Μ",
        "hex": "&#x39C;"
    },
    {
        "decimal": "&#925;",
        "entity": "&Nu;",
        "html": "Ν",
        "hex": "&#x39D;"
    },
    {
        "decimal": "&#926;",
        "entity": "&Xi;",
        "html": "Ξ",
        "hex": "&#x39E;"
    },
    {
        "decimal": "&#927;",
        "entity": "&Omicron;",
        "html": "Ο",
        "hex": "&#x39F;"
    },
    {
        "decimal": "&#928;",
        "entity": "&Pi;",
        "html": "Π",
        "hex": "&#x3A0;"
    },
    {
        "decimal": "&#929;",
        "entity": "&Rho;",
        "html": "Ρ",
        "hex": "&#x3A1;"
    },
    {
        "decimal": "&#931;",
        "entity": "&Sigma;",
        "html": "Σ",
        "hex": "&#x3A3;"
    },
    {
        "decimal": "&#932;",
        "entity": "&Tau;",
        "html": "Τ",
        "hex": "&#x3A4;"
    },
    {
        "decimal": "&#933;",
        "entity": "&Upsilon;",
        "html": "Υ",
        "hex": "&#x3A5;"
    },
    {
        "decimal": "&#934;",
        "entity": "&Phi;",
        "html": "Φ",
        "hex": "&#x3A6;"
    },
    {
        "decimal": "&#935;",
        "entity": "&Chi;",
        "html": "Χ",
        "hex": "&#x3A7;"
    },
    {
        "decimal": "&#936;",
        "entity": "&Psi;",
        "html": "Ψ",
        "hex": "&#x3A8;"
    },
    {
        "decimal": "&#937;",
        "entity": "&Omega;",
        "html": "Ω",
        "hex": "&#x3A9;"
    },
    {
        "decimal": "&#945;",
        "entity": "&alpha;",
        "html": "α",
        "hex": "&#x3B1;"
    },
    {
        "decimal": "&#946;",
        "entity": "&beta;",
        "html": "β",
        "hex": "&#x3B2;"
    },
    {
        "decimal": "&#947;",
        "entity": "&gamma;",
        "html": "γ",
        "hex": "&#x3B3;"
    },
    {
        "decimal": "&#948;",
        "entity": "&delta;",
        "html": "δ",
        "hex": "&#x3B4;"
    },
    {
        "decimal": "&#949;",
        "entity": "&epsilon;",
        "html": "ε",
        "hex": "&#x3B5;"
    },
    {
        "decimal": "&#950;",
        "entity": "&zeta;",
        "html": "ζ",
        "hex": "&#x3B6;"
    },
    {
        "decimal": "&#951;",
        "entity": "&eta;",
        "html": "η",
        "hex": "&#x3B7;"
    },
    {
        "decimal": "&#952;",
        "entity": "&theta;",
        "html": "θ",
        "hex": "&#x3B8;"
    },
    {
        "decimal": "&#953;",
        "entity": "&iota;",
        "html": "ι",
        "hex": "&#x3B9;"
    },
    {
        "decimal": "&#954;",
        "entity": "&kappa;",
        "html": "κ",
        "hex": "&#x3BA;"
    },
    {
        "decimal": "&#955;",
        "entity": "&lambda;",
        "html": "λ",
        "hex": "&#x3BB;"
    },
    {
        "decimal": "&#956;",
        "entity": "&mu;",
        "html": "μ",
        "hex": "&#x3BC;"
    },
    {
        "decimal": "&#957;",
        "entity": "&nu;",
        "html": "ν",
        "hex": "&#x3BD;"
    },
    {
        "decimal": "&#958;",
        "entity": "&xi;",
        "html": "ξ",
        "hex": "&#x3BE;"
    },
    {
        "decimal": "&#959;",
        "entity": "&omicron;",
        "html": "ο",
        "hex": "&#x3BF;"
    },
    {
        "decimal": "&#960;",
        "entity": "&pi;",
        "html": "π",
        "hex": "&#x3C0;"
    },
    {
        "decimal": "&#961;",
        "entity": "&rho;",
        "html": "ρ",
        "hex": "&#x3C1;"
    },
    {
        "decimal": "&#962;",
        "entity": "&sigmaf;",
        "html": "ς",
        "hex": "&#x3C2;"
    },
    {
        "decimal": "&#963;",
        "entity": "&sigma;",
        "html": "σ",
        "hex": "&#x3C3;"
    },
    {
        "decimal": "&#964;",
        "entity": "&tau;",
        "html": "τ",
        "hex": "&#x3C4;"
    },
    {
        "decimal": "&#965;",
        "entity": "&upsilon;",
        "html": "υ",
        "hex": "&#x3C5;"
    },
    {
        "decimal": "&#966;",
        "entity": "&phi;",
        "html": "φ",
        "hex": "&#x3C6;"
    },
    {
        "decimal": "&#967;",
        "entity": "&chi;",
        "html": "χ",
        "hex": "&#x3C7;"
    },
    {
        "decimal": "&#968;",
        "entity": "&psi;",
        "html": "ψ",
        "hex": "&#x3C8;"
    },
    {
        "decimal": "&#969;",
        "entity": "&omega;",
        "html": "ω",
        "hex": "&#x3C9;"
    },
    {
        "decimal": "&#977;",
        "entity": "&thetasym;",
        "html": "ϑ",
        "hex": "&#x3D1;"
    },
    {
        "decimal": "&#978;",
        "entity": "&upsih;",
        "html": "ϒ",
        "hex": "&#x3D2;"
    },
    {
        "decimal": "&#982;",
        "entity": "&piv;",
        "html": "ϖ",
        "hex": "&#x3D6;"
    },
    {
        "decimal": "&#338;",
        "entity": "&OElig;",
        "html": "Œ",
        "hex": "&#x152;"
    },
    {
        "decimal": "&#339;",
        "entity": "&oelig;",
        "html": "œ",
        "hex": "&#x153;"
    },
    {
        "decimal": "&#352;",
        "entity": "&Scaron;",
        "html": "Š",
        "hex": "&#x160;"
    },
    {
        "decimal": "&#353;",
        "entity": "&scaron;",
        "html": "š",
        "hex": "&#x161;"
    },
    {
        "decimal": "&#376;",
        "entity": "&Yuml;",
        "html": "Ÿ",
        "hex": "&#x178;"
    },
    {
        "decimal": "&#402;",
        "entity": "&fnof;",
        "html": "ƒ",
        "hex": "&#x192;"
    },
    {
        "decimal": "&#710;",
        "entity": "&circ;",
        "html": "ˆ",
        "hex": "&#x2C6;"
    },
    {
        "decimal": "&#732;",
        "entity": "&tilde;",
        "html": "˜",
        "hex": "&#x2DC;"
    },
    {
        "decimal": "&#8194;",
        "entity": "&ensp;",
        "html": " ",
        "hex": "&#x2002;"
    },
    {
        "decimal": "&#8195;",
        "entity": "&emsp;",
        "html": " ",
        "hex": "&#x2003;"
    },
    {
        "decimal": "&#8201;",
        "entity": "&thinsp;",
        "html": " ",
        "hex": "&#x2009;"
    },
    {
        "decimal": "&#8204;",
        "entity": "&zwnj;",
        "html": "‌",
        "hex": "&#x200C;"
    },
    {
        "decimal": "&#8205;",
        "entity": "&zwj;",
        "html": "‍",
        "hex": "&#x200D;"
    },
    {
        "decimal": "&#8206;",
        "entity": "&lrm;",
        "html": "‎",
        "hex": "&#x200E;"
    },
    {
        "decimal": "&#8207;",
        "entity": "&rlm;",
        "html": "‏",
        "hex": "&#x200F;"
    },
    {
        "decimal": "&#8211;",
        "entity": "&ndash;",
        "html": "–",
        "hex": "&#x2013;"
    },
    {
        "decimal": "&#8212;",
        "entity": "&mdash;",
        "html": "—",
        "hex": "&#x2014;"
    },
    {
        "decimal": "&#8216;",
        "entity": "&lsquo;",
        "html": "‘",
        "hex": "&#x2018;"
    },
    {
        "decimal": "&#8217;",
        "entity": "&rsquo;",
        "html": "’",
        "hex": "&#x2019;"
    },
    {
        "decimal": "&#8218;",
        "entity": "&sbquo;",
        "html": "‚",
        "hex": "&#x201A;"
    },
    {
        "decimal": "&#8220;",
        "entity": "&ldquo;",
        "html": "“",
        "hex": "&#x201C;"
    },
    {
        "decimal": "&#8221;",
        "entity": "&rdquo;",
        "html": "”",
        "hex": "&#x201D;"
    },
    {
        "decimal": "&#8222;",
        "entity": "&bdquo;",
        "html": "„",
        "hex": "&#x201E;"
    },
    {
        "decimal": "&#8224;",
        "entity": "&dagger;",
        "html": "†",
        "hex": "&#x2020;"
    },
    {
        "decimal": "&#8225;",
        "entity": "&Dagger;",
        "html": "‡",
        "hex": "&#x2021;"
    },
    {
        "decimal": "&#8226;",
        "entity": "&bull;",
        "html": "•",
        "hex": "&#x2022;"
    },
    {
        "decimal": "&#8230;",
        "entity": "&hellip;",
        "html": "…",
        "hex": "&#x2026;"
    },
    {
        "decimal": "&#8240;",
        "entity": "&permil;",
        "html": "‰",
        "hex": "&#x2030;"
    },
    {
        "decimal": "&#8242;",
        "entity": "&prime;",
        "html": "′",
        "hex": "&#x2032;"
    },
    {
        "decimal": "&#8243;",
        "entity": "&Prime;",
        "html": "″",
        "hex": "&#x2033;"
    },
    {
        "decimal": "&#8249;",
        "entity": "&lsaquo;",
        "html": "‹",
        "hex": "&#x2039;"
    },
    {
        "decimal": "&#8250;",
        "entity": "&rsaquo;",
        "html": "›",
        "hex": "&#x203A;"
    },
    {
        "decimal": "&#8254;",
        "entity": "&oline;",
        "html": "‾",
        "hex": "&#x203E;"
    },
    {
        "decimal": "&#8364;",
        "entity": "&euro;",
        "html": "€",
        "hex": "&#x20AC;"
    },
    {
        "decimal": "&#8482;",
        "entity": "&trade;",
        "html": "™",
        "hex": "&#x2122;"
    },
    {
        "decimal": "&#8592;",
        "entity": "&larr;",
        "html": "←",
        "hex": "&#x2190;"
    },
    {
        "decimal": "&#8593;",
        "entity": "&uarr;",
        "html": "↑",
        "hex": "&#x2191;"
    },
    {
        "decimal": "&#8594;",
        "entity": "&rarr;",
        "html": "→",
        "hex": "&#x2192;"
    },
    {
        "decimal": "&#8595;",
        "entity": "&darr;",
        "html": "↓",
        "hex": "&#x2193;"
    },
    {
        "decimal": "&#8596;",
        "entity": "&harr;",
        "html": "↔",
        "hex": "&#x2194;"
    },
    {
        "decimal": "&#8629;",
        "entity": "&crarr;",
        "html": "↵",
        "hex": "&#x21B5;"
    },
    {
        "decimal": "&#8968;",
        "entity": "&lceil;",
        "html": "⌈",
        "hex": "&#x2308;"
    },
    {
        "decimal": "&#8969;",
        "entity": "&rceil;",
        "html": "⌉",
        "hex": "&#x2309;"
    },
    {
        "decimal": "&#8970;",
        "entity": "&lfloor;",
        "html": "⌊",
        "hex": "&#x230A;"
    },
    {
        "decimal": "&#8971;",
        "entity": "&rfloor;",
        "html": "⌋",
        "hex": "&#x230B;"
    },
    {
        "decimal": "&#9674;",
        "entity": "&loz;",
        "html": "◊",
        "hex": "&#x25CA;"
    },
    {
        "decimal": "&#9824;",
        "entity": "&spades;",
        "html": "♠",
        "hex": "&#x2660;"
    },
    {
        "decimal": "&#9827;",
        "entity": "&clubs;",
        "html": "♣",
        "hex": "&#x2663;"
    },
    {
        "decimal": "&#9829;",
        "entity": "&hearts;",
        "html": "♥",
        "hex": "&#x2665;"
    },
    {
        "decimal": "&#9830;",
        "entity": "&diams;",
        "html": "♦",
        "hex": "&#x2666;"
    }

];

var listType = [
    'decimal',
    'entity',
    'hex'
];

var whitespace = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003' +
         '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
         '\u2029\uFEFF';

/**
 * String Unescape
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @param {string=} type Configuration
 * @returns {string} Returns unescape string
 * @example
 *
 * stringUnEscape('yahii&nbsp;&amp;&nbsp;adad&nbsp;&circ;ss')
 *=>"yahii & adad ^ss"
 */
function stringUnEscape (value, type) {

    var typeVal = type || "entity";

    if (indexOfNotExist(listType, typeVal)) {

        return "";

    }

    var regexReplace = toString(value).replace(/(&[#]{0,1}[a-zA-Z-0-9]{1,};)/g, function (str1) {

        var search = {};

        search[typeVal] =str1;

        var whr = whereOnce(entity, search);

        return isEmpty(whr)
            ? str1
            : first(whr).html;

    });

    return regexReplace;

}

/**
 * Cleanup unnecessary character
 *
 * @since 1.4.86
 * @category Collection
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the json.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function cleanValue (value) {

    var refValue = value;

    refValue = refValue.replace(/[\t\n\r\s]+$/g, "");
    refValue = refValue.replace(/^[\t\n\r\s]+/g, "");

    return refValue;

}

/**
 * Parse Json object
 *
 * @since 1.4.86
 * @category Collection
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the json.
 * @example
 *
 * getTagVal('{}' )
 *=>{}
 */
function getTagVal (value) {

    if ((/^\{/gmi).test(value) && (/\}$/).test(value)) {

        return {

            "ret_value": cleanValue(value.replace(/^\{/g, "").replace(/\}$/g, "")),
            "tag_close": "}",
            "tag_open": "{",
            "type": "json"
        };

    }
    if ((/^\[/gmi).test(value) && (/\]$/gmi).test(value)) {

        return {
            "ret_value": cleanValue(value.replace(/^\[/g, "").replace(/\]$/g, "")),
            "tag_close": "]",
            "tag_open": "[",
            "type": "array"
        };

    }

    return {
        "ret_value": "",
        "tag_close": "",
        "tag_open": "",
        "type": "none"
    };

}

/**
 * Parse Json object
 *
 * @since 1.4.86
 * @category Collection
 * @param {any} values The second number in an addition.
 * @returns {any} Returns the json.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function encodeStripValueQoute (values) {

    var str_call = "";
    var reserv_str = "";
    var arg_call_list = [];

    var str_type = "";

    each(values.split(""), function (value) {

        var value_indx=value;

        var row_str_type = "-";

        if (value_indx === '"') {

            row_str_type = "double_qoute";

        }
        if (value_indx === "'") {

            row_str_type = "single_qoute";

        }
        if (str_type === "") {

            // eslint-disable-next-line no-negated-condition
            if (row_str_type !== '-') {

                str_type = row_str_type;
                str_call += "#@"+arg_call_list.length+"@#";

            } else {

                str_call += value_indx;

            }

        } else {

            if (row_str_type ==="-") {

                reserv_str += value_indx;

            }

            if (str_type === row_str_type) {

                arg_call_list.push({
                    "arg": reserv_str,
                    "qoute_type": str_type
                });
                str_type = "";
                reserv_str = "";

            }

        }

    });

    return {
        arg_call_list,
        str_call
    };

}

/**
 * Parse Json object
 *
 * @since 1.4.86
 * @category Collection
 * @param {any} str_call String you want to convert to
 * @param {any} arg_call_list The second number in an addition.
 * @param {boolean} keyOnly The second number in an addition.
 * @returns {any} Returns the json.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function decodeStripValueQoute (str_call, arg_call_list, keyOnly) {

    var count = 0;

    var repl= str_call.replace(/#@([0-9]{1,})@#/gi, function (__, va1) {

        var getObj = arg_call_list[va1];

        count +=one;

        return '"'+ getObj.arg +'"';

    });

    if (count===zero && keyOnly) {

        repl = '"'+repl+'"';

    }

    return repl;

}

/**
 * Parse Json object
 *
 * @since 1.4.86
 * @category Collection
 * @param {any} glb String you want to convert to
 * @param {any} config The second number in an addition.
 * @returns {any} Returns the json.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function callbackParse (glb, config) {

    if (glb.type === 'json') {

        var encodeStr = encodeStripValueQoute(glb.ret_value, config);

        var splitKeyValue = encodeStr.str_call.split(":");

        if (splitKeyValue.length <two) {

            throw new Error("No Key found");

        }

        var reviewSubValue = getTagVal(decodeStripValueQoute(cleanValue(splitKeyValue.splice(one).join(": ")), encodeStr.arg_call_list, false));

        if (reviewSubValue.type !== "none") {

            return glb.tag_open+decodeStripValueQoute(cleanValue(splitKeyValue[zero]), encodeStr.arg_call_list, true)+": "+callbackParse(reviewSubValue, config) +glb.tag_close;

        }

        var valueSplit = encodeStr.str_call.split(",");

        var list_obj = [];

        each(valueSplit, function (value) {

            var value_split = value.split(":");

            if (value_split.length <two) {

                throw new Error("No Key found");

            }
            var argValueJoin =value_split.splice(one).join(": ");
            var objSubVal = decodeStripValueQoute(cleanValue(argValueJoin), encodeStr.arg_call_list, false);
            var tagVal = getTagVal(objSubVal);

            if (tagVal.type === 'none') {

                list_obj.push(decodeStripValueQoute(cleanValue(value_split[zero]), encodeStr.arg_call_list, true).toString()+ ": "+ objSubVal);

            } else {

                list_obj.push(decodeStripValueQoute(cleanValue(value_split[zero]), encodeStr.arg_call_list, true).toString()+ ": "+ callbackParse(tagVal, config));

            }

        });

        return glb.tag_open+ list_obj.join(", ") +glb.tag_close;

    }

    if (glb.type === 'array') {

        var encodeStr = encodeStripValueQoute(glb.ret_value, config);

        var valueSplit = encodeStr.str_call.split(",");

        var reviewSubValue = getTagVal(glb.ret_value);

        if (reviewSubValue.type !== "none") {

            return glb.tag_open+callbackParse(reviewSubValue, config) +glb.tag_close;

        }

        var list_obj = [];

        each(valueSplit, function (value) {

            var objSubVal = decodeStripValueQoute(cleanValue(value), encodeStr.arg_call_list, false);
            var tagVal = getTagVal(objSubVal);

            if (tagVal.type === 'none') {

                list_obj.push(objSubVal);

            } else {

                list_obj.push(callbackParse(tagVal, config));

            }

        });

        return glb.tag_open+ list_obj.join(", ") +glb.tag_close;

    }

    return "";

}

/**
 * Parse from String to JSON object
 *
 * @since 1.4.86
 * @category Collection
 * @param {string} value String you want to convert to json object
 * @param {any=} config Option you want to set in this function.
 * @returns {any} Returns the json object.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function parseJson (value, config) {

    var defaultConfig = varExtend(config, {});

    var stripValue=cleanValue(stringUnEscape(value));

    var tagVal = getTagVal(stripValue);

    var obgM = callbackParse(tagVal, defaultConfig);

    if (obgM === "") {

        return null;

    }
    var dataObj = JSON.parse(obgM);

    return dataObj;

}

_stk.parseJson=parseJson;


/**
 * Data String from JSON object
 *
 * @since 1.0.1
 * @category Collection
 * @param {string} str Object you want to convert to JSON string
 * @returns {string} Return JSON string
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function datastring (str) {

    var data_s="";

    if (typeof str === "string") {

        if (str.indexOf("'")) {

            data_s='&quot;'+str+'&quot;';

        } else if (str.indexOf('"')) {

            data_s='&quot;'+str+'&quot;';

        } else {

            data_s=str;

        }

    } else {

        data_s=str;

    }

    return data_s;

}

/**
 * Parse String
 *
 * @since 1.0.1
 * @category Seq
 * @param {number} rawCount The second number in an addition.
 * @param {any} rawConfig The second number in an addition.
 * @param {any} rawValue The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function parseStringCore (rawCount, rawConfig, rawValue) {

    return curryArg(function (refCount, refConfig, value) {

        var str="";
        var str_strt="";
        var str_end="";
        var inc=0;
        var incrementDefaultValue=1;
        var inc_main=null;

        if (has(value)) {

            if (getTypeof(value) === "json") {

                str_strt="{";
                str_end="}";

                each(value, function (_value, _key) {

                    inc_main=inc<count(value)-incrementDefaultValue
                        ?","
                        :"";

                    if (typeof _value === "object"&&_value !== null) {

                        str += datastring(_key)+":"+ parseStringCore(refCount+one, refConfig, _value) +""+inc_main;

                    } else {

                        str += datastring(_key)+":"+datastring(_value)+""+inc_main;

                    }

                    inc += incrementDefaultValue;

                });

            }
            if (getTypeof(value) === "array") {

                str_strt="[";
                str_end="]";

                each(value, function (_value) {

                    inc_main=inc<count(value)-incrementDefaultValue
                        ?","
                        :"";

                    if (typeof _value === "object") {

                        str += parseStringCore(refCount+one, refConfig, _value) +""+inc_main;

                    } else {

                        str += datastring(_value)+""+inc_main;

                    }

                    inc += incrementDefaultValue;

                });

            }

        }

        return (str_strt+str+str_end).replace(/[\r\t\n\s]{1,}/g, "&nbsp;").replace(/(&quot;)/gi, '"');

    }, [
        rawCount,
        rawConfig,
        rawValue
    ], two);

}

/**
 * Parse from JSON object to String
 *
 * @since 1.4.86
 * @category
 * @param {any} value The Object that you want to convert to string in json format.
 * @param {any=} config Option you want to set in this function.
 * @returns {string} Returns the string in json format.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function parseString (value, config) {

    var defaultConfig = varExtend(config, {});

    var data = parseStringCore(zero, defaultConfig, value);

    return data;

}

_stk.parseString=parseString;


/**
 * Perform left to right function composition. first arguemnt will be default value
 *
 * @since 1.4.86
 * @category Condition
 * @param {?} arg Arguments in function
 * @returns {any} Returns any value.
 * @example
 *
 * pipe(Math.pow,add(1))(11,2)
 * // => 122
 */
function pipe () {

    var arg=arguments;

    var pipeConst = first(arg);
    var varLimit = limit(arg, one);
    var that = this;

    return curryArg(function () {

    var rawValue=arguments;

        return baseReduce(pipeConst.apply(that, rawValue), varLimit, function (total, value) {

            if (getTypeofInternal(value) === "function") {

                total = value.call(that, total);

            }

            return total;

        });

    // eslint-disable-next-line padded-blocks
    // eslint-disable-next-line no-undefined
    }, arrayRepeat(undefined, pipeConst.length), pipeConst.length);

}

_stk.pipe=pipe;


/**
 * To create single random value from array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} valueArray Array
 * @param {number} minValue Minimum value base on index
 * @param {number} maxValue  Max value base on index
 * @returns {string|number} Return string or number in array
 * @example
 *
 * random([10,20,30],0,3 )
 *=>'[20]'
 */
function random (valueArray, minValue, maxValue) {

    var emptyDefaultValue=0;
    var ran_min=has(minValue)
        ?minValue
        :emptyDefaultValue;
    var ran_max=has(maxValue)
        ?maxValue+ran_min
        :count(valueArray);
    var math_random = Math.round(Math.random()*ran_max);

    if (math_random< count(valueArray) && math_random >=emptyDefaultValue) {

        return toArray(valueArray[math_random]);

    }

    return toArray(valueArray[math_random % count(valueArray)]);

}

_stk.random=random;

_stk.range=range;


/**
 * Reduce function
 *
 * @since 1.4.8
 * @category Core
 * @param {any} defaultValue Starting value that you want to use as reference
 * @param {any[]} listData Array value that you want to map
 * @param {any} func Callback function for how to map the data
 * @returns {number} Return redue value
 * @example
 *
 * reduce(2,[1,2],(total,value)=>total+value)
 * // => 5
 */
function reduce (defaultValue, listData, func) {

    var that = this;

    return curryArg(function (rawDefaultValue, rawListData, rawFunc) {

        return baseReduce.apply(that, [
            rawDefaultValue,
            rawListData,
            rawFunc
        ]);

    }, [
        defaultValue,
        listData,
        func
    ], three);

}

_stk.reduce=reduce;


/**
 * Regex Count Group number
 *
 * @since 1.4.7
 * @category String
 * @param {any} value Value you want to convert in array
 * @returns {number} Return in array.
 * @example
 *
 * regexCountGroup('/(abs|scs)@0@@1@/')
 *=>[1]
 */
function regexCountGroup (value) {

    var one =1;

    return new RegExp(toString(value) + '|').exec('').length - one;

}

_stk.regexCountGroup=regexCountGroup;

_stk.remove=remove;


/**
 * Remove data in either JSON or Array using key or woth value, a revise logic
 *
 * @since 1.4.85
 * @category Collection
 * @param {any} objectValue Json or array
 * @param {any} value if objectValue, json is must be object or array index you want to remove
 * @returns {any[]} Returns the total.
 * @example
 *
 * removeFromKey([1,2,3],0 )
 *=>[2, 3]
 */
function removeFromKey (objectValue, value) {

    var type_js=getTypeof(objectValue);
    var reslt =null;

    if (type_js === "array") {

        reslt=[];
        each(objectValue, function (av, ak) {

            if (parseInt(ak) !== value) {

                reslt.push(av);

            }

        });

        return reslt;

    }

    if (type_js === "json") {

        reslt={};

        each(objectValue, function (av, ak) {

            if (has(objectValue, ak) === false) {

                reslt[ak]=av;

            }

        });

        return reslt;

    }

    return [];

}

_stk.removeFromKey=removeFromKey;


/**
 * Repeat string value
 *
 * @since 1.0.1
 * @category String
 * @param {string=} value String you want to duplicate
 * @param {number=} valueRepetion how many times you want to repeate
 * @returns {string} Return in string or number.
 * @example
 *
 * repeat("s",1 )
 *=>'ss'
 */
function repeat (value, valueRepetion) {

    var emptyDefaultValue=0;
    var nm_rpt=valueRepetion||emptyDefaultValue;
    var nm_str=value||"";

    return arrayRepeat(nm_str, nm_rpt).join("");

}

_stk.repeat=repeat;


/**
 * Random Decimal
 *
 * @since 1.0.1
 * @category Math
 * @param {number} value Int or Double value type
 * @param {number=} maxValue limit decimal
 * @returns {number} Returns the total.
 * @example
 *
 * roundDecimal(11.1111111,3 )
 *=>11.11
 */
function roundDecimal (value, maxValue) {

    var emptyDefaultValue=0;
    var onceDefaultValue=1;
    var twoDefaultValue=2;
    var tenDefaultValue=10;
    var jsn=value||emptyDefaultValue;
    var str_dec=jsn.toString().split(".");
    var s_dmin=0;
    var s_dmax=maxValue||twoDefaultValue;

    if (count(str_dec) === twoDefaultValue) {

        var p_cnts=count(str_dec[onceDefaultValue].toString().split(""));
        var delmts=p_cnts <= s_dmin
            ?s_dmin
            :s_dmax;
        var dec_s=tenDefaultValue**delmts;

        return Math.round(parseFloat(jsn*dec_s))/dec_s;

    }

    return jsn;

}

_stk.roundDecimal=roundDecimal;

_stk.selectInData=selectInData;


/**
 * Set Data in array or json using string to search the data either by its key or index, given a value to update the data.
 *
 * @since 1.4.87
 * @category Collection
 * @param {any=} objectValue Either Json or Array data.
 * @param {any=} split_str Search key or index.
 * @param {any=} updateValue Value to update the data.
 * @returns {any} Returns the total.
 * @example
 *
 * setData({"s":1},"s",2)
 *=> 2
 */
function setData (objectValue, split_str, updateValue) {

    if (!has(objectValue)) {

        return empty(objectValue);

    }

    return curryArg(function (rawObjectValue, rawSplit_str, rawUpdateValue) {

        if (isEmpty(rawSplit_str)) {

            return empty(rawObjectValue);

        }

        var spl= schemaSplitData(rawSplit_str);

        return baseReduce(rawObjectValue, [spl], function (total, value) {

            if (getTypeofInternal(total) === "json") {

                valueToUpdate(total, value, rawUpdateValue);

            }
            if (getTypeofInternal(total) === "array") {

                var rawTotal = {};

                valueToUpdate(rawTotal, value, rawUpdateValue);
                total = [rawTotal];

            }

            return total;

        });

    }, [
        objectValue,
        split_str,
        updateValue
    ]);

}

/**
 * Given a value to update the data in array or json
 *
 * @since 1.4.87
 * @category Collection
 * @param {any} objectValue Either Json or Array data.
 * @param {any[]} whereStr Either Json or Array data.
 * @param {any} updateValue Search key or index.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=> 1
 * @example
 * getData({"a":{"a":2},"b":{"a":3}},"a:a")
 *=> {a: 2}
 */
function valueToUpdate (objectValue, whereStr, updateValue) {

    var getRmoveValue = remove(whereStr, zero);

    if (isEmpty(getRmoveValue)) {

        objectValue[first(whereStr)] = updateValue;

    } else {

        if (has(objectValue, first(whereStr)) === false) {

            objectValue[first(whereStr)] = {};

        }
        valueToUpdate(objectValue[first(whereStr)], getRmoveValue, updateValue);

    }

}

_stk.setData=setData;


/**
 * Shuffle data in array
 *
 * @since 1.0.1
 * @update 1.4.86
 * @category Array
 * @param {any[]} objectValue Array argmuments that you want to shuffle
 * @returns {any[]} Shuffle return value in array
 * @example
 *
 * shuffle([1,2,3])
 *=>[2,3,1]
 */
function shuffle (objectValue) {

    var emptyDefaultValue=0;
    var onceDefaultValue=1;
    var output=[];
    var rawObjectValue = clone(objectValue);
    var valueType=[
        "array",
        "json"
    ];

    if (indexOf(valueType, getTypeof(objectValue))>-onceDefaultValue) {

        var counts=count(objectValue)-onceDefaultValue;

        for (var currentIndex=counts; currentIndex>=emptyDefaultValue;) {

            var rowValue = random(rawObjectValue);

            rawObjectValue = clone(removeFromKey(rawObjectValue, indexOf(rawObjectValue, first(rowValue))));
            output.push(first(rowValue));
            currentIndex -= onceDefaultValue;

        }

    }

    return output;

}

_stk.shuffle=shuffle;


/**
 * In array, you need to check all value atleast one true
 *
 * @since 1.4.8
 * @category Condition
 * @param {...any?} arg List of value you need to check if some are true
 * @returns {boolean} Returns true or false.
 * @example
 *
 * someValid(true, false)
 * // => true
 */
function someValid () {

    var arg=arguments;

    return curryArg(function () {

    var rawValue=arguments;

        return baseCountValidList(rawValue);

    }, arg) >= one;

}

_stk.someValid=someValid;


/**
 * Sort By
 *
 * @since 1.4.87
 * @category Array
 * @param {any[]} objectValue List of array you want to sort
 * @param {any=} func Callback function or sort type
 * @returns {any[]} Returns the total.
 * @example
 *
 * sort([2,3,1])
 *=>[1,2,3]
 */
function baseSort (objectValue, func) {

    var jsonn=objectValue;

    var js_m=getTypeofInternal(jsonn) === "json"
        ?each(jsonn)
        :jsonn;

    var finalResponse=js_m.sort(function (orderA, orderB) {

        if (has(func) && getTypeofInternal(func) === 'function') {

            return func(orderA, orderB);

        }

        return orderA- orderB;

    });

    return finalResponse;

}

/**
 * Sort array
 *
 * @since 1.0.1
 * @category Array
 * @param {any[]} objectValue List of array you want to sort
 * @param {boolean=} order True for ascend then false for descend
 * @param {string=} type Callback function or sort type [any, lowercase, uppercase]
 * @returns {any[]} Returns the total.
 * @example
 *
 * sort([2,3,1])
 *=>[1,2,3]
 */
function sort (objectValue, order, type) {

    var asc=true;
    var types='any';

    if (has(order) && getTypeof(order) === 'boolean') {

        asc= order;

    }

    if (has(type) && getTypeof(type) === 'string') {

        types= type;

    }

    var finalResponse=baseSort(objectValue, function (orderA, orderB) {

        var sortOrderA = orderA;
        var sortOrderB = orderB;

        if (getTypeof(orderA) === "string" && getTypeof(orderB) === "string") {

            if (isEmpty(types) === false) {

                if (types === 'any') {

                    sortOrderA =orderA.charCodeAt();
                    sortOrderB= orderB.charCodeAt();

                }
                if (types === 'lowercase') {

                    sortOrderA =orderA.toLowerCase().charCodeAt();
                    sortOrderB= orderB.toLowerCase().charCodeAt();

                }

                if (types === 'uppercase') {

                    sortOrderA =orderA.toUpperCase().charCodeAt();
                    sortOrderB= orderB.toUpperCase().charCodeAt();

                }

            }

        }

        if (asc) {

            return sortOrderA - sortOrderB;

        }

        return sortOrderB - sortOrderA;

    });

    return finalResponse;

}

_stk.sort=sort;


/**
 * Sort By function is used to sort an array of values.
 *
 * @since 1.4.87
 * @category Array
 * @param {any[]} objectValue List of array you want to sort
 * @param {Function} func Callback function or sort type
 * @returns {any[]} Returns the total.
 * @example
 *
 * sort([2,3,1])
 *=>[1,2,3]
 */
function sortBy (objectValue, func) {

    var finalResponse=baseSort(objectValue, function (orderA, orderB) {

        if (has(func) && getTypeof(func) === 'function') {

            return func(orderA, orderB);

        }

        return orderA - orderB;

    });

    return finalResponse;

}

_stk.sortBy=sortBy;
/**
 * Split string for special cases
 *
 * @since 1.4.8
 * @category Seq
 * @param {string} value String to split
 * @returns {string} Returns the total.
 * @example
 *
 * stringSplit("split-this-string")
 *=>"split this string"
 */
function stringSplit (value) {

    return value.trim()
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([-_.\s]{1,})/g, ' ')
        .toLowerCase();

}

/**
 * String Camel case
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @returns {string} Returns camel sting data
 * @example
 *
 * stringCamelCase('the fish is goad   with goat-1ss')
 *=> 'theFishIsGoadWithGoat1ss'
 */
function stringCamelCase (value) {

    return stringSplit(toString(value))
        .replace(/(\s[a-z])/g, function (ss1) {

            return ss1.toUpperCase();

        })
        .split(" ")
        .join("");

}

_stk.stringCamelCase=stringCamelCase;


/**
 * String Capitalize
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @param {string=} option Type of captalize optional
 * @returns {string} Returns Capitalize sting data
 * @example
 *
 * stringCapitalize('the fish is goad   with goat-1ss','all')
 *=> 'The Fish Is Goad   With Goat-1ss'
 * stringCapitalize('the fish is goad   with goat-1ss')
 *=> 'The fish is goad   with goat-1ss'
 */
function stringCapitalize (value, option) {

    if (option === "all") {

        return stringLowerCase(value).replace(/(\s[a-z]|\b[a-z])/g, function (ss1) {

            return ss1.toUpperCase();

        });

    }

    return stringLowerCase(value).replace(/([a-z]{1})/, function (ss1) {

        return ss1.toUpperCase();

    });

}

_stk.stringCapitalize=stringCapitalize;


/**
 * String Escape
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @param {string=} type Configuration
 * @returns {string} Returns escape string
 * @example
 *
 * stringEscape("yahii & adad ^ss")
 *=> 'yahii&nbsp;&amp;&nbsp;adad&nbsp;&circ;ss'
 */
function stringEscape (value, type) {

    var typeVal = type || "entity";

    if (indexOfNotExist(listType, typeVal)) {

        return "";

    }

    var regexReplace = toString(value).replace(/([\s<>"'^&{}])/g, function (str1) {

        var search = {"html": str1};

        var whr = whereOnce(entity, search);

        return isEmpty(whr)
            ? str1
            : first(whr)[typeVal];

    });

    return regexReplace;

}

_stk.stringEscape=stringEscape;


/**
 * String Kebab case
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @returns {string} Returns Kebab sting data
 * @example
 *
 * stringKebabCase('the fish is goad   with goat-1ss')
 *=> 'the-fish-is-goad-with-goat-1ss'
 */
function stringKebabCase (value) {

    return stringSplit(toString(value))
        .split(" ")
        .join("-");

}

_stk.stringKebabCase=stringKebabCase;

_stk.stringLowerCase=stringLowerCase;


/**
 * String Snake case
 *
 * @since 1.3.1
 * @category String
 * @param {string} value String data
 * @returns {string} Returns Snake sting data
 * @example
 *
 * stringSnakeCase('the fish is goad   with goat-1ss')
 *=> 'the_fish_is_goad_with_goat_1ss'
 */
function stringSnakeCase (value) {

    return stringSplit(toString(value))
        .split(" ")
        .join("_");

}

_stk.stringSnakeCase=stringSnakeCase;


/**
 * String Substr
 *
 * @since 1.4.5
 * @category String
 * @param {string} value String data
 * @param {number} minValue minimum value
 * @param {number=} maxValue maximum value
 * @returns {string} Returns camel sting data
 * @example
 *
 * stringSubs('The fish is goad   with Goat-1ss')
 *=> 'the fish is goad   with goat-1ss
 */
function stringSubs (value, minValue, maxValue) {

    if (has(maxValue)) {

        return toString(value).substring(minValue, maxValue);

    }

    return toString(value).substring(minValue);

}

_stk.stringSubs=stringSubs;

_stk.stringUnEscape=stringUnEscape;


/**
 * String Upper case case
 *
 * @since 1.4.5
 * @category String
 * @param {string} value String data
 * @returns {string} Returns camel sting data
 * @example
 *
 * stringUpperCase('The fish is goad   with Goat-1ss')
 *=> 'THE FISH IS GOAD   WITH GOAT-1SS'
 */
function stringUpperCase (value) {

    return toString(value).toUpperCase();

}

_stk.stringUpperCase=stringUpperCase;

_stk.subtract=subtract;


/**
 * Swapping the value either string or array in there specific position
 *
 * @since 1.4.86
 * @category Collection
 * @param {number} firstValue The data you want to map
 * @param {number} secondValue data that you want to merge
 * @param {any[]|string} listValue Passing value either array or string
 * @returns {any} Return map either JSON or Array
 * @example
 *
 * swap(0, 2, 'foo')
 *=> off
 */
function swap (firstValue, secondValue, listValue) {

    return curryArg(function (rawFirstValue, rawSecondValue, rawListValue) {

        var cloneRawListValueReturn = rawListValue;
        var isSplit = false;

        if (getTypeof(cloneRawListValueReturn) !== "array") {

            cloneRawListValueReturn = toString(cloneRawListValueReturn).split("");
            isSplit = true;

        }

        var cloneRawListValue = clone(cloneRawListValueReturn);

        cloneRawListValueReturn[rawFirstValue] = cloneRawListValue[rawSecondValue];
        cloneRawListValueReturn[rawSecondValue] = cloneRawListValue[rawFirstValue];

        if (isSplit) {

            cloneRawListValueReturn = cloneRawListValueReturn.join("");

        }

        return cloneRawListValueReturn;

    }, [
        firstValue,
        secondValue,
        listValue
    ]);

}

_stk.swap=swap;


/**
 * Get the value from index zero until the last value
 *
 * @since 1.4.86
 * @category Math
 * @param {any[]|string} rawList Second number
 * @param {number} startIndex Second number
 * @param {number} lastIndex Second number
 * @returns {number} Returns true or false.
 * @example
 *
 * baseTake(1, 1)
 * // => 1
 */
function baseTake (rawList, startIndex, lastIndex) {

    var refRawList = getTypeofInternal(rawList) === "string"
        ?rawList.split("")
        :rawList;

    var varLimit = limit(refRawList, startIndex, lastIndex);

    var rawGetValue = getValue(varLimit);

    return getTypeofInternal(rawList) === "string"
        ?rawGetValue.join("")
        :rawGetValue;

}

/**
 * Get the value from index zero until the last value
 *
 * @since 1.4.86
 * @category Math
 * @param {number} value First number, our first index will start at zero
 * @param {any[]|string} valueList Second number
 * @returns {number} Returns true or false.
 * @example
 *
 * take(1, [1])
 * // => 1
 */
function take (value, valueList) {

    return curryArg(function (rawValue, rawList) {

        return baseTake(rawList, zero, rawValue-one);

    }, [
        value,
        valueList
    ], two);

}

_stk.take=take;


/**
 * Template value
 *
 * @since 1.0.1
 * @category String
 * @param {string} templateString Template string
 * @param {any} data Parameter to replace
 * @param {any=} option The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 *  templateValue("<!- test !>", {"test": 11})
 *=>'11'
 */
function templateValue (templateString, data, option) {

    var oneDefaultValue=1;

    templateString = templateValueInternal(toString(templateString), data);

    var default_option=varExtend({
        "escape": "<!-([\\s\\S]+?)!>",
        "evaluate": "<![^=-]([\\s\\S]+?)!>",
        "interpolate": "<!=([\\s\\S]+?)!>"
    }, option);

    var valueType=[
        "array",
        "json"
    ];

    var regexp = new RegExp([
        default_option.evaluate,
        default_option.interpolate,
        default_option.escape
    ].join("|")+"|$", "g");

    var source = "__p += '";
    var index = 0;

    var escapes = {
        '\n': 'n',
        '\r': 'r',
        "'": "'",
        '\\': '\\',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function (match) {

        return '\\' + escapes[match];

    };

    templateString.replace(regexp, function (match, evaluate, interpolate, escape, offset) {

        source += templateString.slice(index, offset).replace(escaper, escapeChar);
        index = offset+match.length;

        if (evaluate) {

            source += "';\n"+evaluate+"\n__p += '";

        }

        if (interpolate) {

            source += "'+\n((__t=("+interpolate+")) == null?'':__t)+\n'";

        }

        if (escape) {

            source += "'+\n((__t=("+interpolate+")) == null?'':__t)+\n'";

        }

        return match;

    });

    source += "';\n";

    source = "var __t,__p='',__j=[].join," +
        "print=function(){__p += __j.call(arguments,'');};\n" +
    source + " return __p;\n";

    try {

        var val_source = "";

        if (getTypeof(data) === "json") {

            for (var key in data) {

                if (has(data, key)) {

                    val_source += 'var '+key+' = '+(indexOf(valueType, getTypeof(data[key]))>-oneDefaultValue
                        ?parseString(data[key])
                        :'"'+data[key]+'"')+';';

                }

            }

        }

        var render = new Function('obj', '_', val_source+source);

        return render.call(this, data, templateValue);

    } catch (error) {

        console.log(error);
        error.source = source;
        throw error;

    }

}

/**
 * Template Value Internal
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} str_raw String from template you need interpolation
 * @param {string} reg Value you want to replace from template
 * @returns {string} Returns template from interpolation
 * @example
 *
 * templateValueInternal("","" )
 *=>'{}'
 */
function templateValueInternal (str_raw, reg) {

    var str=str_raw;
    var strs=str;

    try {

        try {

            var regs=new RegExp("[\\r\\t\\n\\s]{0,}<![-]\\s{0,}(.*?)\\s{0,}!>[\\r\\t\\n\\s]{0,}", "g");

            strs=strs.replace(regs, function (word, mes1) {

                var strs_perd=mes1.replace(".", ":");
                var gtdata=getData(reg, strs_perd);

                return getTypeof(gtdata) === "json"
                    ?""
                    :gtdata;

            });

        } catch (error) {

            console.log(error);

        }

    } catch (error) {

        console.log(error);

    }

    var strs_finl=strs;

    return strs_finl;

}

_stk.templateValue=templateValue;

_stk.toArray=toArray;


/**
 * Logic in convert string or number to valid number
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} regexp The second number in an addition.
 * @param {string|number} defaultVariable The second number in an addition.
 * @param {string|number} nullReplacement The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * dataNumberFormat(/(\d)/g, 0,1)
 *=> 1
 */
function dataNumberFormat (regexp, defaultVariable, nullReplacement) {

    var regp=regexp;
    var intr=defaultVariable;

    if (regp.test(nullReplacement.toString())) {

        intr=nullReplacement;

    }

    if (!has(nullReplacement) || nullReplacement.toString() === "NaN") {

        intr=defaultVariable;

    }
    if (getTypeof(intr) === "string") {

        intr = intr.replace(/[^\d.]/g, "");

    }

    return intr;

}

/**
 * To extract number in string and convert to double, it will also remove all none numeric
 *
 * @since 1.0.1
 * @category Number
 * @param {any} value Value you to convert in double
 * @returns {number} Return in double.
 * @example
 *
 * toDouble("100.1d1")
 *=>100.11
 */
function toDouble (value) {

    var zero = 0.00;

    return parseFloat(dataNumberFormat(/(\d[.]{0,})/g, zero, value === null
        ?zero
        :value));

}

_stk.toDouble=toDouble;


/**
 * To extract number in string and convert to , it will also remove all none numeric
 *
 * @since 1.0.1
 * @category Number
 * @param {any} value Value you to convert in integer
 * @returns {number} Return in integer.
 * @example
 *
 * toInteger("11d")
 *=>11
 */
function toInteger (value) {

    var zero = 0;

    return parseInt(dataNumberFormat(/(\d)/g, zero, value === null
        ?zero
        :value));

}

_stk.toInteger=toInteger;


/**
 *  Converts an object into an array of key-value pairs. if the value is nested object, it will be converted to an array of key-value pairs recursively.
 *
 * @since 1.4.87
 * @category Condition
 * @param {any} value First number
 * @returns {any[]} Returns array
 * @example
 *
 * toPairs({"s":1,"ss":{"a":2}})
 * // => [["s",1],["ss",["a",2]]]
 */
function toPairs (value) {

    if (getTypeofInternal(value) !== "json") {

        throw new Error("Value must be an json");

    }

    return baseReduce([], value, function (total, subValue, subKey) {

        var subArray = [];

        subArray.push(subKey);
        setDepthValue(subArray, subValue);
        total.push(subArray);

        return total;

    });

}

/**
 * To recursively set the value in an array. If the value is a nested object, it will be converted to an array of key-value pairs recursively.
 *
 * @since 1.4.87
 * @category Condition
 * @param {any} arryData First number
 * @param {number} value First number
 * @returns {null} Returns array
 * @example
 *
 * fromPairs([[5,6],[7,2]])
 * // => {5:6,7:2}
 */
function setDepthValue (arryData, value) {

    if (getTypeofInternal(value) === "json") {

        arryData.push(getKey(value));
        setDepthValue(arryData, getValue(value));

    } else {

        arryData.push(value);

    }

}

_stk.toPairs=toPairs;

_stk.toString=toString;


/**
 * String trim  at the end only
 *
 * @since 1.4.86
 * @category String
 * @param {string} value String data that you want to trim
 * @returns {string} Returns trim data in start of string
 * @example
 *
 * trimStart(' The fish is goad   with Goat-1ss ')
 *=> 'The fish is goad   with Goat-1ss '
 */
function trimStart (value) {

    var rx = new RegExp('^[' + whitespace + ']*');

    return toString(value).replace(rx, "");

}

/**
 * String trim at the end only
 *
 * @since 1.4.86
 * @category String
 * @param {string} value String data that you want to trim
 * @returns {string} Returns trim data in end of string
 * @example
 *
 * trimEnd(' The fish is goad   with Goat-1ss ')
 *=> ' The fish is goad   with Goat-1ss'
 */
function trimEnd (value) {

    var rx = new RegExp('[' + whitespace + ']*$');

    return toString(value).replace(rx, "");

}

/**
 * String trim
 *
 * @since 1.4.8
 * @category String
 * @param {string} value String data that you want to trim
 * @returns {string} Returns trim data
 * @example
 *
 * trim(' The fish is goad   with Goat-1ss ')
 *=> 'The fish is goad   with Goat-1ss'
 */
function trim (value) {

    var rawValue = toString(value);

    rawValue = trimStart(rawValue);
    rawValue = trimEnd(rawValue);

    return rawValue.trim();

}

_stk.trim=trim;

_stk.trimEnd=trimEnd;

_stk.trimStart=trimStart;


/**
 * Get only the unique data from array
 *
 * @since 1.4.1
 * @category Array
 * @param {any} value Value you want to convert in array
 * @returns {any[]} Return in array.
 * @example
 *
 * unique([1,2,3,2,3])
 *=>[1,2,3]
 */
function unique (value) {

    if (getTypeof(value) === "array") {

        var uniqArrData = [];

        each(value, function (val) {

            if (indexOfNotExist(uniqArrData, val)) {

                uniqArrData.push(val);

            }

        });

        return uniqArrData;

    }

    return [];

}

/**
 * To create a new array that is the union of all the arrays passed as arguments. The union will contain only unique values.
 *
 * @since 1.4.7
 * @category Relation
 * @param {...any?} arg First number
 * @returns {any[]} Returns true or false.
 * @example
 *
 * union([1,2,3,4,7],[1,2,3,4,5,6,7,8])
 * // => [1, 2, 3, 4, 7, 5, 6, 8]
 */
function union () {

    var arg=arguments;

    return curryArg(function () {

    var rawValue=arguments;

        return baseReduce([], rawValue, function (total, value) {

            if (getTypeofInternal(value) === "array") {

                each(value, function (valEach) {

                    total.push(valEach);

                });

            }

            return unique(total);

        });

    }, arg);

}

_stk.union=union;

_stk.unique=unique;

_stk.varExtend=varExtend;

_stk.where=where;


/**
 *  Get the value in array the value in json that should not in search value of json
 *
 * @since 1.0.1
 * @category Collection
 * @param {any} objectValue Json to Array
 * @param {any} objectValueWhere Data that you exlude in search
 * @param {Function=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * whereNot([{"s1":1,"s2":1},{"s1":2,"s2":2}],{"s1":1})
 *=>[{"s1":2,"s2":2}]
 * whereNot([{"s1":{"s2":2}},{"s1":{"s2":3}}],{"s1.s2":2})
 *=>[{"s1":{"s2":3}}]
 */
function whereNot (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, false, 'where');

}

_stk.whereNot=whereNot;


/**
 *  Get the type if arguments
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isArguments()
 *=> true
 */
function isArguments (value) {

    return getTypeof(value) === "arguments";

}


/**
 *  Get the type if array
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isArray([])
 *=> true
 */
function isArray (value) {

    return getTypeof(value) === "array";

}


/**
 *  Get the type if boolean
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isBoolean(true)
 *=> true
 */
function isBoolean (value) {

    return getTypeof(value) === "boolean";

}


/**
 *  Get the type if date
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isDate(new Date())
 *=> true
 */
function isDate (value) {

    return getTypeof(value) === "date";

}


/**
 *  Get the type if error
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isError(new Error())
 *=> true
 */
function isError (value) {

    return getTypeof(value) === "error";

}


/**
 *  Get the type if function
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isFunction()
 *=> true
 */
function isFunction (value) {

    return getTypeof(value) === "function";

}


/**
 *  Get the type if null
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isNull(null)
 *=> true
 */
function isNull (value) {

    return getTypeof(value) === "null";

}


/**
 *  Get the type if number
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isNumber(1)
 *=> true
 */
function isNumber (value) {

    return getTypeof(value) === "number";

}


/**
 *  Get the type if object
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isObject({})
 *=> true
 */
function isObject (value) {

    return getTypeof(value) === "object";

}


/**
 *  Get the type if promise
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isPromise()
 *=> true
 */
function isPromise (value) {

    return getTypeof(value) === "promise";

}


/**
 *  Get the type if regexp
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isRegexp(/(1)/g)
 *=> true
 */
function isRegexp (value) {

    return getTypeof(value) === "regexp";

}


/**
 *  Get the type if string
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isString('string')
 *=> true
 */
function isString (value) {

    return getTypeof(value) === "string";

}


/**
 *  Get the type if uint16Array
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isUint16Array()
 *=> true
 */
function isUint16Array (value) {

    return getTypeof(value) === "uint16Array";

}


/**
 *  Get the type if uint8Array
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isUint8Array()
 *=> true
 */
function isUint8Array (value) {

    return getTypeof(value) === "uint8Array";

}


/**
 *  Get the type if undefined
 *
 * @since 1.4.7
 * @category Collection
 * @param {any} value Pass any value to check its type
 * @returns {boolean} Return either Json to Array.
 * @example
 *
 * isUndefined(undefined)
 *=> true
 */
function isUndefined (value) {

    return getTypeof(value) === "undefined";

}


_stk.isArguments=isArguments;
_stk.isArray=isArray;
_stk.isBoolean=isBoolean;
_stk.isDate=isDate;
_stk.isError=isError;
_stk.isFunction=isFunction;
_stk.isNull=isNull;
_stk.isNumber=isNumber;
_stk.isObject=isObject;
_stk.isPromise=isPromise;
_stk.isRegexp=isRegexp;
_stk.isString=isString;
_stk.isUint16Array=isUint16Array;
_stk.isUint8Array=isUint8Array;
_stk.isUndefined=isUndefined;
_stk.whereOnce=whereOnce;


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned items from both lists. The returned list is truncated to the length of the shorter of the two input lists
 *
 * @since 1.4.86
 * @category Condition
 * @param {...any?} arg First number
 * @returns {any} Returns true or false.
 * @example
 *
 * zip([1],[2],[3])
 * // => [[1,2,3]]
 */
function zip () {

    var arg=arguments;

    return curryArg(function () {

    var rawValue=arguments;

        var varLimit = limit(rawValue, one);

        return baseReduce([], first(rawValue), function (total, value, key) {

            total.push(baseReduce([value], varLimit, function (totalSub, valueSub) {

                totalSub.push(valueSub[key]);

                return totalSub;

            }));

            return total;

        });

    }, arg);

}

_stk.zip=zip;


 })(typeof window !== "undefined" ? window : this);