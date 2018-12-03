"use strict";

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function disconnectHandler() {
    const player = this._player;
    
    if (player.hasRoom()) {
        this._socket.leave(player.room.id);
        this._socket.to(player.room.id).emit("player exit", {player: player.toJson()});
    }

    evict(player);
    players.erase(player);

    this._player = null;
    this._socket = null;
}

function evict(player) {
    if (player.hasRoom()) {
        const room = player.room;
        player.exitRoom();

        if (room.isEmpty()) {
            rooms.erase(room);
        }
    }
}

module.exports = disconnectHandler;