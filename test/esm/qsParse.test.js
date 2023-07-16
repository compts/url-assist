import {qsParse} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: qsParse method', function () {

    it('check qsParse argument', function () {

        assert.deepStrictEqual(qsParse("test=11&test2=11"), {"test": "11",
            "test2": "11"});

    });

    it('check qsParse argument has list', function () {

        assert.deepStrictEqual(qsParse("test=11&test2=11&test=22"), {"test": [
            "11",
            "22"
        ],
        "test2": "11"});

    });

});
