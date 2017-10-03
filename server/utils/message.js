var moment = require('moment');

var generateMessage = (from, text) => {
	var date = moment();
	return {
		from,
		text,
		createdAt: date.valueOf(),
		time: date.format('h:mm:ss a')
	};
};

var generateLocationMessage = (from,latitude, longitude) => {
	var date = moment();
	return {
		from,
		url: `https://www.google.nl/maps?q=${latitude},${longitude}`,
		createdAt: date.valueOf(),
		time: date.format('h:mm:ss a')
	};
};



module.exports = {generateMessage, generateLocationMessage}; 