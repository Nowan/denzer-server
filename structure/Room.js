"use strict";

const uuid = require("uuid/v4");
const Map = require("../map/Map.js");

class Room {
    constructor() {
        this.id = uuid();
        this.players = [];
        this.map = new Map();
        
        this._capacity = 8;
    }

    isFull() {
        return this.players.length >= this._capacity;
    }

    isEmpty() {
        return this.players.length <= 0;
    }

    accommodate(player) {
        this.players.push(player);
    }

    evict(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }
}

module.exports = Room;