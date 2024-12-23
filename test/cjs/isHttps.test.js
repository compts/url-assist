const {isHttps} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");

describe('CJS: isHttps method', function () {

    it('check isHttps is valid', function () {

        assert.deepStrictEqual(isHttps("https://example.com"), true);

    });

    it('check isHttps is not valid', function () {

        assert.deepStrictEqual(isHttps("http://example.com"), false);

    });

});
