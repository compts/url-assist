import {slugify} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';


describe('ESM: slugify method', function () {

    it('check slugify ', function () {

        assert.deepStrictEqual(slugify("Hello world"), "hello-world");

    });

    it('check expected type string', function () {

        expectType<string>(slugify("Hello world"));

    });

});
