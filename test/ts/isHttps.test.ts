import {isHttps} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: isHttps method', function () {

    it('check isHttps is valid', function () {

        assert.deepStrictEqual(isHttps("https://example.com"), true);

    });

    it('check isHttps is not valid', function () {

        assert.deepStrictEqual(isHttps("http://example.com"), false);

    });
    it('check isHttps with subdomain is valid', function () {

        assert.deepStrictEqual(isHttps("https://www.example.com"), true);

    });
    it('check isHttps with subdomain is not valid', function () {

        assert.deepStrictEqual(isHttps("http://www.example.com"), false);

    });
    it('check isHttps with port is valid', function () {

        assert.deepStrictEqual(isHttps("https://example.com:8080"), true);

    });
    it('check isHttps with port is not valid', function () {

        assert.deepStrictEqual(isHttps("http://example.com:8080"), false);

    });
    it('check isHttps with empty string', function () {

        assert.deepStrictEqual(isHttps(""), false);

    });
    it('check isHttps with invalid URL', function () {

        assert.deepStrictEqual(isHttps("invalid-url"), false);

    });
    it('check isHttps with URL without protocol', function () {

        assert.deepStrictEqual(isHttps("example.com"), false);

    });
    it('check isHttps with URL with only protocol', function () {

        assert.deepStrictEqual(isHttps("https://"), false);

    });
    it('check isHttps with URL with only protocol and port', function () {

        assert.deepStrictEqual(isHttps("https://:8080"), false);

    });
    it('check isHttps with URL with only protocol and subdomain', function () {

        assert.deepStrictEqual(isHttps("https://www."), false);

    });
    it('check isHttps with URL with only protocol and path', function () {

        assert.deepStrictEqual(isHttps("https://example.com/path"), true);

    });
    it('check isHttps with URL with protocol and query string', function () {

        assert.deepStrictEqual(isHttps("https://example.com?query=string"), true);

    });
    it('check isHttps with URL with protocol, path and query string', function () {

        assert.deepStrictEqual(isHttps("https://example.com/path?query=string"), true);

    });    

    it('check expected type', function () {
       
        expectType<boolean>(isHttps('https://example.com'));
  
    });
});
