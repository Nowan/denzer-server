"use strict";

const PhysicsBody = require("./PhysicsBody");

class PhysicsSandbox {
    constructor() {
        this._bodies = [];
        this._stateUpdateTime = 0;
    }

    addBody() {
        const body = new PhysicsBody();
        this._bodies.push(body);
        return body;
    }

    updateState(time) {
        const timeSinceLastStateUpdate = time - this._stateUpdateTime;
        const deltaTime = PhysicsSandbox.DELTA_TIME;
        const framesCount = timeSinceLastStateUpdate / deltaTime;
        /*
        for (let i = 0; i < framesCount; i++) {
            this._bodies.forEach((body) => {
                body.x += body.velocity.x * deltaTime;
                body.y += body.velocity.y * deltaTime;
            }, this);
        }*/

        this._stateUpdateTime = time;
    }
}

PhysicsSandbox.DELTA_TIME = 1 / 120;

module.exports = PhysicsSandbox;