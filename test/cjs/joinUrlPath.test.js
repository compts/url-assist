const {joinUrlPath} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");

describe('CJS: joinUrlPath method', function () {

    it('check joinUrlPath url and path', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com", "test"), "https://example.com/test");

    });

    it('check joinUrlPath url/ and path', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com/", "test"), "https://example.com/test");

    });

    it('check joinUrlPath url and /path', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com", "/test"), "https://example.com/test");

    });

    it('check joinUrlPath url/ and /path', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com/", "/test"), "https://example.com/test");

    });

    it('check joinUrlPath url, path/ and id/', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com", "/test/", "id/"), "https://example.com/test/id");

    });

});
