import {isUrlExtValid} from "../../dist/esm/index";
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
    it('check isUrlExtValid extension with argument and hash', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'js'), true);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'css'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'html'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'html'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'js'), true);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'css'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'html'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'js'), true);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'css'), false);

    });
    it('check isUrlExtValid extension with argument and hash with different extension', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js?ssasa=1%20&sa=1#hash', 'html'), false);

    });

});
