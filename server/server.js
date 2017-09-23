const path = require('path');
const http = require('http');
//avoids going into server folder and than back up 1 folder to go to public
const publicPath = path.join(__dirname, '../public'); 
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server)

//showing express where to find the files
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected!');

	// socket.emit('newEmail', {
	// 	from: 'mike@example.com', 
	// 	text: 'test test',
	// 	createAt: 123
	// }); //we're not listening here thus no callback. I create an obj. to emit

//emit to particular user (newly connected user)
	socket.emit('newMessage', {
		from: 'Admin', 
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()
	});

//emit to everybody except particular user
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'A new user joined the chat',
		createdAt: new Date().getTime()
	})

//emit to everyone.
	socket.on('createMessage', (message) => {
		console.log('new Message created!',message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})

// //broadcast is an ob with own emit method. It emits to everybody except sender. 
// 		socket.broadcast.emit('newMessage', {
// 			from: message.from,
// 			text: message.text,
// 			createdAt: new Date().getTime()
// 		})
	});

	socket.on('disconnect',() => {
		console.log('client disconnected');
	});

	// socket.emit('newMessage',{
	// 	from: 'John F. K.',
	// 	text: 'Ich bin ein berliner',
	// 	createdAt: 31432
	// });

})

app.get('/', (req, res) => {
	res.render('index.html');
});

server.listen(port, ()=> {
	console.log(`server up on port ${port}`);
});


module.exports = {app}

