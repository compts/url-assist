import {urlPattern} from "../../dist/esm/node.esm";
import assert from 'assert';


const pattern1 = urlPattern(":id", "1");
const pattern2 = urlPattern(/a\/([a-z]{1,})/, "/a/sdindex");
const pattern3 = urlPattern("/yahoo/:id<number>/edit", "/yahoo/123/edit");

describe('ESM: urlPattern method', function () {

    it('check urlPattern is valid', function () {

        assert.deepStrictEqual(pattern1.isValid(), true);


    });

    it('check urlPattern get value getParam', function () {

        assert.deepStrictEqual(pattern1.getParam(), {
            "id": "1"
        });


    });

    it('check urlPattern regexp is valid', function () {

        assert.deepStrictEqual(pattern2.isValid(), true);


    });

    it('check urlPattern regexp get value getParam', function () {

        assert.deepStrictEqual(pattern2.getParam(), {
            "arg0": "sdindex"
        });


    });

    it('check urlPattern with path is valid', function () {

        assert.deepStrictEqual(pattern3.isValid(), true);


    });

    it('check urlPattern with path get value getParam', function () {

        assert.deepStrictEqual(pattern3.getParam(), {
            "id": "123"
        });


    });

});
