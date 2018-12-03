"use strict";

class Player {
    constructor(socketID, timeProbe) {
        this.socketID = socketID;
        this.room = null;
        this.body = null;
        
        this._timeDifference = Date.now() - timeProbe;
        
        this.x = 0;
        this.y = 0;
        this.velocity = {x: 0, y: 0};
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

    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    toJson() {
        return [this.socketID, this.body.x, this.body.y, this.body.velocity.x, this.body.velocity.y];
        /*
        return {
            id: this.socketID,
            position: {
                x: this.body.x,
                y: this.body.y
            },
            velocity: {x: this.velocity.x, y: this.velocity.y}
        };*/
    }
}

module.exports = Player;