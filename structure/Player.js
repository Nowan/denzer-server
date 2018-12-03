"use strict";

const uuid = require("uuid/v4");

class Player {
    constructor() {
        this.id = uuid();
        this.room = null;
        this.body = null;
    }

    enterRoom(room) {
        room.accommodate(this);
        this.room = room;
    }

    exitRoom() {
        this.room.evict(this);
        this.room = null;
    }

    hasRoom() {
        return !!this.room;
    }

    setPosition(x, y) {
        this.body.x = x;
        this.body.y = y;
    }

    setVelocity(x, y) {
        this.body.velocity.x = x;
        this.body.velocity.y = y;
    }

    toJson() {
        return [this.id, this.body.x, this.body.y, this.body.velocity.x, this.body.velocity.y];
    }
}

module.exports = Player;