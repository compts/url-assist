const list_package_full_js = ["src/lib/*/index.js"];

exports.module=function (grassconf) {

    const grass_concat = grassconf.require("grass_concat");
    const grass_composer = grassconf.require("grass_composer");
    const grass_beautifier = grassconf.require("grass_beautifier");
    const compts_script_interpreter = grassconf.require("compts-script-interpreter");

    grassconf.load("js_full_package", function () {

        return grassconf.src(list_package_full_js)

            .pipe(compts_script_interpreter.esm_to_cjs({
                "isWeb": false
            }))
            .pipe(grass_concat(__dirname+"/dist/node.cjs.js", {
                "istruncate": true,
                "main_file": __dirname+"/src/a_test_import.js"
            }));


    });

};

exports.execute=function (lib) {

    lib.default=function (strm) {

        strm.series("js_full_package");


    };


    return lib;

};

