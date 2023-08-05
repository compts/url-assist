import {joinUrlPath} from "../../dist/esm/src/index";
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
    it('check expected type', function () {

        expectType<string>(joinUrlPath("https://example.com/", "/test"));

    });
});
