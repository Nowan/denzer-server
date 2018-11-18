"use static";

function connectHandler() {
    console.log('----------------------------------');
	console.log("player " + this._socket.id +  " connected");
}

module.exports = connectHandler;