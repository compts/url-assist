import {joinUrlPath} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: joinUrlPath method', function () {

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
