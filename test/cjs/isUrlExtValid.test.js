const {isUrlExtValid} = require("../../src/index");
const assert = require("assert");

describe('CJS: isUrlExtValid method', function () {

    it('check isUrlExtValid extension is valid js', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js', 'js'), true);

    });

    it('check isUrlExtValid extension is valid css', function () {

        assert.deepStrictEqual(isUrlExtValid('https://example.com/example.js', 'css'), false);

    });

});
