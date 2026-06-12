import {pSerialize} from "../../dist/esm/node.esm.mjs";
import assert from 'assert';

const one =1;
const two =2;
const three =3;
const four =4;

describe('ESM: pSerialize method', function () {

    it('return value string', function () {

        assert.deepStrictEqual(pSerialize("Violet"), 's:6:"Violet";');

    });

    it('return value null', function () {

        assert.deepStrictEqual(
            pSerialize(null),
            "N;"
        );

    });

    it('return value `ones`', function () {

        assert.deepStrictEqual(
            pSerialize(one),
            "i:1;"
        );

    });
    it('return value `array`', function () {

        assert.deepStrictEqual(
            pSerialize(["22s"]),
            "a:1:{i:0;s:3:\"22s\";}"
        );

    });

    it('return value for color `array`', function () {

        assert.deepStrictEqual(
            pSerialize([
                "Red",
                "Green",
                "Blue"
            ]),
            'a:3:{i:0;s:3:"Red";i:1;s:5:"Green";i:2;s:4:"Blue";}'
        );

    });

    it('return value for color `dict`', function () {

        assert.deepStrictEqual(
            pSerialize({"s1": "test1",
                "s2": "test2"}),
            'a:2:{s:2:"s1";s:5:"test1";s:2:"s2";s:5:"test2";}'
        );

    });

    it('return value for color `dict` with array', function () {

        assert.deepStrictEqual(
            pSerialize({"w1": "with1",
                // eslint-disable-next-line sort-keys
                "array": [
                    one,
                    two,
                    three,
                    four
                ]}),
            'a:2:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}'
        );

    });
    it('return value for nested `dict` with array', function () {

        assert.deepStrictEqual(
            pSerialize({"w1": "with1",
                // eslint-disable-next-line sort-keys
                "array": [
                    one,
                    two,
                    three,
                    four
                ],
                "dict": {
                    "a": "a1",
                    "b": "b2"
                }}),
            'a:3:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}s:4:"dict";a:2:{s:1:"a";s:2:"a1";s:1:"b";s:2:"b2";}}'
        );

    });

    it('return value for complex nested `dict` with array', function () {

        assert.deepStrictEqual(
            pSerialize({"w1": "with1",
                // eslint-disable-next-line sort-keys
                "array": [
                    one,
                    two,
                    three,
                    four
                ],
                "dict": {
                    "a": "a1",
                    "b": "b2",
                    "c": {
                        "c1": one,
                        "c2": two
                    }
                }}),
            'a:3:{s:2:"w1";s:5:"with1";s:5:"array";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}s:4:"dict";a:3:{s:1:"a";s:2:"a1";s:1:"b";s:2:"b2";s:1:"c";a:2:{s:2:"c1";i:1;s:2:"c2";i:2;}}}'
        );

    });

});


