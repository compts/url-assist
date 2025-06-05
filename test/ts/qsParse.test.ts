import {qsParse} from "../../dist/esm/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: qsParse method', function () {

     it('check qsParse argument', function () {
    
            assert.deepStrictEqual(qsParse("test=11&test2=11"), {"test": 11,
                "test2": 11});
    
        });
    
        it('check qsParse is empty', function () {
    
            assert.deepStrictEqual(qsParse(""), {});
    
        });
    
        it('check qsParse argument has list', function () {
    
            assert.deepStrictEqual(qsParse("test=11&test2=11&test=22"), {
                "test": [
                    11,
                    22
                ],
                "test2": 11
            });
    
        });
    
        it('check qsParse argument has object nested', function () {
    
            assert.deepStrictEqual(
                qsParse("test=11&test2=11&test3[sa][as]=22"),
                {"test": 11,
                    "test2": 11,
                    "test3": {"sa": {"as": 22}}}
            );
    
        });
    
        it('check qsParse argument has list and object distinction', function () {
    
            assert.deepStrictEqual(
                qsParse("test=11&test2=11&test[sa]=22"),
                {
                    "test": [
                        11,
                        {"sa": 22}
                    ],
                    "test2": 11
                }
            );
    
        });
    
        it('check qsParse put space if had +', function () {
    
            assert.deepStrictEqual(qsParse("test+key=test+value"), {"test key": 'test value'});
    
        });
    
        it('check qsParse argument to use URI component', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c"),
                {"a": {"b": "c"}}
            );
    
        });
        it('check qsParse argument to use URI component with array', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d"),
                {"a": {"b": [
                    "c",
                    "d"
                ]}}
            );
    
        });
        it('check qsParse argument to use URI component with array and object', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g"),
                {
                    "a": {
                        "b": [
                            "c",
                            "d"
                        ],
                        "f": "g"
                    }
                }
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i"),
                {
                    "a": {
                        "b": [
                            "c",
                            "d"
                        ],
                        "f": {
                            "h": "i"
    
                        }
                    }
                }
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested with list', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i&a%5Bf%5D[j]=k"),
                {"a": {
                    "b": [
                        "c",
                        "d"
                    ],
                    "f": {
                        "h": "i",
                        "j": "k"
                    }
                }}
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested with list and object', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i&a%5Bf%5D[j]=k&a%5Bf%5D[l][m]=n"),
                {"a": {
                    "b": [
                        "c",
                        "d"
                    ],
                    "f": {
                        "h": "i",
                        "j": "k",
                        "l": {
                            "m": "n"
                        }
                    }
                }}
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested with list and object with list', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i&a%5Bf%5D[j]=k&a%5Bf%5D[l][m]=n&a%5Bf%5D[l][o]=p"),
                {
                    "a": {
                        "b": [
                            "c",
                            "d"
                        ],
                        "f": {
                            "h": "i",
                            "j": "k",
                            "l": {
                                "m": "n",
                                "o": "p"
                            }
                        }
                    }
                }
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested with list and object with list and object', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i&a%5Bf%5D[j]=k&a%5Bf%5D[l][m]=n&a%5Bf%5D[l][o]=p&a%5Bf%5D[l][q][r]=s"),
                {
                    "a": {
                        "b": [
                            "c",
                            "d"
                        ],
                        "f": {
                            "h": "i",
                            "j": "k",
                            "l": {
                                "m": "n",
                                "o": "p",
                                "q": {
                                    "r": "s"
                                }
                            }
                        }
                    }
                }
            );
    
        });
        it('check qsParse argument to use URI component with array and object and nested with list and object with list and object with list', function () {
    
            assert.deepStrictEqual(
                qsParse("a%5Bb%5D=c&a%5Bb%5D=d&a%5Bf%5D=g&a%5Bf%5D[h]=i&a%5Bf%5D[j]=k&a%5Bf%5D[l][m]=n&a%5Bf%5D[l][o]=p&a%5Bf%5D[l][q][r]=s&a%5Bf%5D[l][q][t]=u"),
                {
                    "a": {
                        "b": [
                            "c",
                            "d"
                        ],
                        "f": {
                            "h": "i",
                            "j": "k",
                            "l": {
                                "m": "n",
                                "o": "p",
                                "q": {
                                    "r": "s",
                                    "t": "u"
                                }
                            }
                        }
                    }
                }
            );
    
        });

});
