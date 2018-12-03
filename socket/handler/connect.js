"use strict";

const Player = require('../../structure/Player');

const players = require('../../registry/PlayerRegistry');

function connectHandler(socket) {
    this._player = players.searchByID(socket.handshake.query.playerID);
    this._socket = socket;

    this._socket.broadcast.emit("player_join", this._player.toJson())
    console.log("Player " + this._player.id + " established socket connection");
}

module.exports = connectHandler;