import {isHttpProtocolValid} from "../../dist/esm/index";
import assert from 'assert';

describe('ESM: isHttpProtocolValid method', function () {

    it('check isHttpProtocolValid https is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://example.com"), true);

    });

    it('check isHttpProtocolValid http is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("http://example.com"), true);

    });

    it('check isHttpProtocolValid ftp is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("ftp://example.com"), false);

    });

    it('check isHttpProtocolValid ssh is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("ssh://example.com"), false);

    });

    it('check isHttpProtocolValid ip is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("http://127.0.0.1"), true);

    });

    it('check isHttpProtocolValid ip with port is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("http://127.0.0.1:8000"), true);

    });

    it('check isHttpProtocolValid localhost is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("http://localhost"), true);

    });

    it('check isHttpProtocolValid localhost:8080 is valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("http://localhost:8080"), true);

    });
    it('check isHttpProtocolValid empty string is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid(""), false);

    });
    it('check isHttpProtocolValid invalid URL is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("invalid-url"), false);

    });
    it('check isHttpProtocolValid URL without protocol is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("example.com"), false);

    });
    it('check isHttpProtocolValid URL with only protocol is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and port is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://:8080"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www."), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port with path is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080/test"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port with path and query is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080/test?query=1"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port with path and query and hash is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080/test?query=1#hash"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port with path and query and hash with trailing slash is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080/test?query=1#hash/"), false);

    });
    it('check isHttpProtocolValid URL with only protocol and subdomain and port with path and query and hash with trailing slash and port is not valid', function () {

        assert.deepStrictEqual(isHttpProtocolValid("https://www.:8080/test?query=1#hash/"), false);

    });

});
