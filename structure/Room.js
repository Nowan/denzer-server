"use strict";

const uuid = require("uuid/v4");
const Map = require("../map/Map");
const PhysicsSandbox = require("../physics/PhysicsSandbox");

class Room {
    constructor() {
        this.id = uuid();
        this.players = [];
        this.map = new Map();
        this.physics = new PhysicsSandbox();

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
        player.body = this.physics.addBody(player);
    }

    evict(player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    toJson() {
        return {
            id: this.id,
            map: this.map,
            players: this.players.map((player) => { return player.toJson(); })
        }
    }
}

module.exports = Room;