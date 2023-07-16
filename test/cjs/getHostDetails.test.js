const {getHostDetails} = require("../../src/index");
const assert = require("assert");


describe('CJS: getHostDetails method', function () {

    it('check getHostDetails check output', function () {

        assert.deepStrictEqual(getHostDetails('https://example.com'), {
            "hostArgument": 'https://example.com',
            "hostname": 'example.com',
            "pathname": "/",
            "port": "",
            "protocol": "https",
            "search": '',
            "type": "http"
        });

    });

});
