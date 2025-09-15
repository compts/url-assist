import {isWSProtocolValid} from "../../dist/esm/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: isWSProtocolValid method', function () {

    it('check isWSProtocolValid wss is valid', function () {

        assert.deepStrictEqual(isWSProtocolValid("wss://example.com"), true);

    });

    it('check isWSProtocolValid ws is valid', function () {

        assert.deepStrictEqual(isWSProtocolValid("ws://example.com"), true);

    });

    it('check isHttpProtocolValid http is not valid', function () {

        assert.deepStrictEqual(isWSProtocolValid("http://example.com"), false);

    });

    it('check isHttpProtocolValid https is not valid', function () {

        assert.deepStrictEqual(isWSProtocolValid("https://example.com"), false);

    });
    it('check expected type', function () {

        expectType<boolean>(isWSProtocolValid('https://example.com'));

    });
});
