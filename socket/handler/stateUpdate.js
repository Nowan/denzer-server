"use strict";

const players = require('../../registry/PlayerRegistry');

function stateUpdateHandler(data) {
    const player = players.searchBySocketId(this._socket.id);
    
    player.setPosition(data.position.x, data.position.y);
    player.setVelocity(data.velocity.x, data.velocity.y);

    this._socket.to(player.room.id).emit("state_received", {player: player.toJson()});
}

module.exports = stateUpdateHandler;