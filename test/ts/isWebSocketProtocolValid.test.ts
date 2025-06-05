import {isWebSocketProtocolValid} from "../../dist/esm/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: isWebSocketProtocolValid method', function () {

    it('check isWebSocketProtocolValid wss is valid', function () {

        assert.deepStrictEqual(isWebSocketProtocolValid("wss://example.com"), true);

    });

    it('check isWebSocketProtocolValid ws is valid', function () {

        assert.deepStrictEqual(isWebSocketProtocolValid("ws://example.com"), true);

    });

    it('check isHttpProtocolValid http is not valid', function () {

        assert.deepStrictEqual(isWebSocketProtocolValid("http://example.com"), false);

    });

    it('check isHttpProtocolValid https is not valid', function () {

        assert.deepStrictEqual(isWebSocketProtocolValid("https://example.com"), false);

    });
    it('check expected type', function () {

        expectType<boolean>(isWebSocketProtocolValid('https://example.com'));

    });
});
