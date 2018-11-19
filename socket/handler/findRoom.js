"use static";

const Room = require('../../structure/Room');

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function findRoomHandler() {
    const player = players.searchBySocketId(this._socket.id);
    
    accomodate(player);

    this._socket.to(player.room.id).emit("player enter", {playerId: player.socketID});
    this._socket.join(player.room.id);

    this._socket.emit("room found", {map: player.room.map});
}

function accomodate(player) {
    let room = rooms.findAvailable();
    if (!room) {
        room = new Room();
        rooms.store(room);
    }
    player.enterRoom(room);
}

module.exports = findRoomHandler;