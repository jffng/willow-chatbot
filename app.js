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
			  body: "Hello sweet human! Willow here, reminding you to breathe with an invitation you stretch your body.\n\nThe following stretch can be done standing or seated. Go ahead and stand up if you’re able to.\n\nTake a deep inhale while raising your arms slowly over your head. Exhale as you slowly lower your arms.\nRepeat 3 times. 🙆‍♀️\n\nBefore you go back to sitting why not give your tush a wiggle and your legs a shake🦵🍑",
			 from: phoneNumber,
			 to: user
		   })
		  .then(message => console.log(message.sid));
	} );
}
