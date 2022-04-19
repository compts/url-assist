(function(global){
global._stk={}
/**
 * Get Variable typeof
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * getTypeof([])
 * => array
 */
function getTypeof (objectValue) {

    if (Object.prototype.toString.call(objectValue)==="[object Object]") {

        return "json";

    }

    if (Object.prototype.toString.call(objectValue)==="[object Array]") {

        return "array";

    }
    if (Object.prototype.toString.call(objectValue)==="[object RegExp]") {

        return "regexp";

    }

    return typeof objectValue;

}

/**
 * Append data fir json and array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} val The second number in an addition.
 * @param {any} key The second number in an addition.
 * @returns {any[]} Returns the total.
 * @example
 *
 * append({'as':1}, 'as',2)
 * // => {'as':2}
 */
function append (objectValue, val, key) {

    var typeofs=getTypeof(objectValue);

    if (typeofs === "json") {

        objectValue[key]=val;

    }
    if (typeofs === "array") {

        objectValue.push(val);

    }

    return objectValue;

}
_stk.append=append




/**
 * Check if object has value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @param {any} key The second number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * has({'as':1}, 'as')
 * // => true
 */
function has (value, key) {

    if (typeof key==="undefined") {

        return value!==null && typeof value !=="undefined";

    }

    return Object.prototype.hasOwnProperty.call(value, key);

}

/**
 * Each
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * each([1,2],(key,value)=>{
 *
 * })
 *
 */
function each (objectValue, func) {

    var re_loop=[];
    var typeofs=getTypeof(objectValue);

    if (typeofs==="json"||typeofs==="array"||typeofs==="object") {

        for (var ins in objectValue) {

            if (has(objectValue, ins)) {

                var bool_func = true;

                if (getTypeof(objectValue[ins])==="function") {

                    if ((/\b_/g).test(ins)) {

                        bool_func= false;

                    }

                }

                if (bool_func) {

                    try {

                        if (has(func)) {

                            func(ins, objectValue[ins]);

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
 * Array Count
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {boolean} json_is_empty_check The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * count([1,2])
 * // => 2
 */
function count (objectValue, json_is_empty_check) {

    var cnt=0;
    var incByOne=1;
    var defaultValueForFalse=0;
    var json_is_empty_check_default=json_is_empty_check||false;
    var get_json=getTypeof(objectValue);

    if (has(objectValue)===false) {

        return defaultValueForFalse;

    }

    if (get_json==="array") {

        return objectValue.length;

    } else if (get_json==="object" && has(objectValue, "style")&&has(objectValue, "nodeType")&&has(objectValue, "ownerDocument")) {

        for (var inc in objectValue) {

            if (!isNaN(inc)) {

                cnt+=incByOne;

            }

        }

    } else {

        each(objectValue, function () {

            cnt+=incByOne;

        });

    }

    if (get_json==="json"&&json_is_empty_check_default===true) {

        var jsn_parse=objectValue;
        var cnts=0;

        each(jsn_parse, function () {

            cnts+=incByOne;

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
 * @param {array|object} objectValue The first number in an addition.
 * @param {number} value The first number in an addition.
 * @param {number} start The first number in an addition.
 * @param {number} end The first number in an addition.
 * @param {boolean} isGetLast The first number in an addition.
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

    if (getTypeof(objectValue)==="array") {

        for (var inc=start; inc<end;) {

            if (objectValue[inc]===value) {

                if (isGetLast === false) {

                    return inc;

                }
                referenceValue = inc;

            }

            inc+=incrementDefaultValue;

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
 * @param {any} objectValue The first number in an addition.
 * @param {any} value The first number in an addition.
 * @returns {any} Returns the total.
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
 * Append If Array not Exist
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} arrayObject The second number in an addition.
 * @param {any} value The second number in an addition.
 * @returns {any[]} Returns the total.
 * @example
 *
 * appendIsArrayExist([1], 2)
 * // => [1,2]
 */
function appendIsArrayExist (arrayObject, value) {

    var ary_type=getTypeof(arrayObject);
    var ary_type1=getTypeof(value);
    var notExist=-1;

    if (ary_type ==="array" && ary_type1 ==="array") {

        each(value, function (key, val) {

            if (indexOf(arrayObject, val)===notExist) {

                arrayObject.push(val);

            }

        });

        return arrayObject;

    }

    return [];

}
_stk.appendIsArrayExist=appendIsArrayExist




/**
 * Array Concat
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} arrayObject The second number in an addition.
 * @param {any} arrayValue The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * arrayConcat([1], 2)
 * // => [1,2]
 */
function arrayConcat (arrayObject, arrayValue) {

    var return_val=arrayObject;

    if (getTypeof(return_val)==="array") {

        return return_val.concat(arrayValue);

    }

    return [];

}
_stk.arrayConcat=arrayConcat




/**
 * Array Sum
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} arrayObject The second number in an addition.
 * @param {number} delimeter The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * arraySum([1,2], 2)
 * // => 3.00
 */
function arraySum (arrayObject, delimeter) {

    var sum=0;
    var defaultLimitDecimal = 3;
    var arrayObjects=arrayObject||[];
    var delimeters=delimeter||defaultLimitDecimal;

    each(arrayObjects, function (ak, av) {

        if (has(av)) {

            sum+=parseFloat(av);

        }

    });

    return sum.toFixed(delimeters);

}
_stk.arraySum=arraySum




/**
 * Async replace
 *
 * @since 1.3.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @param {any} search The first number in an addition.
 * @param {any} toReplace The first number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * isEmpty('')
 * // => true
 */
function asyncReplace (value, search, toReplace) {

    try {

        if (getTypeof(toReplace) === "function") {

            var values = [];

            String.prototype.replace.call(value, search, function (...arg) {

                values.push(toReplace(...arg));

                return "";

            });

            return Promise.all(values).then(function (resolvedValues) {

                return String.prototype.replace.call(value, search, function () {

                    return resolvedValues.shift();

                });

            });

        }

        return Promise.resolve(String.prototype.replace.call(value, search, toReplace));

    } catch (error) {

        return Promise.reject(error);

    }

}
_stk.asyncReplace=asyncReplace




/**
 * Map
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {null} Returns the total.
 * @example
 *
 * map([1,2],1,2 )
 *=>[2]
 */
function map (objectValue, func) {

    var strTypeOf =getTypeof(objectValue);
    var emptyDefaultValue=0;
    var incrementDefaultValue=1;
    var value_arry=strTypeOf==="array"
        ?[]
        :{};
    var cnt=emptyDefaultValue;

    each(objectValue, function (key, value) {

        if (has(func)) {

            if (strTypeOf==="array") {

                value_arry.push(func(value, key, cnt));
                cnt+=incrementDefaultValue;

            } else {

                var dataFunc = func(value, key, cnt);

                value_arry[key] = dataFunc;

            }

        }

    });

    return value_arry;

}

/**
 * Get Data
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} split_str The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=>1
 */
function getData (objectValue, split_str) {

    var spl_len=split_str.split(":");
    var spl=[];
    var jsn_total={};

    if (!has(objectValue)) {

        return "";

    }

    each(spl_len, function (key, value) {

        spl.push(value);

    });

    each(spl, function (key, value) {

        try {

            if (has(objectValue, value)) {

                if ((/^\s+$/).test(objectValue[value])===false) {

                    jsn_total=objectValue[value];

                }

            } else {

                if (has(jsn_total, value)) {

                    jsn_total=jsn_total[value];

                }

            }

        } catch (error) {

            console.log(error);

        }

    });

    return jsn_total;

}

/**
 * Array To Object By DataFormat
 *
 * @since 1.3.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} valueFormat The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * arrayToObjectByDataFormat(1)
 *=>[1]
 */
function arrayToObjectByDataFormat (objectValue, valueFormat) {

    return map(objectValue, function (value) {

        return getData(value, valueFormat);

    });

}
_stk.arrayToObjectByDataFormat=arrayToObjectByDataFormat




/**
 * Get JSON Variable
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getJSONVariable([])
 * => []
 */
function getJSONVariable (value) {

    if (getTypeof(value)==="json") {

        return {};

    }

    if (getTypeof(value)==="array") {

        return [];

    }

    return value;

}

/**
 * Append data fir json and array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} val The second number in an addition.
 * @param {any} key The second number in an addition.
 * @returns {any[]} Returns the total.
 * @example
 *
 * append({'as':1}, 'as',2)
 * // => {'as':2}
 */
function append (objectValue, val, key) {

    var typeofs=getTypeof(objectValue);

    if (typeofs === "json") {

        objectValue[key]=val;

    }
    if (typeofs === "array") {

        objectValue.push(val);

    }

    return objectValue;

}

/**
 * Array Clone
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * clone([1,2])
 * // => [1,2]
 */
function clone (objectValue) {

    var variable=getJSONVariable(objectValue);

    each(objectValue, function (key, value) {

        append(variable, value, key);

    });

    return variable;

}
_stk.clone=clone




/**
 * Array Count
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {boolean} json_is_empty_check The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * count([1,2])
 * // => 2
 */
function count (objectValue, json_is_empty_check) {

    var cnt=0;
    var incByOne=1;
    var defaultValueForFalse=0;
    var json_is_empty_check_default=json_is_empty_check||false;
    var get_json=getTypeof(objectValue);

    if (has(objectValue)===false) {

        return defaultValueForFalse;

    }

    if (get_json==="array") {

        return objectValue.length;

    } else if (get_json==="object" && has(objectValue, "style")&&has(objectValue, "nodeType")&&has(objectValue, "ownerDocument")) {

        for (var inc in objectValue) {

            if (!isNaN(inc)) {

                cnt+=incByOne;

            }

        }

    } else {

        each(objectValue, function () {

            cnt+=incByOne;

        });

    }

    if (get_json==="json"&&json_is_empty_check_default===true) {

        var jsn_parse=objectValue;
        var cnts=0;

        each(jsn_parse, function () {

            cnts+=incByOne;

        });

        return cnts;

    }

    return cnt;

}
_stk.count=count




/**
 * Delimiter
 *
 * @since 1.3.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {number} min The second number in an addition.
 * @param {number} max The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * delimiter([1,2])
 * // => 2
 */
function delimiter (objectValue, min, max) {

    var ran_var=[];
    var defaultValueZero=0;
    var ran_min=has(min)
        ?min
        :defaultValueZero;
    var ran_max=has(max)
        ?max
        :count(objectValue);

    each(objectValue, function (key, value) {

        if (ran_min <= parseInt(key) && ran_max >= parseInt(key)) {

            ran_var.push(value);

        }

    });

    return ran_var;

}
_stk.delimiter=delimiter




/**
 * Each
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * each([1,2],(key,value)=>{
 *
 * })
 *
 */
function each (objectValue, func) {

    var re_loop=[];
    var typeofs=getTypeof(objectValue);

    if (typeofs==="json"||typeofs==="array"||typeofs==="object") {

        for (var ins in objectValue) {

            if (has(objectValue, ins)) {

                var bool_func = true;

                if (getTypeof(objectValue[ins])==="function") {

                    if ((/\b_/g).test(ins)) {

                        bool_func= false;

                    }

                }

                if (bool_func) {

                    try {

                        if (has(func)) {

                            func(ins, objectValue[ins]);

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
_stk.each=each




/**
 * Filter
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {null} Returns the total.
 * @example
 *
 * filter([1,2],(key,value)=>{
 *
 * })
 *
 */
function filter (objectValue, func) {

    var jsn_var=getJSONVariable(objectValue);
    var jsn_type=getTypeof(objectValue);

    each(objectValue, function (key, value) {

        if (has(func)) {

            if (func(key, value)===true) {

                if ((/(json|array)/g).test(jsn_type)) {

                    append(jsn_var, value, key);

                } else {

                    jsn_var=value;

                }

            }

        }

    });

    return jsn_var;

}
_stk.filter=filter




/**
 * Get key value
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} jsn The second number in an addition.
 * @param {boolean} typ The second number in an addition.
 * @returns {array|object} Returns the total.
 * @example
 *
 * getKeyVal({"s1":1,"s2":1},"key")
 *=>{"s1":1,"s2":1}
 */
function getKeyVal (jsn, typ) {

    var one =1,
        zero =0;

    var ky=[],
        vl=[];
    var list_raw = [];

    each(jsn, function (kk, vv) {

        ky.push(kk);
        vl.push(vv);
        list_raw.push({
            "key": kk,
            "value": vv
        });

    });
    if (indexOf([
        "key",
        "value"
    ], typ)>-one) {

        var ars=typ==="key"
            ?ky
            :vl;

        return count(ars)===one
            ?ars[zero]
            :ars;

    }
    if (typ ==="first_index") {

        return count(list_raw)>zero
            ?list_raw[zero]
            :null;

    }
    if (typ ==="last_index") {

        return count(list_raw)>zero
            ?list_raw[count(list_raw)-one]
            :null;

    }

    return null;

}

/**
 * First
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {null} Returns the total.
 * @example
 *
 * first([1,2])
 *=>1
 */
function first (objectValue) {

    return getKeyVal(objectValue, "first_index");

}
_stk.first=first




/**
 * Get Data
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} split_str The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=>1
 */
function getData (objectValue, split_str) {

    var spl_len=split_str.split(":");
    var spl=[];
    var jsn_total={};

    if (!has(objectValue)) {

        return "";

    }

    each(spl_len, function (key, value) {

        spl.push(value);

    });

    each(spl, function (key, value) {

        try {

            if (has(objectValue, value)) {

                if ((/^\s+$/).test(objectValue[value])===false) {

                    jsn_total=objectValue[value];

                }

            } else {

                if (has(jsn_total, value)) {

                    jsn_total=jsn_total[value];

                }

            }

        } catch (error) {

            console.log(error);

        }

    });

    return jsn_total;

}
_stk.getData=getData



/**
 * Get JSON Variable
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * getJSONVariable([])
 * => []
 */
function getJSONVariable (value) {

    if (getTypeof(value)==="json") {

        return {};

    }

    if (getTypeof(value)==="array") {

        return [];

    }

    return value;

}
_stk.getJSONVariable=getJSONVariable




/**
 * Get key Object or JSON
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * getKey({"s":1})
 * => s
 */
function getKey (objectValue) {

    return getKeyVal(objectValue, "key");

}
_stk.getKey=getKey


/**
 * Get Variable typeof
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * getTypeof([])
 * => array
 */
function getTypeof (objectValue) {

    if (Object.prototype.toString.call(objectValue)==="[object Object]") {

        return "json";

    }

    if (Object.prototype.toString.call(objectValue)==="[object Array]") {

        return "array";

    }
    if (Object.prototype.toString.call(objectValue)==="[object RegExp]") {

        return "regexp";

    }

    return typeof objectValue;

}
_stk.getTypeof=getTypeof


/**
 * Generate unique value id
 *
 * @since 1.0.1
 * @returns {string} Get Unique Key.
 * @example
 *
 * getUniq()
 * => x2sf2
 */
function getUniq () {

    var defaultRandomValue=2;
    var defaultSubstrValue=36;
    var str_rand1=Math
        .random()
        .toString(defaultSubstrValue)
        .substr(defaultRandomValue)+Math.random()
        .toString(defaultSubstrValue)
        .substr(defaultRandomValue);

    return str_rand1;

}
_stk.getUniq=getUniq




/**
 * Get value of json or array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * getValue({"s":1})
 * => 1
 */
function getValue (objectValue) {

    return getKeyVal(objectValue, "value");

}
_stk.getValue=getValue


/**
 * Check if object has value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @param {any} key The second number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * has({'as':1}, 'as')
 * // => true
 */
function has (value, key) {

    if (typeof key==="undefined") {

        return value!==null && typeof value !=="undefined";

    }

    return Object.prototype.hasOwnProperty.call(value, key);

}
_stk.has=has




/**
 * Check if data is undefined
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} value1 The first number in an addition.
 * @param {any} value2 The second number in an addition.
 * @returns {any} Returns the total.
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
_stk.ifUndefined=ifUndefined




/**
 * Index Of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} value The first number in an addition.
 * @returns {any} Returns the total.
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
_stk.indexOf=indexOf




/**
 * Insert Value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} value The first number in an addition.
 * @returns {any} Returns the total.
 * @example
 * var ss = {"A":1}
 * insert(ss,{'as':1})
 * // => {A: 1, as: 1}
 */
function insert (objectValue, value) {

    if (has(objectValue)) {

        var jsn_type=getTypeof(value);

        if (jsn_type==="json") {

            each(value, function (key, _value) {

                objectValue[key]=_value;

            });

        }

        if (jsn_type==="array") {

            objectValue.push(value);

        }

    }

}
_stk.insert=insert




/**
 * Check if data is empty
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isEmpty('')
 * // => true
 */
function isEmpty (value) {

    var zero =0;

    if (getTypeof(value) === "json" || getTypeof(value) === "array") {

        return count(value, true)===zero;

    }

    return (/^\s*$/gmi).test(value);

}
_stk.isEmpty=isEmpty




/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue1 The first number in an addition.
 * @param {string} objectValue2 The first number in an addition.
 * @param {boolean} isExist The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
function isExact (objectValue1, objectValue2, isExist) {

    if (objectValue2===null) {

        return false;

    }

    var local_is_exist=has(isExist)&&getTypeof(isExist)==="boolean"
        ?isExist
        :true;
    var val_s=(/(json|array)/g).test(getTypeof(objectValue2))
        ?objectValue2
        :[objectValue2];
    var key_s=(/(json|array)/g).test(getTypeof(objectValue1))
        ?objectValue1
        :[objectValue1];
    var cnt=0;
    var incrementDefaultValue=1;
    var emptyDefaultValue=0;
    var notExistArrayDefaultValue=-1;

    each(key_s, function (kk, kv) {

        if (getTypeof(objectValue2)==="json") {

            if (has(val_s[kk])) {

                var local_is_valid = local_is_exist
                    ?val_s[kk]===kv
                    :val_s[kk]!==kv;

                if (local_is_valid) {

                    cnt+=incrementDefaultValue;

                }

            }

        }

        if (getTypeof(objectValue2)==="array") {

            var local_is_valid = local_is_exist
                ?indexOf(val_s, kv)>notExistArrayDefaultValue
                :indexOf(val_s, kv)===notExistArrayDefaultValue;

            if (local_is_valid) {

                cnt+=incrementDefaultValue;

            }

        }

    });

    if (cnt===emptyDefaultValue) {

        return false;

    }

    return cnt===count(objectValue2);

}
_stk.isExact=isExact




/**
 * Is Exact by Regexp
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue1 The first number in an addition.
 * @param {string} objectValue2 The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isExactbyRegExp('')
 * // => false
 */
function isExactbyRegExp (objectValue1, objectValue2) {

    var zero =0;

    if (objectValue2===null) {

        return false;

    }

    if (getTypeof(objectValue2)!=="json" && getTypeof(objectValue2)!=="string" && getTypeof(objectValue2)!=="regexp" && getTypeof(objectValue2)!=="number") {

        return false;

    }

    var key_s=(/(json|array)/g).test(getTypeof(objectValue1))
        ?objectValue1
        :[objectValue1];
    var cnt=0;
    var incrementDefaultValue=1;
    var local_is_valid = null;

    each(key_s, function (kk, kv) {

        if (getTypeof(objectValue2)==="json") {

            if (has(objectValue2[kk])) {

                if (getTypeof(objectValue2[kk])==="regexp") {

                    local_is_valid = objectValue2[kk];

                } else {

                    local_is_valid = new RegExp(objectValue2[kk]);

                }
                if (local_is_valid.test(kv)) {

                    cnt+=incrementDefaultValue;

                }

            }

        } else {

            if (getTypeof(objectValue2)==="regexp") {

                local_is_valid = objectValue2;

            } else {

                local_is_valid = new RegExp(objectValue2);

            }
            if (local_is_valid.test(kv)) {

                cnt+=incrementDefaultValue;

            }

        }

    });

    return cnt >zero;

}
_stk.isExactbyRegExp=isExactbyRegExp




/**
 * Check if data is empty
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isEmpty('')
 * // => true
 */
function isEmpty (value) {

    var zero =0;

    if (getTypeof(value) === "json" || getTypeof(value) === "array") {

        return count(value, true)===zero;

    }

    return (/^\s*$/gmi).test(value);

}

/**
 * Json To Array
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue The first number in an addition.
 * @param {string} value The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * jsonToArray({"a":{"a":2},"b":{"a":3}},"a")
 * => [2, 3]
 */
function jsonToArray (objectValue, value) {

    var arry=[];

    each(objectValue, function (_key, _value) {

        if (has(value)) {

            var valueData = getData(_value, value);

            if (isEmpty(valueData) ===false) {

                arry.push(valueData);

            }

        } else {

            arry.push(_value);

        }

    });

    return arry;

}
_stk.jsonToArray=jsonToArray




/**
 * Last
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @returns {null} Returns the total.
 * @example
 *
 * last([1,2] )
 *=>2
 */
function last (objectValue) {

    return getKeyVal(objectValue, "last_index");

}
_stk.last=last




/**
 * Index Of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The first number in an addition.
 * @param {any} value The first number in an addition.
 * @returns {any} Returns the total.
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
_stk.lastIndexOf=lastIndexOf




/**
 * Is Exact
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue1 The first number in an addition.
 * @param {string} objectValue2 The first number in an addition.
 * @param {boolean} isExist The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isExact({"test": 11,"test2": 11}, {"test2": 11})
 * // => true
 */
function isExact (objectValue1, objectValue2, isExist) {

    if (objectValue2===null) {

        return false;

    }

    var local_is_exist=has(isExist)&&getTypeof(isExist)==="boolean"
        ?isExist
        :true;
    var val_s=(/(json|array)/g).test(getTypeof(objectValue2))
        ?objectValue2
        :[objectValue2];
    var key_s=(/(json|array)/g).test(getTypeof(objectValue1))
        ?objectValue1
        :[objectValue1];
    var cnt=0;
    var incrementDefaultValue=1;
    var emptyDefaultValue=0;
    var notExistArrayDefaultValue=-1;

    each(key_s, function (kk, kv) {

        if (getTypeof(objectValue2)==="json") {

            if (has(val_s[kk])) {

                var local_is_valid = local_is_exist
                    ?val_s[kk]===kv
                    :val_s[kk]!==kv;

                if (local_is_valid) {

                    cnt+=incrementDefaultValue;

                }

            }

        }

        if (getTypeof(objectValue2)==="array") {

            var local_is_valid = local_is_exist
                ?indexOf(val_s, kv)>notExistArrayDefaultValue
                :indexOf(val_s, kv)===notExistArrayDefaultValue;

            if (local_is_valid) {

                cnt+=incrementDefaultValue;

            }

        }

    });

    if (cnt===emptyDefaultValue) {

        return false;

    }

    return cnt===count(objectValue2);

}

/**
 * Is Exact by Regexp
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue1 The first number in an addition.
 * @param {string} objectValue2 The first number in an addition.
 * @returns {boolean} Returns the total.
 * @example
 *
 * isExactbyRegExp('')
 * // => false
 */
function isExactbyRegExp (objectValue1, objectValue2) {

    var zero =0;

    if (objectValue2===null) {

        return false;

    }

    if (getTypeof(objectValue2)!=="json" && getTypeof(objectValue2)!=="string" && getTypeof(objectValue2)!=="regexp" && getTypeof(objectValue2)!=="number") {

        return false;

    }

    var key_s=(/(json|array)/g).test(getTypeof(objectValue1))
        ?objectValue1
        :[objectValue1];
    var cnt=0;
    var incrementDefaultValue=1;
    var local_is_valid = null;

    each(key_s, function (kk, kv) {

        if (getTypeof(objectValue2)==="json") {

            if (has(objectValue2[kk])) {

                if (getTypeof(objectValue2[kk])==="regexp") {

                    local_is_valid = objectValue2[kk];

                } else {

                    local_is_valid = new RegExp(objectValue2[kk]);

                }
                if (local_is_valid.test(kv)) {

                    cnt+=incrementDefaultValue;

                }

            }

        } else {

            if (getTypeof(objectValue2)==="regexp") {

                local_is_valid = objectValue2;

            } else {

                local_is_valid = new RegExp(objectValue2);

            }
            if (local_is_valid.test(kv)) {

                cnt+=incrementDefaultValue;

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

    var zero =0;

    var json_convertion = getTypeof(jsn) === "array"
        ? jsn
        : [jsn];
    var jsn_s= count(jsn, true) ===zero
        ? json_convertion
        : jsn;
    var whr_s=whr||{};
    var variable=getJSONVariable(jsn);
    var filterData = {};

    each(jsn_s, function (jk, jv) {

        if (getTypeof(jsn)==="array") {

            filterData = jv;

        }
        if (getTypeof(jsn)==="json") {

            filterData[jk]=jv;

        }

        if (types === "where") {

            if (isExact(filterData, whr_s, isExist)) {

                append(variable, jv, jk);
                if (has(func)) {

                    func(jv, jk);

                }

            }

        }
        if (types === "like") {

            if (isExactbyRegExp(filterData, whr_s)) {

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
 * Like
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueWhere The second number in an addition.
 * @param {function} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * where({"s1":1,"s2":1},{"s1":1})
 *=>{s1: 1, s2: 1}
 */
function like (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'like');

}
_stk.like=like




/**
 * Limit
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {number} minValue The second number in an addition.
 * @param {number} maxValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {null} Returns the total.
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

    each(objectValue, function (key, meth) {

        if (cnt>=minValueReserve && cnt<=maxValueReserve) {

            if (has(func)) {

                glo_indtfd=func(key, meth);

                if (has(glo_indtfd)) {

                    glo_jsn[key]=glo_indtfd;

                }

            } else {

                glo_jsn[key]=meth;

            }

        }

        cnt+=incrementDefaultValue;

    });

    return glo_jsn;

}
_stk.limit=limit




/**
 * Map
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {null} Returns the total.
 * @example
 *
 * map([1,2],1,2 )
 *=>[2]
 */
function map (objectValue, func) {

    var strTypeOf =getTypeof(objectValue);
    var emptyDefaultValue=0;
    var incrementDefaultValue=1;
    var value_arry=strTypeOf==="array"
        ?[]
        :{};
    var cnt=emptyDefaultValue;

    each(objectValue, function (key, value) {

        if (has(func)) {

            if (strTypeOf==="array") {

                value_arry.push(func(value, key, cnt));
                cnt+=incrementDefaultValue;

            } else {

                var dataFunc = func(value, key, cnt);

                value_arry[key] = dataFunc;

            }

        }

    });

    return value_arry;

}
_stk.map=map


/**
 * Parse Json
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} value The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function parseJson (value) {

    var emptyDefaultValue=0;
    var stripValue=value.replace(/(&quot;)/gi, '"', value).replace(/(&nbsp;)/gi, ' ', value);
    var returnValue=null;

    if ((/^[\],:{}\s]*$/).test(stripValue.replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        if (stripValue.length>emptyDefaultValue && !(/^\s*$/).test(stripValue)) {

            returnValue = eval('(' + stripValue + ')');

        }

    }

    return returnValue;

}
_stk.parseJson=parseJson




/**
 * Data String
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} str The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function datastring (str) {

    var data_s="";

    if (typeof str ==="string") {

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
 * Return loop
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} dstr The second number in an addition.
 * @param {function} func The second number in an addition.
 * @param {string} dl The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function returnLoop (dstr, func, dl) {

    return func(dstr)+""+dl;

}

/**
 * Parse String
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function parseString (value) {

    var str="";
    var str_strt="";
    var str_end="";
    var inc=0;
    var incrementDefaultValue=1;
    var inc_main=null;

    if (has(value)) {

        if (getTypeof(value)==="json") {

            str_strt="{";
            str_end="}";

            each(value, function (_key, _value) {

                inc_main=inc<count(value)-incrementDefaultValue
                    ?","
                    :"";

                if (typeof _value==="object"&&_value!==null) {

                    str+=datastring(_key)+":"+returnLoop(_value, parseString, inc_main);

                } else {

                    str+=datastring(_key)+":"+datastring(_value)+""+inc_main;

                }

                inc+=incrementDefaultValue;

            });

        }
        if (getTypeof(value)==="array") {

            str_strt="[";
            str_end="]";

            each(value, function (_key, _value) {

                inc_main=inc<count(value)-incrementDefaultValue
                    ?","
                    :"";

                if (typeof _value==="object") {

                    str+=returnLoop(_value, parseString, inc_main);

                } else {

                    str+=datastring(_value)+""+inc_main;

                }

                inc+=incrementDefaultValue;

            });

        }

    }

    return (str_strt+str+str_end).replace(/[\r\t\n\s]{1,}/g, "&nbsp;").replace(/(&quot;)/gi, '"');

}

_stk.parseString=parseString




/**
 * Where
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueWhere The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * where({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 */
function where (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'where');

}

/**
 * Remove
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {number} value The second number in an addition.
 * @param {number} value2 The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * remove([1,2,3],1 )
 *=>[3]
 */
function remove (objectValue, value, value2) {

    var emptyDefaultValue=0;
    var type_js=getTypeof(objectValue);
    var reslt =null;

    var isValueAFunction = getTypeof(value)==="function";

    if (type_js==="array") {

        var lastRow = has(value2)
            ?value2
            :count(objectValue);

        reslt=[];
        each(objectValue, function (ak, av) {

            if (isValueAFunction) {

                if (value(ak, av)) {

                    reslt.push(av);

                }

            } else {

                if (ak >= value && ak <= lastRow) {

                    reslt.push(av);

                }

            }

        });

        return reslt;

    }

    if (type_js==="json") {

        reslt={};
        var jsn_vw=[];

        each(objectValue, function () {

            where(objectValue, value, function (jk) {

                jsn_vw.push(jk);

            });

        });

        each(objectValue, function (ak, av) {

            if (indexOf(jsn_vw, ak)<emptyDefaultValue) {

                reslt[ak]=av;

            }

        });

        return reslt;

    }

    return [];

}
_stk.remove=remove




/**
 * Range
 *
 * @since 1.0.1
 * @category Seq
 * @param {number} maxValue The second number in an addition.
 * @param {number} minValue The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * range(10)
 *=>[1,2,3,4,5,6,7,8,9,10]
 */
function range (maxValue, minValue) {

    var emptyDefaultValue=0;
    var tenDefaultValue=10;
    var incrementDefaultValue=1;
    var minValueRef=has(minValue)
        ?minValue
        :emptyDefaultValue;
    var maxValueRef=has(maxValue)
        ?maxValue
        :tenDefaultValue;
    var output=[];

    for (var inc=minValueRef; inc<=maxValueRef;) {

        output.push(inc);
        inc+=incrementDefaultValue;

    }

    return output;

}
_stk.range=range


/**
 * Repeat
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} value The second number in an addition.
 * @param {number} valueRepetion The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * repeat("s",1 )
 *=>'ss'
 */
function repeat (value, valueRepetion) {

    var emptyDefaultValue=0;
    var onceDefaultValue=1;
    var nm_rpt=valueRepetion||emptyDefaultValue;
    var nm_str=value||"";

    if (nm_rpt>emptyDefaultValue) {

        return new Array(nm_rpt+onceDefaultValue).join(nm_str);

    }

    return "";

}
_stk.repeat=repeat




/**
 * Random
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} valueArray The second number in an addition.
 * @param {number} minValue The second number in an addition.
 * @param {number} maxValue The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * _stk.random([10,20,30],0,3 )
 *=>'[20]'
 */
function random (valueArray, minValue, maxValue) {

    var ran_var=[];
    var emptyDefaultValue=0;
    var ran_min=has(minValue)
        ?minValue
        :emptyDefaultValue;
    var ran_max=has(maxValue)
        ?maxValue+ran_min
        :count(valueArray);
    var math_random = Math.round(Math.random()*ran_max);

    each(valueArray, function (key, value) {

        if (math_random===parseInt(key)) {

            ran_var.push(value);

        }

    });

    return ran_var;

}
_stk.random=random




/**
 * Random Decimal
 *
 * @since 1.0.1
 * @category Seq
 * @param {number} value The second number in an addition.
 * @param {number} maxValue The second number in an addition.
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

    if (count(str_dec)===twoDefaultValue) {

        var p_cnts=count(str_dec[onceDefaultValue].toString().split(""));
        var delmts=p_cnts<=s_dmin
            ?s_dmin
            :s_dmax;
        var dec_s=tenDefaultValue**delmts;

        return Math.round(parseFloat(jsn*dec_s))/dec_s;

    }

    return jsn;

}
_stk.roundDecimal=roundDecimal




/**
 * Shuffle
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {number} value The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * shuffle([1,2,3])
 *=>[2,3,1]
 */
function shuffle (objectValue) {

    var emptyDefaultValue=0;
    var onceDefaultValue=1;
    var output=objectValue;
    var valueType=[
        "array",
        "json"
    ];

    if (indexOf(valueType, getTypeof(objectValue))>-onceDefaultValue) {

        var counts=count(objectValue)-onceDefaultValue;
        var randomIndex=emptyDefaultValue;
        var temporaryValue=null;

        for (var currentIndex=counts; currentIndex>emptyDefaultValue;) {

            randomIndex = Math.floor(Math.random() * currentIndex);

            if (getTypeof(objectValue)==="array") {

                temporaryValue = output[currentIndex];
                output[currentIndex]=output[randomIndex];
                output[randomIndex] = temporaryValue;

            }

            currentIndex -= onceDefaultValue;

        }

    }

    return output;

}
_stk.shuffle=shuffle




/**
 * Sort
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {number} index The second number in an addition.
 * @param {boolean} order The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {string|number} Returns the total.
 * @example
 *
 * sort([2,3,1])
 *=>[1,2,3]
 */
function sort (objectValue, index, order, func) {

    var jsonn=objectValue;
    var asc=has(order)
        ?order
        :true;
    var js_m=getTypeof(jsonn)==="json"
        ?each(jsonn)
        :jsonn;

    jsonn=js_m.sort(function (orderA, orderB) {

        if (has(func)) {

            return func(orderA, orderB);

        }
        if (asc) {

            return orderA[index] > orderB[index];

        }

        return orderB[index] > orderA[index];

    });

    return jsonn;

}
_stk.sort=sort




/**
 * Var extend
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} objectValue The second number in an addition.
 * @param {object} objectValueReplace The second number in an addition.
 * @returns {array} Returns the total.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function varExtend (objectValue, objectValueReplace) {

    var onceDefaultValue=1;

    if (getTypeof(objectValue)==="json"&& getTypeof(objectValueReplace)==="json") {

        var jsn_s={};

        for (var key in objectValue) {

            if (indexOf([
                'true',
                'false'
            ], objectValue[key].toString().toLowerCase())>-onceDefaultValue) {

                var jsn_bool={
                    "false": false,
                    "true": true
                };

                jsn_s[key]=jsn_bool[objectValue[key].toString().toLowerCase()];

            } else {

                jsn_s[key]=objectValue[key];

            }

        }

        for (var key in objectValueReplace) {

            if (has(jsn_s, key)) {

                if (getTypeof(jsn_s[key]) ==="json") {

                    jsn_s[key]=replaceValue(jsn_s[key], objectValueReplace[key]);

                } else {

                    jsn_s[key]=objectValueReplace[key];

                }

            }

        }

        return jsn_s;

    }

    return objectValue;

}

/**
 * Replace Value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueReplace The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function replaceValue (objectValue, objectValueReplace) {

    for (var key in objectValueReplace) {

        if (getTypeof(objectValue[key]) ==="json") {

            objectValue[key] =replaceValue(objectValue[key], objectValueReplace[key]);

        } else {

            objectValue[key] = objectValueReplace[key];

        }

    }

    return objectValue;

}

/**
 * Data String
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} str The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function datastring (str) {

    var data_s="";

    if (typeof str ==="string") {

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
 * Return loop
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} dstr The second number in an addition.
 * @param {function} func The second number in an addition.
 * @param {string} dl The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function returnLoop (dstr, func, dl) {

    return func(dstr)+""+dl;

}

/**
 * Parse String
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * parseString({} )
 *=>'{}'
 */
function parseString (value) {

    var str="";
    var str_strt="";
    var str_end="";
    var inc=0;
    var incrementDefaultValue=1;
    var inc_main=null;

    if (has(value)) {

        if (getTypeof(value)==="json") {

            str_strt="{";
            str_end="}";

            each(value, function (_key, _value) {

                inc_main=inc<count(value)-incrementDefaultValue
                    ?","
                    :"";

                if (typeof _value==="object"&&_value!==null) {

                    str+=datastring(_key)+":"+returnLoop(_value, parseString, inc_main);

                } else {

                    str+=datastring(_key)+":"+datastring(_value)+""+inc_main;

                }

                inc+=incrementDefaultValue;

            });

        }
        if (getTypeof(value)==="array") {

            str_strt="[";
            str_end="]";

            each(value, function (_key, _value) {

                inc_main=inc<count(value)-incrementDefaultValue
                    ?","
                    :"";

                if (typeof _value==="object") {

                    str+=returnLoop(_value, parseString, inc_main);

                } else {

                    str+=datastring(_value)+""+inc_main;

                }

                inc+=incrementDefaultValue;

            });

        }

    }

    return (str_strt+str+str_end).replace(/[\r\t\n\s]{1,}/g, "&nbsp;").replace(/(&quot;)/gi, '"');

}

/**
 * Template Value Internal
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} str_raw The second number in an addition.
 * @param {string} reg The second number in an addition.
 * @returns {string} Returns the total.
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

                return getTypeof(gtdata)==="json"
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

/**
 * Template Value
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} templateString The second number in an addition.
 * @param {object} data The second number in an addition.
 * @param {object} option The second number in an addition.
 * @returns {string} Returns the total.
 * @example
 *
 * templateValue("","" )
 *=>'{}'
 */
function templateValue (templateString, data, option) {

    var oneDefaultValue=1;

    templateString = templateValueInternal(templateString, data);

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

    var source = "__p+='";
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

        source+=templateString.slice(index, offset).replace(escaper, escapeChar);
        index = offset+match.length;

        if (evaluate) {

            source+="';\n"+evaluate+"\n__p+='";

        }

        if (interpolate) {

            source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'";

        }

        if (escape) {

            source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'";

        }

        return match;

    });

    source+="';\n";

    source = "var __t,__p='',__j=[].join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
    source + " return __p;\n";

    try {

        var val_source = "";

        if (getTypeof(data)==="json") {

            for (var key in data) {

                if (has(data, key)) {

                    val_source+='var '+key+' = '+(indexOf(valueType, getTypeof(data[key]))>-oneDefaultValue
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
_stk.templateValue=templateValue




/**
 * To Array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {any[]} Returns the total.
 * @example
 *
 * toArray(1)
 *=>[1]
 */
function toArray (value) {

    var return_val = value;

    if (getTypeof(return_val)!=="array") {

        return_val = [value];

    }

    return return_val;

}
_stk.toArray=toArray




/**
 * Where Loop Execution
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} regexp The second number in an addition.
 * @param {object} defaultVariable The second number in an addition.
 * @param {function} nullReplacement The second number in an addition.
 * @returns {array|object} Returns the total.
 * @example
 *
 * whereLoopExecution({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 */
function dataTypeFormat (regexp, defaultVariable, nullReplacement) {

    var regp=regexp;
    var intr=defaultVariable;

    if (regp.test(nullReplacement.toString())) {

        intr=nullReplacement;

    }

    if (!has(nullReplacement) || nullReplacement.toString()==="NaN") {

        intr=defaultVariable;

    }

    return intr;

}

/**
 * To Array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * toArray(1)
 *=>[1]
 */
function toDouble (value) {

    var zero = 0.00;

    return parseFloat(dataTypeFormat(/(\d[.]{0,})/g, zero, value===null
        ?zero
        :value));

}
_stk.toDouble=toDouble




/**
 * Var extend
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} objectValue The second number in an addition.
 * @param {object} objectValueReplace The second number in an addition.
 * @returns {array} Returns the total.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function varExtend (objectValue, objectValueReplace) {

    var onceDefaultValue=1;

    if (getTypeof(objectValue)==="json"&& getTypeof(objectValueReplace)==="json") {

        var jsn_s={};

        for (var key in objectValue) {

            if (indexOf([
                'true',
                'false'
            ], objectValue[key].toString().toLowerCase())>-onceDefaultValue) {

                var jsn_bool={
                    "false": false,
                    "true": true
                };

                jsn_s[key]=jsn_bool[objectValue[key].toString().toLowerCase()];

            } else {

                jsn_s[key]=objectValue[key];

            }

        }

        for (var key in objectValueReplace) {

            if (has(jsn_s, key)) {

                if (getTypeof(jsn_s[key]) ==="json") {

                    jsn_s[key]=replaceValue(jsn_s[key], objectValueReplace[key]);

                } else {

                    jsn_s[key]=objectValueReplace[key];

                }

            }

        }

        return jsn_s;

    }

    return objectValue;

}

/**
 * Replace Value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueReplace The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function replaceValue (objectValue, objectValueReplace) {

    for (var key in objectValueReplace) {

        if (getTypeof(objectValue[key]) ==="json") {

            objectValue[key] =replaceValue(objectValue[key], objectValueReplace[key]);

        } else {

            objectValue[key] = objectValueReplace[key];

        }

    }

    return objectValue;

}
_stk.varExtend=varExtend




/**
 * To Array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * toArray(1)
 *=>[1]
 */
function toInteger (value) {

    var zero = 0;

    return parseInt(dataTypeFormat(/(\d)/g, zero, value===null
        ?zero
        :value));

}
_stk.toInteger=toInteger




/**
 * Where
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueWhere The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * where({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 */
function where (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'where');

}
_stk.where=where




/**
 * Where Not
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The second number in an addition.
 * @param {any} objectValueWhere The second number in an addition.
 * @param {any} func The second number in an addition.
 * @returns {any} Returns the total.
 * @example
 *
 * whereNot({"s1":1,"s2":1},{"s1":2})
 *=>{"s1":1,"s2":1}
 */
function whereNot (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, false, 'where');

}
_stk.whereNot=whereNot

})(typeof window !== "undefined" ? window : this);