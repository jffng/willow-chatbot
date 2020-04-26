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
			  body: "Hi there! Willow here 🌿 It’s time for a deep breath.\n\nLet's indulge in some extra delicious breathing exercises today to boost your nervous system with TLC overload.\n\nFor this calming breath, your exhalations will be longer than your inhalations (also called the 4-7-8 technique).\n\nTo begin, find a comfortable seated position. Gently close your eyes, if that feels good to you (but maybe read this first before closing your eyes).\n\n1. Exhale completely through your mouth with a 🌬whooshing sound emptying yourself of stale air hiding in the nooks and crannies of your body.\n2. Close your lips, inhaling through your nose to a count of 4.\n3. Hold your breath for 7 counts.\n4. Exhale completely through your mouth, making another whooshing sound to a count of 8.\n\n*This is one breathing cycle. Repeat 3 more times for a total of 4 cycles.\n\nFeel free to experiment with the counts to find a rhythm that works best for you but maintain a ratio of 4:7:8",
			 from: phoneNumber,
			 to: user
		   })
		  .then(message => console.log(message.sid));
	} );
}
