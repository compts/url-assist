import {isHttps} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: isHttps method', function () {

    it('check isHttps is valid', function () {

        assert.deepStrictEqual(isHttps("https://example.com"), true);

    });

    it('check isHttps is not valid', function () {

        assert.deepStrictEqual(isHttps("http://example.com"), false);

    });

    it('check expected type', function () {
       
        expectType<boolean>(isHttps('https://example.com'));
  
    });
});
