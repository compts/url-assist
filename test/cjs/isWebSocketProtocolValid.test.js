const {isWebSocketProtocolValid} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");

describe('ESM: isWebSocketProtocolValid method', function () {

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

});
