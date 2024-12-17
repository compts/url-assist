import {formatUrl} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';


describe('CJS: formatUrl method', function () {

    it('check formatUrl ', function () {

        assert.deepStrictEqual(formatUrl("helloworld"), "helloworld/");


    });
    it('check expected type string', function () {

        expectType<string>(formatUrl("helloworld"));

    });


});
