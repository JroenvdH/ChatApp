var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate Message', () => {

	it('should generate correct message obj', () => {
		var message = {
			from: 'Admin',
			text: 'Welcome to the chat app'
		}

		var genMes = generateMessage(message.from, message.text)

		expect(genMes).toInclude({
			from: 'Admin',
			text: 'Welcome to the chat app'
		});
		expect(genMes.createdAt).toBeA('number');
	});
}); 

describe('generate location message', () => {
	it('should generate correct location obj.', () => {
		var long = 1;
		var lat = 1;
		var url = 'https://www.google.nl/maps?q=1,1';

		var genLocMes= generateLocationMessage('Admin', lat, long);

		expect(genLocMes.url).toBe(url);
		expect(genLocMes.createdAt).toBeA('number');
	});
});