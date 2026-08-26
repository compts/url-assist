const {qoute} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: qoute method', function () {


    it('return value string', function () {

        assert.deepStrictEqual(qoute("?see=asda asd asd ()"), '%3Fsee%3Dasda%20asd%20asd%20%28%29');

    });

    it('return value string with safe characters', function () {

        assert.deepStrictEqual(qoute("?see=asda asd asd ()", {"safe": "()"}), '%3Fsee%3Dasda%20asd%20asd%20()');

    });

});


