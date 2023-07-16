import {isHttpProtocolValid} from "../../dist/esm/src/index";
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

});
