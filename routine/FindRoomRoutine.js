"use strict";

const Routine = require("./Routine");

const createRoom = require("./room/createRoom");

const rooms = require("../registry/RoomRegistry");
const players = require("../registry/PlayerRegistry");

class FindRoomRoutine extends Routine {
    async run(request) {
        const player = players.searchByID(request.query.playerID);
        
        const room = rooms.findAvailable() || createRoom();
        player.enterRoom(room);

        return room.toJson();
    }
}

module.exports = FindRoomRoutine;