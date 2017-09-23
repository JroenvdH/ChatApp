var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getTime()
	};
};

console.log(generateMessage('me', 'text'));

module.exports = {generateMessage} 