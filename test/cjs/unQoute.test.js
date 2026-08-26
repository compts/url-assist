const {unQoute} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: unQoute method', function () {


    it('return value string', function () {

        assert.deepStrictEqual(unQoute("%3Fsee%3Dasda%20asd%20asd%20%28%29"), '?see=asda asd asd ()');
        assert.deepStrictEqual(unQoute("%3Fsee%3Dasda%20asd%20asd%20()"), '?see=asda asd asd ()');

    });

    it('return value string with plusToSpace', function () {

        assert.deepStrictEqual(unQoute("%3Fsee%3Dasda+asd+asd+()", {"plusToSpace": true}), '?see=asda asd asd ()');

    });

});


