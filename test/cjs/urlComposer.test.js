const {urlComposer} = require("../../src/index");
const assert = require("assert");

const data = urlComposer("http://www.example.com/v1");

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

});
