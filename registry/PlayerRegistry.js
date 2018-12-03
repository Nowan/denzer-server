"use strict";

const Registry = require("./Registry");

class PlayerRegistry extends Registry {
    constructor() {
        super();
    }

    store(player) {
        this[player.id] = player;
    }

    erase(player) {
        delete this[player.id];
    }

    searchByID(playerID) {
        return this[playerID];
    }
}

module.exports = new PlayerRegistry();