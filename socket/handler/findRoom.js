"use static";

const Room = require('../../structure/Room');

const players = require('../../registry/PlayerRegistry');
const rooms = require('../../registry/RoomRegistry');

function findRoomHandler() {
    const player = players.searchBySocketId(this._socket.id);
    
    accomodate(player);
    establishPosition(player);

    const room = player.room;

    this._socket.to(room.id).emit("player enter", {player: player.toJson()});
    this._socket.join(room.id);

    this._socket.emit("room found", room.toJson());
}

function accomodate(player) {
    let room = rooms.findAvailable();
    if (!room) {
        room = new Room();
        rooms.store(room);
    }
    player.enterRoom(room);
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