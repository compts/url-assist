const {formatUrl} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: formatUrl method', function () {

    it('check formatUrl ', function () {

        assert.deepStrictEqual(formatUrl("helloworld"), "helloworld/");


    });


});
