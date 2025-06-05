import {isUrlValidFormat} from "../../dist/esm/index";
import assert from 'assert';

describe('ESM: isUrlValidFormat method', function () {

    it('check isUrlValidFormat domain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://example.com"), true);

    });

    it('check isUrlValidFormat subdomain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://www.example.com"), true);

    });
    it('check isUrlValidFormat subdomain is invalid', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://@.eq@.com/"), false);

    });
    it('check isUrlValidFormat with port is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://example.com:8080"), true);

    });
    it('check isUrlValidFormat with port is invalid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://example.com:8080"), true);

    });
    it('check isUrlValidFormat with empty string', function () {

        assert.deepStrictEqual(isUrlValidFormat(""), false);

    });
    it('check isUrlValidFormat with invalid URL', function () {

        assert.deepStrictEqual(isUrlValidFormat("invalid-url"), false);

    });
    it('check isUrlValidFormat with URL without protocol', function () {

        assert.deepStrictEqual(isUrlValidFormat("example.com"), false);

    });
    it('check isUrlValidFormat with URL with only protocol', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://"), false);

    });

});
