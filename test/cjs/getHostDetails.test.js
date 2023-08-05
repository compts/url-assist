const {getHostDetails} = require("../../src/index");
const assert = require("assert");


describe('CJS: getHostDetails method', function () {

    it('check getHostDetails check output', function () {

        assert.deepStrictEqual(getHostDetails('https://example.com'), {
            "domainDetails": {
                "domain": "example",
                "domainWithTld": "example.com",
                "subdomain": "",
                "tld": "com"
            },
            "hostArgument": 'https://example.com',
            "hostname": 'example.com',
            "pathname": "/",
            "port": "",
            "protocol": "https",
            "search": '',
            "type": "http"
        });

    });

    it('check getHostDetails with subdomain check output', function () {

        assert.deepStrictEqual(getHostDetails('https://www.example.com'), {
            "domainDetails": {
                "domain": "example",
                "domainWithTld": "example.com",
                "subdomain": "www",
                "tld": "com"
            },
            "hostArgument": 'https://www.example.com',
            "hostname": 'www.example.com',
            "pathname": "/",
            "port": "",
            "protocol": "https",
            "search": '',
            "type": "http"
        });

    });

});
