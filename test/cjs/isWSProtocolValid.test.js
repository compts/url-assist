const {isWSProtocolValid} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");

describe('ESM: isWSProtocolValid method', function () {

    it('check isWebSocketProtocolValid wss is valid', function () {

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

});
