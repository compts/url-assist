import {charsetToEn} from "../../dist/esm/index.mjs";
import assert from 'assert';


describe('ESM: charsetToEn method', function () {

    it('check slugify with non-ASCII characters', function () {

        assert.deepStrictEqual(charsetToEn("Héllo Wörld"), "Hello World");

    });

    it('check charsetToEn with custom replacement map', function () {

        assert.deepStrictEqual(charsetToEn("Hello$World", {"dictStrictMap": {"$": "dollar_dollar"}}), "Hellodollar_dollarWorld");

    });


});
