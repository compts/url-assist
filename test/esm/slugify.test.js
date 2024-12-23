import {slugify} from "../../dist/esm/src/index";
import assert from 'assert';


describe('ESM: slugify method', function () {

    it('check slugify ', function () {

        assert.deepStrictEqual(slugify("Hello world"), "hello-world");

    });

});
