"use strict";

const handlers = {
	connect: require("./handler/connect"),
	disconnect: require("./handler/disconnect"),
	findRoom: require("./handler/findRoom")
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
	}
}

module.exports = SocketHandler;