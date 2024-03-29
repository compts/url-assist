(function(global){
global._stk={}
/**
 * Check if object has value or null
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value Either JSON or Array
 * @param {any=} key For key or index of data
 * @returns {boolean} Returns true or false.
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

var objectCallType = {"[object Array]": "object",
    "[object Object]": "object",
    "[object String]": "string"};

var listObjArrayType = [
    "[object Object]",
    "[object Array]"
];

var objectCallTypeAll = {"[object Arguments]": "arguments",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Null]": "null",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object Promise]": "promise",
    "[object RegExp]": "regexp",
    "[object String]": "string",
    "[object Undefined]": "undefined"};

/**
 * Is Json valid
 *
 * @since 1.3.1
 * @category Seq
 * @param {string|object|array} value Value you want to check JSON is Valid
 * @param {string=} valueType Get value type
 * @returns {any} Returns true or false if valid json format
 * @example
 *
 * isJson('{}' )
 *=> true
 */
function isJson (value, valueType) {

    var getValueType = Object.prototype.toString.call(value);

    if (has(objectCallType, getValueType) ===false) {

        return false;

    }

    var getValueTypeRef = objectCallType[getValueType];

    if (has(valueType)) {

        getValueTypeRef = valueType;

    }

    if (getValueTypeRef === "string") {

        var stripValue=value.replace(/(&quot;)/gi, '"', value).replace(/(&nbsp;)/gi, ' ', value);

        return (/^[\],:{}\s]*$/).test(stripValue.replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));

    }

    if (getValueTypeRef === "object") {

        try {

            return checkIfFunctionNotExistObject(value);

        } catch (err) {

            return false;

        }

    }

    return false;

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

    if (getValueType==="[object Function]") {

        throw new Error("Function must not exist");

    }

    var isValid = false;
    var zero = 0;

    if (getValueType==="[object Object]") {

        isValid = true;

    }

    if (getValueType==="[object Array]") {

        if (obj.length ===zero) {

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
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Any data you want to check its property
 * @returns {string} Get the property of variable
 * @example
 *
 * getTypeof([])
 * => array
 */
function getTypeof (objectValue) {

    var objectType = Object.prototype.toString.call(objectValue);

    if (objectType==="[object Object]") {

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
 * Each or for loop function you are familiar with
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Array or json.
 * @param {Function=} func Function data
 * @returns {any} Array or json
 * @example
 *
 * each([1,2],(key,value)=>{ })
 *
 */
function each (objectValue, func) {

    var re_loop=[];
    var typeofs=getTypeof(objectValue);

    if (typeofs==="json"||typeofs==="array"||typeofs==="object"||typeofs==="arguments") {

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
 * @param {any} objectValue Json or array
 * @param {boolean=} json_is_empty_check If data is json, it will check its map data
 * @returns {number} Returns the total.
 * @example
 *
 * count([1,2])
 * // => 2
 *
 * count({"s" :1, "s2": 2}, true)
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
 * Index of array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Array
 * @param {any} value Value in array
 * @returns {any} Returns the index.
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
 * Check index of array Not or exist
 *
 * @since 1.4.1
 * @category Seq
 * @param {any[]} arrayObject Array
 * @param {any} value Value for array lookup
 * @returns {boolean} Return array.
 * @example
 *
 * indexOfNotExist([312], 32)
 * // => true
 */
function indexOfNotExist (arrayObject, value) {

    var zero = -1;

    return indexOf(arrayObject, value)===zero;

}

/**
 * Append If Array not Exist
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} arrayObject Data is Array
 * @param {any} value Value for array lookup
 * @returns {any[]} Return array.
 * @example
 *
 * appendIsArrayExist([312], [32])
 * // => [312, 32]
 */
function appendIsArrayExist (arrayObject, value) {

    var ary_type=getTypeof(arrayObject);
    var ary_type1=getTypeof(value);

    if (ary_type ==="array" && ary_type1 ==="array") {

        each(value, function (key, val) {

            if (indexOfNotExist(arrayObject, val)) {

                arrayObject.push(val);

            }

        });

        return arrayObject;

    }

    return [];

}

_stk.appendIsArrayExist=appendIsArrayExist


/**
 * To map the value of json ot array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The data you want to map
 * @param {any=} func Callback function
 * @returns {null} Return map either JSON or Array
 * @example
 *
 * map([1,2],function(value) { return value+2 } )
 *=> [3, 4]
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

    for (var inc=minValueRef; inc<=maxValueRef;) {

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
 * Repeat  value in array
 *
 * @since 1.4.7
 * @category Seq
 * @param {any} value String you want to duplicate
 * @param {number} valueRepetion how many times you want to repeate
 * @returns {any[]} Return in string or number.
 * @example
 *
 * arrayRepeat("s",1 )
 *=>['s','s']
 */
function arrayRepeat (value, valueRepetion) {

    var emptyDefaultValue=0;
    var nm_rpt=valueRepetion||emptyDefaultValue;

    return map(range(nm_rpt), function () {

        return value;

    });

}

_stk.arrayRepeat=arrayRepeat


/**
 * To Array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value Value you want to convert in array
 * @returns {any[]} Return in array.
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

/**
 * To get value of array given start and end(optional) of the array
 * This is a rename of delimiter
 *
 * @since 1.3.1
 * @category Seq
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
 * // => [2, 3, 4]
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

    each(objectValue, function (key, value) {

        if (ran_min <= parseInt(key) && ran_max >= parseInt(key)) {

            ran_var.push(value);

        }

    });

    return ran_var;

}

/**
 * Check index of array is Exist or not
 *
 * @since 1.3.1
 * @category Seq
 * @param {any[]} arrayObject Array
 * @param {any} value Value for array lookup
 * @returns {boolean} Return array.
 * @example
 *
 * indexOfExist([312], 32)
 * // => false
 */
function indexOfExist (arrayObject, value) {

    var zero = 0;

    return indexOf(arrayObject, value)>=zero;

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
    if (indexOfExist([
        "key",
        "value"
    ], typ)) {

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
            :{"value": ''};

    }
    if (typ ==="last_index") {

        return count(list_raw)>zero
            ?list_raw[count(list_raw)-one]
            :{"value": ''};

    }

    return null;

}

/**
 * Get the first value of array or JSON
 *
 * @since 1.0.1
 * @category Seq
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
 * Array Concat
 *
 * @since 1.0.1
 * @category Seq
 * @param {...any} arg First array
 * @returns {any[]} Returns the array.
 * @example
 *
 * arrayConcat([1], 2)
 * // => [1,2]
 */
function arrayConcat () {

    var arg=arguments;

    var one =1;

    if (arg.length < one) {

        return [];

    }

    var return_val=toArray(first(arg));
    var arrayValue = toArray(arraySlice(arg, one));

    each(arrayValue, function (key, value) {

        return_val = return_val.concat(toArray(value));

    });

    return return_val;

}

_stk.arrayConcat=arrayConcat

_stk.arraySlice=arraySlice


/**
 * Check if data is empty
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value JSON , Array and String
 * @returns {boolean} Returns true or false
 * @example
 *
 * isEmpty('')
 * // => true
 */
function isEmpty (value) {

    var zero =0;

    var typeofvalue = getTypeof(value);

    var invalidList = [
        'null',
        'undefined'
    ];

    if (typeofvalue=== "json" || typeofvalue === "array") {

        return count(value, true)===zero;

    }
    if (typeofvalue=== "number") {

        return value===zero;

    }

    if (indexOfExist(invalidList, typeofvalue)) {

        return true;

    }

    return (/^\s*$/gmi).test(value);

}

/**
 * Array Sum
 *
 * @since 1.0.1
 * @category Seq
 * @param {number[]} arrayObject Array in number
 * @param {number=} delimeter decimal point and default value is 4
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

    return isEmpty(delimeters)
        ? parseInt(sum)
        :sum.toFixed(delimeters);

}

_stk.arraySum=arraySum


/**
 * To String
 *
 * @since 1.4.5
 * @category Seq
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
 * Get Data in array or json using string to search the data
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Either Json or Array data.
 * @param {any} split_str Search key or index.
 * @returns {any} Returns the total.
 * @example
 *
 * getData({"s":1},"s")
 *=> 1
 * @example
 * getData({"a":{"a":2},"b":{"a":3}},"a:a")
 *=> {a: 2}
 */
function getData (objectValue, split_str) {

    var split_strReplace= toString(split_str).replace(/([.]{1,})/g, ":");
    var spl_len=split_strReplace.split(":");
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
 * @param {any[]} objectValue Json in array format
 * @param {string} valueFormat Key look up format
 * @returns {any[]} Return array or object.
 * @example
 *
 * arrayToObjectByDataFormat([{"Asd":1}],"Asd")
 *=>[1]
 */
function arrayToObjectByDataFormat (objectValue, valueFormat) {

    return map(objectValue, function (value) {

        return getData(value, valueFormat);

    });

}

_stk.arrayToObjectByDataFormat=arrayToObjectByDataFormat


/**
 * Async replace
 *
 * @since 1.3.1
 * @category Seq
 * @param {any} value String data
 * @param {any} search Regexp or string to look for match
 * @param {Function|String=} toReplace Replace value.
 * @returns {Promise<string>} String
 * @example
 *
 * asyncReplace("asd",/s/g,"@")
 * // => Promise{<fulfilled>: 'a@d'}
 */
function asyncReplace (value, search, toReplace) {

    try {

        if (getTypeof(toReplace) === "function") {

            var values = [];

            String.prototype.replace.call(value, search, function () {

    var arg=arguments;

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
 * Get JSON or  Array as empty variable
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value Either Json or Array
 * @returns {any} Returns empty either Json or Array
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
 * Append data for json and array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The data either json or array
 * @param {any} val Value for array index and json
 * @param {any=} key Json key
 * @returns {any} Returns the total.
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
 * Cloning the data either in JSON or array that be used as different property
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue data you want to clone
 * @returns {number} Returns clone data
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

_stk.count=count

_stk.each=each


/**
 * Filter the data in loop
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue The data either json or array
 * @param {Function=} func The second number in an addition.
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

_stk.first=first

_stk.getData=getData


/**
 * Get key Object or JSON
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Either JSON or Array
 * @returns {string} Returns it respective key or index
 * @example
 *
 * getKey({"s":1})
 * => s
 */
function getKey (objectValue) {

    return getKeyVal(objectValue, "key");

}

_stk.getKey=getKey

_stk.getTypeof=getTypeof

_stk.getJSONVariable=getJSONVariable
/**
 * Generate unique value id
 *
 * @since 1.0.1
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

_stk.getUniq=getUniq


/**
 * Get value of json or array
 *
 * @since 1.0.1
 * @category Seq
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

_stk.getValue=getValue


/**
 * Check if data is undefined
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Either JSON or array
 * @param {any} value1 Check the key of value
 * @param {any=} value2 if value not exist, this value will be return
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

_stk.indexOf=indexOf

_stk.has=has

_stk.indexOfExist=indexOfExist

_stk.indexOfNotExist=indexOfNotExist


/**
 * Insert value in Json object or array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Either Json or array
 * @param {any} value Data you want to insert
 * @returns {any} Returns Json or array
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

_stk.isEmpty=isEmpty


/**
 * Looking the data in JSON and Array base on object value
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue1 Json or Array
 * @param {any} objectValue2 Json or Array for lookup to objectValue1
 * @param {boolean=} isExist Default value is True
 * @returns {boolean} Returns the boolean if the has the value you are looking at.
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
 * Looking the data in JSON and Array base on object value with the help regexp
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} objectValue1 Either Json or array
 * @param {string} objectValue2 use as lookup data in data
 * @returns {boolean} Returns the boolean if the has the value with the help regexp you are looking at.
 * @example
 *
 * isExactbyRegExp({"test": 11,"test2": 11}, {"test2": /\d/g})
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

_stk.isJson=isJson


/**
 * Convert Json To Array base on search value you provide
 *
 * @since 1.0.1
 * @category Seq
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

_stk.last=last


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

_stk.lastIndexOf=lastIndexOf


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
 * Searching the data either in array or json object to get similar value of data
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Json to Array
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

_stk.like=like


/**
 * Specify the limit, similar in splice bt the return was object to ensure the order are not shuffle
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

_stk.map=map


/**
 * Repeat string value
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} value String you want to duplicate
 * @param {number} valueRepetion how many times you want to repeate
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

/**
 * Number format
 *
 * @since 1.0.1
 * @category Seq
 * @param {array|object} objectValue The data you want to format
 * @param {string} value1 The start number.
 * @param {string=} value2 The end number.
 * @returns {null} Return format number
 * @example
 *
 * numberFormat(1,1,2)
 *=>1.00
 */
function numberFormat (objectValue, value1, value2) {

    var incrementDefaultValue=1;
    var emptyDefaultValue=0;
    var threeDefaultValue=3;
    var valueZero=value2||emptyDefaultValue;
    var objectValueEvaluate=objectValue.toString();
    var splt_dec=objectValueEvaluate.split(".");
    var reg_exp=new RegExp("(\\d)(?=(\\d{"+(value1||threeDefaultValue)+"})+(?:\\.\\d+)?$)", "g");
    var num_deli=splt_dec[emptyDefaultValue].replace(reg_exp, "$1, ");
    var ssd_va=num_deli+count(splt_dec)>incrementDefaultValue
        ?"."+splt_dec[incrementDefaultValue]
        :"";

    if (valueZero>emptyDefaultValue) {

        var str_dec=ssd_va.split(".");

        if (count(str_dec)===incrementDefaultValue) {

            ssd_va=ssd_va+"."+repeat("0", valueZero);

        } else {

            var dec_num=str_dec[incrementDefaultValue];

            if (dec_num.length>=valueZero) {

                ssd_va=str_dec[emptyDefaultValue]+"."+dec_num.substr(emptyDefaultValue, valueZero);

            } else {

                ssd_va=str_dec[emptyDefaultValue]+"."+dec_num+repeat("0", dec_num.length-valueZero);

            }

        }

    }

    return ssd_va;

}

_stk.numberFormat=numberFormat


/**
 * Var extend is use for cloning Json, Array or Object
 *
 * @since 1.0.1
 * @category Seq
 * @param {object} objectValue Json, Array or Object
 * @param {object} objectValueReplace Json, Array or Object that you want to assign to `objectValue`
 * @returns {array} Return Json or Array or Object.
 * @example
 *
 * varExtend({"s1":1},{"s1":2})
 *=>{"s1":2}
 */
function varExtend (objectValue, objectValueReplace) {

    var jsn_bool={
        "false": false,
        "true": true
    };

    var listValid = [
        "json",
        "object"
    ];

    if (indexOfExist(listValid, getTypeof(objectValue)) && indexOfExist(listValid, getTypeof(objectValueReplace))) {

        var jsn_s={};

        for (var key in objectValue) {

            if (has(objectValue[key])) {

                if (indexOfExist(getKey(jsn_bool), objectValue[key].toString().toLowerCase())) {

                    jsn_s[key]=jsn_bool[objectValue[key].toString().toLowerCase()];

                } else {

                    jsn_s[key]=objectValue[key];

                }

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

        if (getTypeof(objectValue[key]) ==="json") {

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
 * @category Seq
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

_stk.onDelay=onDelay


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

_stk.onSequence=onSequence

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
 * @category Seq
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

_stk.onWait=onWait


/**
 * Get the value in array the value in json given the search value was in json
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Json to Array
 * @param {any} objectValueWhere Data you want to search in key
 * @param {Function=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * where({"s1":1,"s2":1},{"s1":1})
 *=>{"s1":1,"s2":1}
 */
function where (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, true, 'where');

}

var entity = [

    {"decimal": "&#160;",
        "entity": "&nbsp;",
        "hex": "&#xA0;",
        "html": " ",
        "title": "non-breaking space"},
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
        "title": "Right curly bracket"}

];

var listType = [
    'decimal',
    'entity',
    'hex'
];

/**
 * String Unescape
 *
 * @since 1.3.1
 * @category Seq
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

        var whr = where(entity, search);

        return isEmpty(whr)
            ? str1
            : first(whr).html;

    });

    return regexReplace;

}

/**
 * Parse Json object
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} value String you want to convert to JSON
 * @returns {any} Returns the json.
 * @example
 *
 * parseJson('{}' )
 *=>{}
 */
function parseJson (value) {

    var emptyDefaultValue=0;
    var stripValue=stringUnEscape(value);
    var returnValue=null;

    if (isJson(value)) {

        if (stripValue.length>emptyDefaultValue && !(/^\s*$/).test(stripValue)) {

            returnValue = eval('(' + stripValue + ')');

        }

    }

    return returnValue;

}

_stk.parseJson=parseJson


/**
 * Data String from JSON object
 *
 * @since 1.0.1
 * @category Seq
 * @param {string} str Object you want to convert to JSON string
 * @returns {string} Return JSON string
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
 * Random value from array list
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

_stk.range=range


/**
 * Remove data in either JSON or Array using key or woth value
 *
 * @since 1.0.1
 * @category Seq
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

                if (ak > value && ak <= lastRow) {

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

            if (isValueAFunction) {

                if (value(ak, av)) {

                    reslt[ak]=av;

                }

            } else {

                if (indexOfExist(jsn_vw, av)===false) {

                    reslt[ak]=av;

                }

            }

        });

        return reslt;

    }

    return [];

}

_stk.remove=remove


/**
 * Regex Count Group number
 *
 * @since 1.4.7
 * @category Seq
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

_stk.regexCountGroup=regexCountGroup

_stk.repeat=repeat


/**
 * Random Decimal
 *
 * @since 1.0.1
 * @category Seq
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
 * Shuffle data in array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Array argmuments
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
 * Sort array
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Array
 * @param {boolean=} order True for ascend then false for descend
 * @param {any=} func Callback function or sort type
 * @returns {any[]} Returns the total.
 * @example
 *
 * sort([2,3,1])
 *=>[1,2,3]
 */
function sort (objectValue, order, func) {

    var jsonn=objectValue;
    var asc=true;
    var types='any';

    if (has(order) && getTypeof(order) ==='boolean') {

        asc= order;

    }

    if (has(func) && getTypeof(func) ==='string') {

        types= func;

    }

    var js_m=getTypeof(jsonn)==="json"
        ?each(jsonn)
        :jsonn;

    var finalResponse=js_m.sort(function (orderA, orderB) {

        if (has(func) && getTypeof(func) ==='function') {

            return func(orderA, orderB);

        }

        var sortOrderA = orderA;
        var sortOrderB = orderB;

        if (getTypeof(orderA) === "string" && getTypeof(orderB) === "string") {

            if (isEmpty(types) === false) {

                if (types ==='any') {

                    sortOrderA =orderA.charCodeAt();
                    sortOrderB= orderB.charCodeAt();

                }
                if (types ==='lowercase') {

                    sortOrderA =orderA.toLowerCase().charCodeAt();
                    sortOrderB= orderB.toLowerCase().charCodeAt();

                }

                if (types ==='uppercase') {

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

_stk.sort=sort
/**
 * Split string for special cases
 *
 * @since 1.3.1
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
        .toLowerCase()
        .replace(/([-_.\s]{1,})/g, ' ');

}

/**
 * String Camel case
 *
 * @since 1.3.1
 * @category Seq
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

_stk.stringCamelCase=stringCamelCase


/**
 * String Capitalize
 *
 * @since 1.3.1
 * @category Seq
 * @param {string} value String data
 * @param {string=} option Type of captalize optional
 * @returns {string} Returns Capitalize sting data
 * @example
 *
 * stringCapitalize('the fish is goad   with goat-1ss')
 *=> 'The Fish Is Goad   With Goat-1ss'
 * stringCapitalize('the fish is goad   with goat-1ss', 'all)
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

_stk.stringCapitalize=stringCapitalize


/**
 * String Escape
 *
 * @since 1.3.1
 * @category Seq
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

        var whr = where(entity, search);

        return isEmpty(whr)
            ? str1
            : first(whr)[typeVal];

    });

    return regexReplace;

}

_stk.stringEscape=stringEscape

_stk.append=append


/**
 * String Kebab case
 *
 * @since 1.3.1
 * @category Seq
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

_stk.stringKebabCase=stringKebabCase


/**
 * String Lower case case
 *
 * @since 1.4.5
 * @category Seq
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

_stk.stringLowerCase=stringLowerCase


/**
 * String Snake case
 *
 * @since 1.3.1
 * @category Seq
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

_stk.stringSnakeCase=stringSnakeCase


/**
 * String Substr
 *
 * @since 1.4.5
 * @category Seq
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

_stk.stringSubs=stringSubs

_stk.stringUnEscape=stringUnEscape


/**
 * String Upper case case
 *
 * @since 1.4.5
 * @category Seq
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

_stk.stringUpperCase=stringUpperCase


/**
 * Template Value
 *
 * @since 1.0.1
 * @category Seq
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

_stk.templateValue=templateValue


/**
 * Logic in convert string or number to valid number
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} regexp The second number in an addition.
 * @param {string|mumber} defaultVariable The second number in an addition.
 * @param {string|mumber} nullReplacement The second number in an addition.
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

    if (!has(nullReplacement) || nullReplacement.toString()==="NaN") {

        intr=defaultVariable;

    }
    if (getTypeof(intr) === "string") {

        intr = intr.replace(/[^\d.]/g, "");

    }

    return intr;

}

/**
 * To extract number in string and convert to double
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value Value you to convert in double
 * @returns {number} Return in double.
 * @example
 *
 * toDouble(1)
 *=>1.00
 */
function toDouble (value) {

    var zero = 0.00;

    return parseFloat(dataNumberFormat(/(\d[.]{0,})/g, zero, value===null
        ?zero
        :value));

}

_stk.toDouble=toDouble

_stk.toArray=toArray


/**
 * To extract number in string and convert to integer
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} value Value you to convert in integer
 * @returns {number} Return in integer.
 * @example
 *
 * toInteger(1)
 *=>1
 */
function toInteger (value) {

    var zero = 0;

    return parseInt(dataNumberFormat(/(\d)/g, zero, value===null
        ?zero
        :value));

}

_stk.toInteger=toInteger

_stk.toString=toString


/**
 * Get only the unique data from array
 *
 * @since 1.4.1
 * @category Seq
 * @param {any} value Value you want to convert in array
 * @returns {any[]} Return in array.
 * @example
 *
 * unique([1,2,3,2,3])
 *=>[1,2,3]
 */
function unique (value) {

    if (getTypeof(value)==="array") {

        var uniqArrData = [];

        each(value, function (key, val) {

            if (indexOfNotExist(uniqArrData, val)) {

                uniqArrData.push(val);

            }

        });

        return uniqArrData;

    }

    return [];

}

_stk.unique=unique

_stk.varExtend=varExtend


/**
 *  Get the value in array the value in json that should not in search value of json
 *
 * @since 1.0.1
 * @category Seq
 * @param {any} objectValue Json to Array
 * @param {any} objectValueWhere Data that you exlude in search
 * @param {Function=} func Function
 * @returns {any} Return either Json to Array.
 * @example
 *
 * whereNot([{"s1":1,"s2":1},{"s1":2,"s2":2}],{"s1":1})
 *=>[{"s1":2,"s2":2}]
 */
function whereNot (objectValue, objectValueWhere, func) {

    return whereLoopExecution(objectValue, objectValueWhere, func, false, 'where');

}

_stk.whereNot=whereNot

_stk.where=where

})(typeof window !== "undefined" ? window : this);