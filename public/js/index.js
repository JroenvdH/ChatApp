var socket =io(); //innitiates request from client to open web socket(and keep open)
socket.on('connect', function () {
	console.log('connected to server!');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
	console.log('new message:', message);
});

// socket.emit('createMessage', {
// 	from: 'Bill C.',
// 	text: 'i did have sex with that woman',
// });	
