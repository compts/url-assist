import {qsStringify} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: qsStringify method', function () {

    it('check qsStringify argument oobject to string', function () {

        assert.deepStrictEqual(qsStringify({"test": 11,
            "test2": 11}), "test=11&test2=11");

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

    it('check expected type', function () {

        expectType<string>(qsStringify({"test": [
            "11",
            "22"
        ],
        "test2": "11"}));

    });
});
