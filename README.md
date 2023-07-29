# UrlAssist
[![NPM version][npm-image]][npm-url] 

[Site](https://urlassist.codehyouka.xyz/) |
[Docs](https://urlassist.codehyouka.xyz/docs) |

## Download

 * [Core build](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js) ([~10KB](https://raw.githubusercontent.com/compts/url-assist/main/dist/web/url-assist.js))
 * [Dependency build](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js) ([~65KB](https://raw.githubusercontent.com/compts/structkit/main/dist/web/web/structkit-full.iife.js) ([~65KB](https://raw.githubusercontent.com/compts/structkit/main/dist/web/structkit-full.iife.js) ([~65KB](https://raw.githubusercontent.com/compts/structkit/main/dist/web/web/structkit-full.iife.js))

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
[npm-image]: https://img.shields.io/badge/url_assist-1.1.0-brightgreen
