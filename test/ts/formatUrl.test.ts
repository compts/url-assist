import {formatUrl} from "../../src/index";
import assert from 'assert';
import {expectType} from 'tsd';


describe('CJS: formatUrl method', function () {

    it('check formatUrl ', function () {

        assert.deepStrictEqual(formatUrl("helloworld"), "helloworld/");


    });
    it('check formatUrl with protocol', function () {

        assert.deepStrictEqual(formatUrl("https://example.com"), "https://example.com/");

    });
    it('check formatUrl with protocol and path', function () {

        assert.deepStrictEqual(formatUrl("https://example.com/test"), "https://example.com/test/");

    });
    it('check formatUrl with protocol, path and query', function () {

        assert.deepStrictEqual(formatUrl("https://example.com/test?query=1"), "https://example.com/test/?query=1");

    });
    it('check formatUrl with protocol, path, query and hash', function () {

        assert.deepStrictEqual(formatUrl("https://example.com/test?query=1#hash"), "https://example.com/test/?query=1#hash");

    });    
    it('check expected type string', function () {

        expectType<string>(formatUrl("helloworld"));

    });


});
