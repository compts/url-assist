import {formatUrl} from "../../dist/esm/node.esm";
import assert from 'assert';


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


});
