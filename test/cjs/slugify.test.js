const {slugify} = require("../../src/index");
const assert = require("assert");


describe('CJS: slugify method', function () {

    it('check slugify ', function () {

        assert.deepStrictEqual(slugify("Hello world"), "hello-world");


    });


});
