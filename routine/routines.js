"use strict";

const AuthorizeRoutine = require("./AuthorizeRoutine");
const FindRoomRoutine = require("./FindRoomRoutine");

module.exports = {
    [Symbol.iterator]() {
        let _index = 0;
        
        const _values = {
            "/authorize": new AuthorizeRoutine(),
            "/findRoom": new FindRoomRoutine()
        }

        const _valuesArray = [];

        for (const endpoint in _values) {
            const routine = _values[endpoint];
            routine.endpoint = endpoint;
            _valuesArray.push(routine);
        }

        return {
            next() {
                const value = _valuesArray[_index];
                const done = !(_index in _valuesArray);
                _index++;
                return { value, done };
            }
        }
    }
};