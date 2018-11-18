"use strict";

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = require('ip').address();

const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/client/build/'));

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () => {
	console.log("Server running at " + IP_ADDRESS + ":" + PORT);
});

const SocketHandler = require('./socket/SocketHandler');
io.on('connection', SocketHandler.create);
