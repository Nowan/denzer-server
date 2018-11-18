"use strict";

class PlayerRegistry {
    constructor() {

    }

    store(player) {
        this[player.socketID] = player;
    }

    erase(player) {
        delete this[player.socketID];
    }

    getBySocketId(socketID) {
        return this[socketID];
    }
}

module.exports = new PlayerRegistry();