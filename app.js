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
			 body: "Hello today! Willow here, with a breathing exercise for You.\n\nFirst, gather yourself into a comfortable position with your spine as straight as can be🧘‍♂️\nClose your eyes and begin to relax your face  💆‍♀️\nNotice any tension buildup in your forehead, your jaw, your neck and 🌬let 🌬it 🌬go 🌬\n\nOn your next exhale, breathe out opening your mouth wide with your tongue sticking out 👅 It should sound like a fire breathing snake or a whooshing ahh sound.\nStale air emptied out? 🆒\nClose your mouth and inhale through your nose.\nPause for a moment or two at the top of your inhale. Embrace your inner fire-breathing creature and release your breath exhaling through your mouth open wide, tongue out.\n\nRepeat 3 times 🔥🐍",
			 from: phoneNumber,
			 to: user
		   })
		  .then(message => console.log(message.sid));
	} );
}
