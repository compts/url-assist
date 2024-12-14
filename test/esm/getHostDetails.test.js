import {getHostDetails} from "../../dist/esm/src/index";
import assert from 'assert';

describe('ESM: getHostDetails method', function () {

    it('check getHostDetails check output', function () {

        assert.deepStrictEqual(getHostDetails('https://example.com'), {
            "domainDetails": {
                "domain": "example",
                "domainWithTld": "example.com",
                "subdomain": "",
                "tld": "com"
            },
            "hash": "",
            "hostname": 'example.com',
            "href": 'https://example.com',
            "password": "",
            "pathname": "",
            "port": "",
            "protocol": "https",
            "search": '',
            "user": ''
        });

    });

    it('check getHostDetails with subdomain check output', function () {

        assert.deepStrictEqual(getHostDetails('https://www.example.com'), {
            "domainDetails": {
                "domain": "example",
                "domainWithTld": "example.com",
                "subdomain": "www",
                "tld": "com"
            },
            "hash": "",
            "hostname": 'www.example.com',
            "href": 'https://www.example.com',
            "password": "",
            "pathname": "",
            "port": "",
            "protocol": "https",
            "search": '',
            "user": ''
        });

    });

    it('check getHostDetails with subdomain check port', function () {

        assert.deepStrictEqual(getHostDetails('https://example.com:8080'), {
            "domainDetails": {
                "domain": "example",
                "domainWithTld": "example.com:8080",
                "subdomain": "",
                "tld": "com"
            },
            "hash": "",
            "hostname": 'example.com',
            "href": 'https://example.com:8080',
            "password": "",
            "pathname": "",
            "port": "8080",
            "protocol": "https",
            "search": '',
            "user": ''
        });

    });

    it('check getHostDetails with  check path and query string', function () {

        assert.deepStrictEqual(getHostDetails('https://www.youtube.com/results/?search_query=iu&asd=2#23'), {
            "domainDetails": {
                "domain": "youtube",
                "domainWithTld": "youtube.com",
                "subdomain": "www",
                "tld": "com"
            },
            "hash": "23",
            "hostname": "www.youtube.com",
            "href": "https://www.youtube.com/results/?search_query=iu&asd=2#23",
            "password": "",
            "pathname": "results",
            "port": "",
            "protocol": "https",
            "search": "search_query=iu&asd=2",
            "user": ''
        });

    });

    it('check getHostDetails with  username and domain', function () {

        assert.deepStrictEqual(getHostDetails('git+ssh://gituser@host.xz/path/name.git'), {
            "domainDetails": {
                "domain": "gituser@host",
                "domainWithTld": "gituser@host.xz",
                "subdomain": "",
                "tld": "xz"
            },
            "hash": "",
            "hostname": "host.xz",
            "href": "git+ssh://gituser@host.xz/path/name.git",
            "password": "",
            "pathname": "path/name.git",
            "port": "",
            "protocol": "git+ssh",
            "search": "",
            "user": "gituser"});

    });
    it('check getHostDetails with  username and password in domain', function () {

        assert.deepStrictEqual(getHostDetails('git+ssh://gituser:gitpass@host.xz/path/name.git'), {
            "domainDetails": {
                "domain": "gituser:gitpass@host",
                "domainWithTld": "gituser:gitpass@host.xz",
                "subdomain": "",
                "tld": "xz"
            },
            "hash": "",
            "hostname": "host.xz",
            "href": "git+ssh://gituser:gitpass@host.xz/path/name.git",
            "password": "gitpass",
            "pathname": "path/name.git",
            "port": "",
            "protocol": "git+ssh",
            "search": "",
            "user": "gituser"});

    });

    it('check getHostDetails check IP address', function () {

        assert.deepStrictEqual(getHostDetails('https://127.0.0.1/test'), {
            "domainDetails": {
                "domain": "127.0.0.1",
                "domainWithTld": "",
                "subdomain": "",
                "tld": ""
            },
            "hash": "",
            "hostname": '127.0.0.1',
            "href": 'https://127.0.0.1/test',
            "password": "",
            "pathname": "test",
            "port": "",
            "protocol": "https",
            "search": '',
            "user": ''
        });

    });

});
