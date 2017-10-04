var socket =io(); //innitiates request from client to open web socket(and keep open)

function scrollToBottom () {
	//selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child')
	//heights
//.prop is a jQuery method. The args. are native to Javascript?
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop +newMessageHeight +lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function () {
	console.log('connected to server!');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
	//returns markup inside message-template script tags
	var template = jQuery('#message-template').html();
	var formattedTime = moment(message.createdAt).format('h:mm a');
	//Mustache.render takes template you want to render
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();

	// //moment takes createdAt as 0 benchmark
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text} `);
	// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var template = jQuery('#location-message-template').html();
	var formattedTime = moment(message.createdAt).format('h:mm a');
	//.render takes 2 args: template to render, data to render in template
	var html= Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});
	jQuery('#messages').append(html);

	scrollToBottom();
	
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location<a/>');
	// li.text(`${message.from}, ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]')

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
//3rd arg. is a callback with the acknowledgement
	}, function(data) {
		messageTextbox.val('')
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by browser!');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location');	
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	})
})





// socket.emit('createMessage', {
// 	from: 'Bill C.',
// 	text: 'i did have sex with that woman',
// });	
