"use strict";

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function disconnectHandler() {
    const player = players.searchBySocketId(this._socket.id);
    
    if (player.hasRoom()) {
        this._socket.leave(player.room.id);
        this._socket.to(player.room.id).emit("player exit", {player: player.toJson()});
    }

    evict(player);
    players.erase(player);
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