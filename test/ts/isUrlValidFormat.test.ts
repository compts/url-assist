import {isUrlValidFormat} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';

describe('TS: isUrlValidFormat method', function () {

    it('check isUrlValidFormat domain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("https://example.com"), true);

    });

    it('check isUrlValidFormat subdomain is valid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://www.example.com"), true);

    });

    it('check isUrlValidFormat subdomain is invalid', function () {

        assert.deepStrictEqual(isUrlValidFormat("http://ww.www.example.com"), false);

    });

    it('check expected type', function () {
       
        expectType<boolean>(isUrlValidFormat('https://example.com'));
  
      });



});
