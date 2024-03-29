import {isUrlExtValid} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: isUrlExtValid method', function () {

    it('check isUrlExtValid extension is valid js', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js', 'js'), true);

    });

    it('check isUrlExtValid extension is valid css', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js', 'css'), false);

    });

    it('check isUrlExtValid extension with argument', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1', 'js'), true);

    });

});
