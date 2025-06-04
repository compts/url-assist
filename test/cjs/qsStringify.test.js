const {qsStringify} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: qsStringify method', function () {

    it('check qsStringify argument object to string', function () {

        assert.deepStrictEqual(qsStringify({"test": 11,
            "test2": 11}), "test=11&test2=11");

    });

    it('check qsStringify argument startWith with ?', function () {

        assert.deepStrictEqual(qsStringify({"test": 11,
            "test2": 11}, {"startWith": "?"}), "?test=11&test2=11");

    });


    it('check qsStringify argument has list with arrayFormat ""', function () {

        assert.deepStrictEqual(qsStringify({"test": [
            "11",
            "22"
        ],
        "test2": "11"}, {"arrayFormat": ""}), "test=11&test=22&test2=11");

    });

    it('check qsStringify argument has list', function () {

        assert.deepStrictEqual(qsStringify({"test": [
            "11",
            "22"
        ],
        "test2": "11"}), "test[]=11&test[]=22&test2=11");

    });

    it('check qsStringify argument with key [g][h][j]', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat ""', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": ""}), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "repeat"', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "repeat"}), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "comma"', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "comma"}), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "brackets"', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "brackets"}), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "indices"', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "indices"}), "a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "repeat" and startWith', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "repeat", "startWith": "?"}), "?a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "brackets" and startWith', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "brackets", "startWith": "?"}), "?a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "indices" and startWith', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "indices", "startWith": "?"}), "?a[b][c][d][e][f][g][h][i]=j");

    });
    it('check qsStringify argument with key [g][h][j] and arrayFormat "comma" and startWith', function () {

        assert.deepStrictEqual(qsStringify({
            "a": {
                "b": {
                    "c": {
                        "d": {
                            "e": {
                                "f": {
                                    '[g][h][i]': 'j'
                                }
                            }
                        }
                    }
                }
            }
        }, {"arrayFormat": "comma", "startWith": "?"}), "?a[b][c][d][e][f][g][h][i]=j");

    });

});
