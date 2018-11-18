"use static";

const Player = require('../../structure/Player');
const players = require('../../registry/PlayerRegistry');

function connectHandler() {
    const player = new Player(this._socket.id);
    players.store(player);

    console.log(players);
}

module.exports = connectHandler;