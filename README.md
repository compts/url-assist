# UrlAssist
[![NPM version][npm-image]][npm-url] 

[Site](https://urlassist.codehyouka.xyz/) |
[Docs](https://urlassist.codehyouka.xyz/docs) |

## Download

 * [Core build](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js) ([~10KB](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js))
 * [Dependency build](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js)  ([~65KB](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js))

Using npm:
```shell
$ npm i url-assist
```
## Requirement
You need to install this in your machine to compile in your machine
```bash
npm install grasseum -g
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
[npm-image]: https://img.shields.io/badge/url_assist-1.2.0-brightgreen

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
