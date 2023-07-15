import {isHttps} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: isHttps method', function () {

    it('check isHttps is valid', function () {

        assert.deepStrictEqual(isHttps("https://example.com"), true);

    });

    it('check isHttps is not valid', function () {

        assert.deepStrictEqual(isHttps("http://example.com"), false);

    });

});
