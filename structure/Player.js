"use strict";

class Player {
    constructor(socketID) {
        this.socketID = socketID;
        this.room = null;
    }

    enterRoom(room) {
        room.accommodate(this);
        this.room = room;
    }

    exitRoom() {
        this.room.evict(this);
        this.room = null;
    }

    hasRoom() {
        return !!this.room;
    }
}

module.exports = Player;