"use strict";

const Room = require('../../../structure/Room');
const rooms = require('../../../registry/RoomRegistry');

function createRoom() {
    const room = new Room();
    
    /*
    const SYNC_FREQUENCY = 500;
    let elapsedTime = 0;
    
    room.syncInterval = setInterval(() => {
        console.log(room.players.length);
        elapsedTime += SYNC_FREQUENCY;
        room.physics.updateState(elapsedTime);
        this._socket.to(room.id).emit("state_update", composePlayersData(room));
    }, SYNC_FREQUENCY);
    */
   
    rooms.store(room);
    return room;
}

function composePlayersData(room) {
    const playersData = {};
    room.players.forEach((player) => {
        playersData[player.socketID] = player.toJson()
    });
    return playersData;
}

module.exports = createRoom;