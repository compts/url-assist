const {slugify} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");


describe('CJS: slugify method', function () {

    it('check slugify ', function () {

        assert.deepStrictEqual(slugify("Hello world"), "hello-world");


    });
    it('check slugify with special characters', function () {

        assert.deepStrictEqual(slugify("Hello, world!"), "hello-world");

    });
    it('check slugify with numbers', function () {

        assert.deepStrictEqual(slugify("Hello world 123"), "hello-world-123");

    });
    it('check slugify with multiple spaces', function () {

        assert.deepStrictEqual(slugify("Hello    world"), "hello-world");

    });
    it('check slugify with leading and trailing spaces', function () {

        assert.deepStrictEqual(slugify("  Hello world  "), "hello-world");

    });
    it('check slugify with empty string', function () {

        assert.deepStrictEqual(slugify(""), "");

    });
    it('check slugify with non-ASCII characters', function () {

        assert.deepStrictEqual(slugify("Héllo Wörld"), "hello-world");

    });
    it('check slugify with mixed case', function () {

        assert.deepStrictEqual(slugify("Hello World"), "hello-world");

    });
    it('check slugify with dashes', function () {

        assert.deepStrictEqual(slugify("Hello-World"), "hello-world");

    });
    it('check slugify with underscores', function () {

        assert.deepStrictEqual(slugify("Hello_World"), "hello-world");

    });
    it('check slugify with multiple dashes', function () {

        assert.deepStrictEqual(slugify("Hello--World"), "hello-world");

    });
    it('check slugify with multiple underscores', function () {

        assert.deepStrictEqual(slugify("Hello__World"), "hello-world");

    });
    it('check slugify with URL-like string', function () {

        assert.deepStrictEqual(slugify("https://example.com/Hello World"), "hello-world");

    });
    it('check slugify with string containing only special characters', function () {

        assert.deepStrictEqual(slugify("!@#$%^&*()", {"replaceStrictMap": false}), "");

    });
    it('check slugify with string containing only numbers', function () {

        assert.deepStrictEqual(slugify("1234567890"), "1234567890");

    });
    it('check slugify with string containing mixed characters', function () {

        assert.deepStrictEqual(slugify("Hello 123, world!"), "hello-123-world");

    });
    it('check slugify with custom separator', function () {

        assert.deepStrictEqual(slugify("Hello World", {"delimiter": "_"}), "hello_world");

    });
    it('check slugify with custom replacement map', function () {

        assert.deepStrictEqual(slugify("Hello World", {"dictStrictMap": {" ": "_"}}), "hello_world");

    });


});
