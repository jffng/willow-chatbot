const config = require('./config');
const accountSid = config.accountSid;
const authToken = config.authToken;
const phoneNumber = config.phoneNumber;
const client = require('twilio')(accountSid, authToken);

const users = require('./users.json').numbers;

if ( users.length ){ 
	users.forEach( user => {
		client.messages
		  .create({
			  body: "Hi there! Willow here 🌸and it’s time for a deep breath *cue DEEP BREATH*\n\nIf you an extra moment, find a comfortable seat, straighten your spine, and close your eyes. *now* you’re ready to indulge in a deep breath, or two, or three.",
			 from: phoneNumber,
			 to: user
		   })
		  .then(message => console.log(message.sid));
	} );
}
