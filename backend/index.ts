const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(express.json());
app.use(cors());

interface Room {
	name: string;
	is_private: boolean;
	password: string;
}

const rooms: Room[] = [
	{
		name: 'coolkids',
		is_private: true,
		password: '123',
	},
];

app.get('/', (req, res) => {
	res.send('welcome');
});

app.post('/create', (req, res) => {
	const new_room = req.body;

	const old_room = rooms.find((room) => room.name == new_room.name);
	if (old_room) {
		res.status(400).send('room already exists');
		return;
	}
	rooms.push(new_room);
	res.send('room successfully created');

	console.log('\n made new room');
	console.log(rooms);
	return;
});
app.post('/validate', (req, res) => {
	const new_user = req.body;
	const room = rooms.find((room) => room.name == new_user.room.name);
	if (!room) {
		res.status(400).send('room not found');
		return;
	}
	if (room.password != new_user.room.password) {
		if (new_user.room.password.length >= 1) res.status(400).send('wrong password');
		else res.status(400).send('password required');
		return;
	}

	res.send(`joined: ${room.name}`);
	return;
});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('join', ({ name, password }) => {
		const room = rooms.find((room) => room.name == name);
		if ((room && room.password == password) || (room && !room.is_private)) {
			socket.join(name);
			console.log(`User joined room: ${name}`);
			socket.emit('join success');
		} else {
			console.log(
				`User failed to joined: ${name} using password ${password}`
			);
			socket.emit('join fail');
		}
	});

	socket.on('message', ({ room, message }) => {
		console.log(`message sent in ${room}: ${message}`);
		io.to(room).emit('message', message);
	});

	socket.on('leave', (room) => {
		socket.leave(room);
		console.log(`User left room: ${room}`);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
