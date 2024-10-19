const {qsParse} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: qsParse method', function () {

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

    it('check qsParse argument has object nested', function () {

        assert.deepStrictEqual(
            qsParse("test=11&test2=11&test3[sa][as]=22"),
            {"test": "11",
                "test2": "11",
                "test3": {"sa": {"as": "22"}}}
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

    it('check qsParse argument to use URI component', function () {

        assert.deepStrictEqual(
            qsParse("a%5Bb%5D=c"),
            {"a": {"b": "c"}}
        );

    });

    it('check qsParse put space if had +', function () {

        assert.deepStrictEqual(qsParse("test+key=test+value"), {"test key": 'test value'});

    });

});
