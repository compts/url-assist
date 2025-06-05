# UrlAssist
[![NPM version][npm-image]][npm-url]
[![Build Status](https://github.com/compts/url-assist/actions/workflows/cicd.yaml/badge.svg?branch=main)](https://github.com/compts/url-assist/actions)
[![NPM Downloads](https://img.shields.io/npm/dm/url-assist?logo=npm&style=flat-square)](https://npmtrends.com/url-assist)

[Site](https://urlassist.codehyouka.xyz/) |
[Docs](https://urlassist.codehyouka.xyz/api) |

## Download

 * [Core build](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js) ([~10KB](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js))
 * [Dependency build](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js)  ([~65KB](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js))

Using npm:
```shell
$ npm i url-assist
```

## How to import the Library

In a browser :
```html
<script src="structkit-full.iife.js"></script>
<script src="url-assist.js"></script>
```

Import on cjs
```bash
const {isUrlExtValid} = require('url-assist');

```

Import on ESM or TS
```bash
import {isUrlExtValid} from 'url-assist';

```

## Example

In a browser
```html
urs.isUrlExtValid('https://example.com/example.js', 'js')
```
keep in mind `urs` is used as global library at html


CJS, ESM and TS use this code below
```bash
isUrlExtValid('https://example.com/example.js', 'js')

```

[npm-url]: https://www.npmjs.com/package/url-assist
[npm-image]: https://img.shields.io/badge/url_assist-1.2.7-brightgreen

## List of method you can use to check your url

[match pattern against extension in url](#match-pattern-extension-url)
``` javascript
isUrlExtValid('https://example.com/example.js', 'js')// true
isUrlExtValid('https://example.com/example.js', 'css')// false
```
[get the domain or url details](#get-domain-details)
``` javascript
getHostDetails('https://www.example.com')
// => {
//            "domainDetails": {
//                "domain": "example",
//                "domainWithTld": "example.com",
//                "subdomain": "www",
//                "tld": "com"
//            },
//            "hash": "",
//            "hostname": 'www.example.com',
//            "href": 'https://www.example.com',
//            "password": "",
//            "pathname": "",
//            "port": "",
//            "protocol": "https",
//            "search": '',
//            "user": ''
//        }
```

[check if url is valid https](#check-valid-https)
``` javascript
isHttps('https://example.com')// true
```

[Verify your pattern and url structure](#check-valid-https)
``` javascript
data = urs.urlPattern("/:id", "/test")
data.isValid() // true
data.getParam() // {id: 'test'}

```

[Verify your pattern and url structure only number as parameter](#check-valid-https)
``` javascript
data = urs.urlPattern("/:id<number>", "/1")
data.isValid() // true
data.getParam() // {id: '1'}

```

[Compose your url structure](#check-valid-https)
``` javascript
data = urlComposer('https://example.com')
data.getToString() // 'https://example.com'
data.setDomainSubdomain("api")
data.getToString() // 'https://api.example.com'
data.setProtocol("http")
data.getToString() // http://api.example.com/

```

[Query String parser](#query-string-parser)
``` javascript
qsParse("test=1&test2=11") //{"test": 11,"test2": 11}

```

[Query String to Stringify](#query-string-stringify)
``` javascript
qsStringify({"test": 11,"test2": 11}) //test=1&test2=11

```

[To join the path](#to-join-path)
``` javascript
joinUrlPath('https://example.com','test') //https://example.com/test

```

[Check url is valid format](#check-valid-format-url)
``` javascript
isUrlValidFormat('https://example.com')// true
isUrlValidFormat('ftp://example.com')// false
```

[Check https only](#check-https-url)
``` javascript
isHttps('https://example.com')// true
isHttps('http://example.com')// false
```

[Check https/http is valid](#check-https-http-valid)
``` javascript
isHttpProtocolValid('https://example.com')// true
isHttpProtocolValid('ftp://example.com')// false
```

[slugify your url/path](#slugify)
``` javascript
slugify("Hello world 123")// "hello-world-123"
```