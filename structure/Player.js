"use strict";

class Player {
    constructor(socketID) {
        this.socketID = socketID;
        this.room = null;
        
        this.x = 0;
        this.y = 0;
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

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    toJson() {
        return {
            id: this.socketID,
            position: {
                x: this.x, 
                y: this.y
            }
        };
    }
}

module.exports = Player;