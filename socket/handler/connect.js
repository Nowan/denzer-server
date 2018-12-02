"use strict";

const Player = require('../../structure/Player');

const players = require('../../registry/PlayerRegistry');

function connectHandler() {
    const query = this._socket.handshake.query;
    
    const player = new Player(this._socket.id, query.timeProbe);
    players.store(player);
    
    this._socket.emit("connection established");
}

module.exports = connectHandler;