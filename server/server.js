const path = require('path');
const http = require('http');
//avoids going into server folder and than back up 1 folder to go to public
const publicPath = path.join(__dirname, '../public'); 
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

//emit to everybody except particular user
	socket.broadcast.emit('newMessage', 
	 generateMessage('Admin', 'A new user joined the chat')); 

//emit to everyone.
	socket.on('createMessage', (message, callback) => {
		console.log('new Message created!',message);
		io.emit('newMessage', generateMessage(message.from, message.text));
//callback acknowledges incoming req. and sends confirmation back. This fires the callback
//function on the other side (client)
		callback(); 


// //broadcast is an ob with own emit method. It emits to everybody except sender. 
// 		socket.broadcast.emit('newMessage', {
// 			from: message.from,
// 			text: message.text,
// 			createdAt: new Date().getTime()
// 		})
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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

