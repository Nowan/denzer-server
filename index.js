"use strict";

const SocketHandler = require('./socket/SocketHandler');

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = require('ip').address();

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const routines = require('./routine/routines');

app.use('/', express.static(__dirname + '/client/build/'));

for (const routine of routines) {
	app.get(routine.endpoint, function (request, response) {
		routine.run().then(
			(responseData) => {
				response.send(responseData);
			}, 
			(errorMessage) => {
				response.send(errorMessage);
			})
	});
}

server.listen(PORT, () => {
	console.log("Server running at " + IP_ADDRESS + ":" + PORT);
});

io.on('connection', SocketHandler.create);
