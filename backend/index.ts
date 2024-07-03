const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.get('/', (req, res) => {
	req.text('welcome');
});

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('join', (channel: any) => {
		console.log('user joined', channel);
		socket.join(channel);
	});

	socket.on('chat', ({ room, message }) => {
		console.log('message sent in: ', room, message);
		socket.in(room).emit('chat', message);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
