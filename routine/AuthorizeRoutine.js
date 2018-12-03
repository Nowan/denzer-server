"use strict";

const Routine = require("./Routine");
const Player = require('../structure/Player');

const players = require('../registry/PlayerRegistry');

class AuthorizeRoutine extends Routine {
    async run(request) {
        const player = new Player();
        players.store(player);
        return { id: player.id };
    }
}

module.exports = AuthorizeRoutine;