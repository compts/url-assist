import {getHostDetails} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: getHostDetails method', function () {

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
    it('check expected type', function () {
       
        expectType<any>(getHostDetails('https://example.com'));
  
      });

});
