"use strict";

const Registry = require("./Registry");

class PlayerRegistry extends Registry {
    constructor() {
        super();
    }

    store(player) {
        this[player.socketID] = player;
    }

    erase(player) {
        delete this[player.socketID];
    }

    searchBySocketId(socketID) {
        return this[socketID];
    }
}

module.exports = new PlayerRegistry();