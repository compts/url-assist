const {isUrlValidFormat} = require("../../src/index");
const assert = require("assert");

describe('CJS: isUrlValidFormat method', function () {

    it('check isUrlValidFormat domain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://example.com"), true);

    });

    it('check isUrlValidFormat subdomain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://www.example.com"), true);

    });


    it('check isUrlValidFormat subdomain is invalid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://ww.www.example.com"), false);

    });

});
