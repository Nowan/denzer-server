"use static";

function disconnectHandler() {
    console.log('----------------------------------');
	console.log("player " + this._socket.id +  " disconnected");
}

module.exports = disconnectHandler;