var socket =io(); //innitiates request from client to open web socket(and keep open)
socket.on('connect', function () {
	console.log('connected to server!');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
	console.log('new message: ', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
//3rd arg. is a callback with the acknowledgement
	}, function(data) {

	});
});



// socket.emit('createMessage', {
// 	from: 'Bill C.',
// 	text: 'i did have sex with that woman',
// });	
