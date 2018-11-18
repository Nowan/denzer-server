"use static";

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function disconnectHandler() {
    const player = players.searchBySocketId(this._socket.id);
    players.erase(player);

    evict(player);

    console.log(rooms);
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