"use strict";

class SocketHandler {
	constructor(socket) {
		this.socketID = socket.id;
		
		console.log('----------------------------------');
		console.log('player ' + this.socketID + ' connected!');

		socket.on("disconnect", this._onDisconnect.bind(this));
	}

	static create(socket) {
		return new SocketHandler(socket);
	}

	_onDisconnect() {
		console.log('----------------------------------');
		console.log("player " + this.socketID +  " disconnected");
	}
}

module.exports = SocketHandler;