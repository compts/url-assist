const list_package_utility_js = [
    "src/*.js",
    "src/*/*.js",
    "src/*/*/*.js",
    "src/*/*/*/*.js"
];
const list_iife_js = "src/index.js";


exports.module=function (grassconf) {

    const {convertIifeFunction} = grassconf.require("pack-extract");
    const grass_concat = grassconf.require("grass_concat");

    const packpier = grassconf.require("packpier");

    grassconf.load("esm", function () {

        return packpier(
            grassconf.event(),
            {
                "input": {
                    "path": list_package_utility_js
                },
                "output": {
                    "type": "esm" //,esm,cjs,iife,
                },
                "plugin": []
            }
        )
            .pipe(grassconf.dest("dist/esm", {
                "lsFileType": "path",
                "pathDestReplace": {
                    "from": "src/",
                    "to": ""
                }
            }));

    });

    grassconf.load("web_iife", function () {

        return packpier(
            grassconf.event(),
            {
                "input": {
                    "modules": {
                        "replaces": {
                            "structkit": "_stk"
                        }
                    },
                    "path": list_iife_js
                },
                "output": {
                    "globalName": "urs",
                    "type": "iife"
                },
                "plugin": []
            }
        )
            .pipe(grassconf.streamPipe(function (data) {

                let getData = data.readData();

                getData = getData.replace("(function(global){\nglobal.urs={};", "const _stk = require('structkit');\nconst urs = exports;");
                getData = getData.replace('})(typeof window !== "undefined" ? window : this);', "\n //end of file");
                data.writeData(getData);
                data.done();

            }))
            .pipe(grass_concat("dist/cjs/url-assist.cjs.js", {
                "istruncate": true
            }))
            .pipe(grassconf.streamPipe(function (data) {

                let getData = data.readData();

                getData = convertIifeFunction(getData, true);
                getData = getData.replace("const _stk = require('structkit');\nconst urs = exports;", "(function(global){\nglobal.urs={};");
                getData = getData.replace("//end of file", '})(typeof window !== "undefined" ? window : this);');
                getData = getData.replace(/([\s\n\r\t]{0,})(const|let)\s{1,}/g, "$1var ");
                data.writeData(getData);
                data.done();

            }))
            .pipe(grass_concat("dist/web/url-assist.js", {
                "istruncate": true
            }));

    });

};

exports.execute=function (lib) {

    lib.default=function (strm) {

        strm.series("web_iife");
        strm.series("esm");

    };

    return lib;

};

