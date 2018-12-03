"use strict";

const handlers = {
	connect: require("./handler/connect"),
	disconnect: require("./handler/disconnect"),
	findRoom: require("./handler/findRoom"),
	stateChanged: require("./handler/stateChanged")
}

class SocketHandler {
	constructor(socket) {
		this._socket = socket;

		this._registerHandlers();
		
		handlers.connect.call(this);
	}

	static create(socket) {
		return new SocketHandler(socket);
	}

	_registerHandlers() {
		this._socket.on("disconnect", handlers.disconnect.bind(this));
		this._socket.on("find_room", handlers.findRoom.bind(this));
		this._socket.on("state_changed", handlers.stateChanged.bind(this));
	}
}

module.exports = SocketHandler;