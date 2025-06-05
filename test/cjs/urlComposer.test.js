const {urlComposer} = require("../../dist/cjs/url-assist.cjs");
const assert = require("assert");

const data = urlComposer("http://www.example.com/v1");

const one = 1;
const port = 8080;

describe('CJS: urlComposer method', function () {

    it('check if path has change', function () {

        data.setPath("/v2/gundam/");
        assert.deepStrictEqual(data.getToString(), 'http://www.example.com/v2/gundam');

    });

    it('check if protocol has change', function () {

        data.setProtocol("https");
        assert.deepStrictEqual(data.getToString(), 'https://www.example.com/v2/gundam');

    });

    it('check if subdomain has change', function () {

        data.setSubdomain("service");
        assert.deepStrictEqual(data.getToString(), 'https://service.example.com/v2/gundam');

    });

    it('check if domain has change', function () {

        data.setDomain("youtube");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v2/gundam');

    });

    it('check if domain is invalid then path will show', function () {

        const data1 = urlComposer("/v1/test");

        data1.setDomain("youtube");
        assert.deepStrictEqual(data1.getToString(), '/v1/test');

    });

    it('check if path prefix has change', function () {

        data.setPath("gundam/");
        data.setPathPrefix("v1");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v1/gundam');

    });

    it('check if path prefix has change with slash', function () {

        data.setPath("gundam/");
        data.setPathPrefix("/v1/");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v1/gundam');

    });
    it('check if path prefix has change with slash and query', function () {

        data.setPath("gundam/");
        data.setPathPrefix("/v1/");
        data.setQueryString("test=1");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v1/gundam?test=1');

    });
    it('check if path prefix has change with slash and query and hash', function () {

        data.setPath("gundam/");
        data.setPathPrefix("/v1/");
        data.setQueryString({"test": one});
        data.setHash("hash");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v1/gundam?test=1#hash');

    });
    it('check if path prefix has change with slash and query and hash and port', function () {

        data.setPath("gundam/");
        data.setPathPrefix("/v1/");
        data.setQueryString({"test": one});
        data.setHash("hash");
        data.setPort(port);
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com:8080/v1/gundam?test=1#hash');

    });
    it('check if path prefix has change with slash and query and hash and port with subdomain', function () {

        data.setPath("gundam/");
        data.setPathPrefix("/v1/");
        data.setQueryString("test=1");
        data.setHash("hash");
        data.setPort(port);
        data.setSubdomain("www.service");
        assert.deepStrictEqual(data.getToString(), 'https://www.service.youtube.com:8080/v1/gundam?test=1#hash');

    });

});
