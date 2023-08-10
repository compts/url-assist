import {urlComposer} from "../../dist/esm/src/index";
import assert from 'assert';

const data = urlComposer("http://www.example.com/v1");

describe('ESM: urlComposer method', function () {

    it('check if path has change', function () {

        data.setPath("/v2/gundam/");
        assert.deepStrictEqual(data.getToString(), 'http://www.example.com/v2/gundam');

    });

    it('check if protocol has change', function () {

        data.setProtocol("https");
        assert.deepStrictEqual(data.getToString(), 'https://www.example.com/v2/gundam');

    });

    it('check if subdomain has change', function () {

        data.setDomainSubdomain("service");
        assert.deepStrictEqual(data.getToString(), 'https://service.example.com/v2/gundam');

    });

    it('check if domain has change', function () {

        data.setDomain("youtube");
        assert.deepStrictEqual(data.getToString(), 'https://service.youtube.com/v2/gundam');

    });

});
