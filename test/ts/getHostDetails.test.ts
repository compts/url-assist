import {getHostDetails} from "../../dist/esm/src/index";
import assert from 'assert';

describe('TS: getHostDetails method', function () {

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
