import {joinUrlPath} from "../../dist/esm/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: joinUrlPath method', function () {

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

    it('check joinUrlPath path/ and /path', function () {

        assert.deepStrictEqual(joinUrlPath("/test1", "/test"), "/test1/test");

    });

    it('check joinUrlPath url, path/ and id/', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com", "/test/", "id/"), "https://example.com/test/id");

    });
    it('check joinUrlPath url, path/ and id/ with trailing slash', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com/", "/test/", "id/"), "https://example.com/test/id");

    });
    it('check joinUrlPath url, path/ and id/ with trailing slash and query', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com/", "/test/", "id/?query=1"), "https://example.com/test/id/?query=1");

    });
    it('check joinUrlPath url, path/ and id/ with trailing slash and query with hash', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com/", "/test/", "id/?query=1#hash"), "https://example.com/test/id/?query=1#hash");

    });
    it('check joinUrlPath url, path/ and id/ with trailing slash and query with hash and port', function () {

        assert.deepStrictEqual(joinUrlPath("https://example.com:8080/", "/test/", "id/?query=1#hash"), "https://example.com:8080/test/id/?query=1#hash");

    });
    it('check joinUrlPath url, path/ and id/ with trailing slash and query with hash and port with subdomain', function () {

        assert.deepStrictEqual(joinUrlPath("https://www.example.com:8080/", "/test/", "id/?query=1#hash"), "https://www.example.com:8080/test/id/?query=1#hash");

    });    

    it('check expected type', function () {

        expectType<string>(joinUrlPath("https://example.com/", "/test"));

    });
});
