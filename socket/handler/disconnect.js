"use static";

const players = require('../../registry/PlayerRegistry');

function disconnectHandler() {
    players.erase(players.getBySocketId(this._socket.id));
    console.log(players);
}

module.exports = disconnectHandler;