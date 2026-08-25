import {encodeURI} from "../../dist/esm/index.mjs";
import assert from 'assert';


describe('ESM: encodeURI method', function () {

    it('return value string with encoded characters', function () {

        assert.deepStrictEqual(encodeURI("https://example.com/hello world?x=1&y=two three"), "https%3A%2F%2Fexample.com%2Fhello%20world%3Fx%3D1%26y%3Dtwo%20three");

    });

    it('return value string with special characters encoded', function () {

        assert.deepStrictEqual(encodeURI("a!b*c(d)e'f\"g"), "a%21b%2Ac%28d%29e%27f%22g");

    });

    it('return value string with mixed valid and invalid sequences', function () {

        assert.deepStrictEqual(encodeURI("valid string%ZZinvalid"), "valid%20string%25ZZinvalid");

    });

    it('return value string with encoded characters and special characters', function () {

        assert.deepStrictEqual(encodeURI("https://example.com/hello world?x=1&y=two three&a!b*c(d)e'f\"g"), "https%3A%2F%2Fexample.com%2Fhello%20world%3Fx%3D1%26y%3Dtwo%20three%26a%21b%2Ac%28d%29e%27f%22g");

    });

});


