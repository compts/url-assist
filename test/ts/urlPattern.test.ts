import {urlPattern} from "../../dist/esm/src/index";
import assert from 'assert';
import {expectType} from 'tsd';


const pattern1 = urlPattern(":id", "1");
const pattern2 = urlPattern(/a\/([a-z]{1,})/, "/a/sdindex");

describe('TS: urlPattern method', function () {

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

    it('check expected `isValid` type boolean', function () {

        expectType<boolean>(pattern1.isValid());

    });

    it('check expected `getParam` type boolean', function () {

        expectType<any>(pattern1.getParam());

    });
});
