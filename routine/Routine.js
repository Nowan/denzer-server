"use strict";

class Routine {
    constructor() {
        this.endpoint = "/";
    }

    async run() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}

module.exports = Routine;