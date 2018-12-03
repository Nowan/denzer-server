"use strict";

const createRoom = require('./room/createRoom');
const rooms = require('../../registry/RoomRegistry');

function findRoomHandler() {
    const player = this._player;
    
    const room = rooms.findAvailable() || createRoom.call(this);
    player.enterRoom(room);

    //establishPosition(player);

    this._socket.to(room.id).emit("player enter", {player: player.toJson()});
    this._socket.join(room.id);

    this._socket.emit("room found", room.toJson());
}

function establishPosition(player) {
    const room = player.room;
    const otherPlayers = room.players.filter((playerInRoom) => { return playerInRoom !== player; });
    const spawnPoint = getMostDesertedSpawnPoint(room.map.spawnPoints, otherPlayers);
    player.setPosition(spawnPoint.x, spawnPoint.y);
}

function getMostDesertedSpawnPoint(spawnPoints, players) {
    const desertionFactors = spawnPoints.map((spawnPoint) => {
        return players.reduce((desertionFactor, player) => {
            return desertionFactor + Math.sqrt(Math.pow(player.x - spawnPoint.x, 2) + Math.pow(player.y - spawnPoint.y, 2));
        }, 0);
    });
    return spawnPoints[indexOfMax(desertionFactors)];
}

function indexOfMax(array) {
    return array.reduce((maxIndex, value, index, array) => {
        return array[maxIndex] > value ? maxIndex : index;
    }, 0);
}

module.exports = findRoomHandler;