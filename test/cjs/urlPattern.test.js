const {urlPattern} = require("../../src/index");
const assert = require("assert");


const pattern1 = urlPattern(":id", "1");

describe('CJS: urlPattern method', function () {

    it('check urlPattern is valid', function () {

        assert.deepStrictEqual(pattern1.isValid(), true);


    });

    it('check urlPattern get value getParam', function () {

        assert.deepStrictEqual(pattern1.getParam(), {
            "id": "1"
        });


    });

});
