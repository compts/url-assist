import {urlPattern} from "../../dist/esm/src/index";
import assert from 'assert';


const pattern1 = urlPattern(":id", "1");

describe('ESM: urlPattern method', function () {

    it('check urlPattern is valid', function () {

        assert.deepStrictEqual(pattern1.isValid(), true);


    });

    it('check urlPattern get value getParam', function () {

        assert.deepStrictEqual(pattern1.getParam(), {
            "id": "1"
        });


    });

});
