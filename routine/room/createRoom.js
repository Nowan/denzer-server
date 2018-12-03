"use strict";

const Room = require("../../structure/Room");
const SocketHandler = require("../../socket/SocketHandler");

const globals = require("../../globals");
const rooms = require("../../registry/RoomRegistry");

function createRoom() {
    const room = new Room();
    
    room.channel = globals.io.of("/" + room.id);
    room.channel.on("connection", SocketHandler.create);
    
    const SYNC_FREQUENCY = 500;
    let elapsedTime = 0;
    
    room.syncInterval = setInterval(() => {
        elapsedTime += SYNC_FREQUENCY;
        room.physics.updateState(elapsedTime);
        room.channel.emit("state_update", composePlayersData(room));
    }, SYNC_FREQUENCY);
  
    rooms.store(room);
    return room;
}

function composePlayersData(room) {
    const playersData = {};
    room.players.forEach((player) => {
        playersData[player.id] = player.toJson()
    });
    return playersData;
}

module.exports = createRoom;