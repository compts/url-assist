import {charsetToEn} from "../../dist/esm/index.mjs";
import assert from 'assert';
import {expectType} from 'tsd';

describe('ESM: charsetToEn method', function () {


    it('check expected type string', function () {

        expectType<string>(charsetToEn("Hello world"));

    });
    it('check charsetToEn with non-ASCII characters', function () {

        assert.deepStrictEqual(charsetToEn("Héllo Wörld"), "Hello World");

    });

    it('check charsetToEn with custom replacement map', function () {

        assert.deepStrictEqual(charsetToEn("Hello$World", {"dictStrictMap": {"$": "dollar_dollar"}}), "Hellodollar_dollarWorld");

    });


});
