"use static";

const Player = require('../../structure/Player');
const Room = require('../../structure/Room');

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function connectHandler() {
    const player = new Player(this._socket.id);
    players.store(player);
    
    accomodate(player);

    this._socket.to(player.room.id).emit("player connect", {playerId: player.socketID});
    this._socket.join(player.room.id);

    console.log(rooms);
}

function accomodate(player) {
    let room = rooms.findAvailable();
    if (!room) {
        room = new Room();
        rooms.store(room);
    }
    player.enterRoom(room);
}

module.exports = connectHandler;