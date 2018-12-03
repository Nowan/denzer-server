"use strict";

function stateChangedHandler(data) {
    const player = this._player;
    
    player.setPosition(data.position.x, data.position.y);
    player.setVelocity(data.velocity.x, data.velocity.y);

    this._socket.broadcast.emit("state_received", player.toJson());
}

module.exports = stateChangedHandler;