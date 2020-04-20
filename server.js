const SECRET = require('./config').secret;
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan')
const fs = require('fs');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const log = bunyan.createLogger({ name: 'willow' });
const app = express();
app.use( bodyParser.urlencoded( { extended: true } ) );

app.post('/sms', (req, res) => {
	const { Body, From } = req.body;
	log.info({ body: Body, from: From }, 'sms');
	const newHuman = messageContainsSecret( Body ) && isNewUser( From );
	if ( newHuman ){
		const twiml = new MessagingResponse();

		twiml.message("Hello! Welcome to Willow The Mindfulness Bot’s daily mini meditations. I’m here to guide you through daily breathing exercises as a small but not insignificant way to bring a moment of calm into your day otherwise presumably filled with high anxiety during this global pandemic.\n\nReply with the secret code to enroll in these daily offerings. Reply \"PLEASE STOP\" if you enjoy your high levels of anxiety and don’t appreciate daily reminders to breathe.");

		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());
	}
	else res.end();
});

http.createServer(app).listen(1337, () => {
	console.log('Express server listening on port 1337');
});

function isNewUser( number ){
	let users = JSON.parse(fs.readFileSync('./users.json'));

	if ( users.numbers.filter( n => n === number ).length === 0 ){
		users.numbers.push( number );
		fs.writeFileSync( 'users.json', JSON.stringify( users ));
		return true;
	}

	return false;
}

function messageContainsSecret( message ){
	if ( typeof(message) === 'string' ){
		return message.toLowerCase().includes( SECRET );
	}
	return false;
}
