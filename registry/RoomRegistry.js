"use strict";

const Registry = require("./Registry");

class RoomRegistry extends Registry {
    constructor() {
        super();
    }

    store(room) {
        this[room.id] = room;
    }

    erase(room) {
        delete this[room.id];
    }

    findAvailable() {
        for (const roomID in this) {
            const room = this[roomID];
            if (!room.isFull()) {
                return room;
            } 
        }
    }
}

module.exports = new RoomRegistry();