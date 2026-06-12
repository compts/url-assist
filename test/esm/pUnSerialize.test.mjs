import {pUnSerialize} from "../../dist/esm/node.esm.mjs";
import assert from 'assert';

const one =1;
const two =2;
const three =3;
const four =4;

describe('ESM: pUnSerialize method', function () {

    it('return value string', function () {

        assert.deepStrictEqual(pUnSerialize('s:6:"Violet";'), "Violet");

    });

    it('return value null', function () {

        assert.deepStrictEqual(
            pUnSerialize("N;"),
            null
        );

    });

    it('return value `ones`', function () {

        assert.deepStrictEqual(
            pUnSerialize("i:1;"),
            one
        );

    });
    it('return value `array`', function () {

        assert.deepStrictEqual(
            pUnSerialize("a:1:{i:0;s:3:\"22s\";};"),
            ["22s"]
        );

    });

    it('return value for color `array`', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:3:{i:0;s:3:"Red";i:1;s:5:"Green";i:2;s:4:"Blue";}'),
            [
                "Red",
                "Green",
                "Blue"
            ]
        );

    });

    it('return value for color `dict`', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:2:{s:2:"s1";s:5:"test1";s:2:"s2";s:5:"test2";}'),
            {"s1": "test1",
                "s2": "test2"}
        );

    });

    it('return value for color `dict` with array', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:2:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}'),
            {"w1": "with1",
                // eslint-disable-next-line sort-keys
                "array": [
                    one,
                    two,
                    three,
                    four
                ]}
        );

    });
    it('return value for empty string', function () {

        assert.deepStrictEqual(
            pUnSerialize('s:0:"";'),
            ""
        );

    });

    it('return value for nested `dict` with array', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:3:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}s:4:"dict";a:2:{s:1:"a";s:2:"a1";s:1:"b";s:2:"b2";}}'),
            {
                "array": [
                    one,
                    two,
                    three,
                    four
                ],
                "dict": {
                    "a": "a1",
                    "b": "b2"
                },
                "w1": "with1"
            }
        );

    });

    it('return value for complex nested `dict` with array', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:4:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}s:4:"dict";a:2:{s:1:"a";s:2:"a1";s:1:"b";s:2:"b2";}s:6:"nested";a:2:{s:3:"sub";a:2:{i:0;s:6:"nested";i:1;s:4:"data";}s:5:"level";i:2;}}'),
            {
                "array": [
                    one,
                    two,
                    three,
                    four
                ],
                "dict": {
                    "a": "a1",
                    "b": "b2"
                },
                "nested": {
                    "level": 2,
                    "sub": [
                        "nested",
                        "data"
                    ]
                },
                "w1": "with1"
            }
        );

    });

    it('return value for empty array', function () {

        assert.deepStrictEqual(
            pUnSerialize('a:0:{}'),
            []
        );

    });

});


