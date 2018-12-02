"use strict";

const SocketHandler = require('./socket/SocketHandler');

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = require('ip').address();

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(__dirname + '/client/build/'));

server.listen(PORT, () => {
	console.log("Server running at " + IP_ADDRESS + ":" + PORT);
});

io.on('connection', SocketHandler.create);
