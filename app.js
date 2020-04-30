const config = require('./config');
const accountSid = config.accountSid;
const authToken = config.authToken;
const phoneNumber = config.phoneNumber;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');

const users = require('./users.json').numbers;

axios.get( config.api )
	.then( res => {
		const { messages } = res.data;
		const theDate = new Date();
		let exercise = '';
		if ( messages && messages.length ) {
			exercise = messages.filter( m => {
				const messageDate = new Date( m.date );
				return messageDate.toDateString() === theDate.toDateString();
			});

			if ( exercise.length ){
				sendMessage( exercise[0].message );
			}
		};
	})
	.catch( err => {
		console.log( err );
	});

function sendMessage( exercise ) {
	if ( users.length ){
		users.forEach( user => {
			client.messages
			  .create({
					body: exercise,
					from: phoneNumber,
					to: user
			   })
			  .then(message => console.log(message.sid));
		} );
	}
}
