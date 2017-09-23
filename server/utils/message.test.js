var expect = require('expect');

var {generateMessage} = require('./message');

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