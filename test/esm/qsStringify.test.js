import {qsStringify} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: qsStringify method', function () {

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

});
