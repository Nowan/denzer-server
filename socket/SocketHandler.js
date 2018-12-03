"use strict";

const handlers = {
	connect: require("./handler/connect"),
	disconnect: require("./handler/disconnect"),
	stateChanged: require("./handler/stateChanged")
}

class SocketHandler {
	constructor(socket) {
		handlers.connect.call(this, socket);
		this._registerHandlers();
	}

	static create(socket) {
		return new SocketHandler(socket);
	}

	_registerHandlers() {
		this._socket.on("disconnect", handlers.disconnect.bind(this));
		this._socket.on("state_changed", handlers.stateChanged.bind(this));
	}
}

module.exports = SocketHandler;