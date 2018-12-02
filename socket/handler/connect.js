"use strict";

const Player = require('../../structure/Player');

const players = require('../../registry/PlayerRegistry');

function connectHandler() {
    const player = new Player(this._socket.id);
    players.store(player);
    
    this._socket.emit("connection established");
}

module.exports = connectHandler;