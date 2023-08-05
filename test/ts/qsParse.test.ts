import {qsParse} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: qsParse method', function () {

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
    it('check expected type', function () {

        expectType<any>(qsParse("test=11&test2=11&test=22"));

    });

    it('check qsParse argument has object nested', function () {

        assert.deepStrictEqual(
            qsParse("test=11&test2=11&test3[sa][as]=22"),
            {"test": "11",
                "test2": "11",
                "test3": {"sa": "22"}}
        );

    });

    it('check qsParse argument has list and object distinction', function () {

        assert.deepStrictEqual(
            qsParse("test=11&test2=11&test[sa]=22"),
            {"test": [
                "11",
                {"sa": "22"}
            ],
                "test2": "11"}
        );

    });
});
