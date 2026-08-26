const {decodeURI} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: decodeURI method', function () {

    it('return value string with decoded characters', function () {

        assert.deepStrictEqual(decodeURI("https%3A%2F%2Fexample.com%2Fhello%20world%3Fx%3D1%26y%3Dtwo%20three"), "https://example.com/hello world?x=1&y=two three");

    });

    it('return value string while keeping invalid sequences intact', function () {

        assert.deepStrictEqual(decodeURI("hello%ZZworld"), "hello%ZZworld");

    });

    it('return value string with special characters decoded', function () {

        assert.deepStrictEqual(decodeURI("a%21b%2Ac%28d%29e%27f%22g"), "a!b*c(d)e'f\"g");

    });

    it('return value string with mixed valid and invalid sequences', function () {

        assert.deepStrictEqual(decodeURI("valid%20string%ZZinvalid"), "valid string%ZZinvalid");

    });

});
