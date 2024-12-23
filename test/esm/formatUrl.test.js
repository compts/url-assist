import {formatUrl} from "../../dist/esm/src/index";
import assert from 'assert';


describe('CJS: formatUrl method', function () {

    it('check formatUrl ', function () {

        assert.deepStrictEqual(formatUrl("helloworld"), "helloworld/");


    });


});
