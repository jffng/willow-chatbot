const SECRET = require('./config').secret;
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const bunyan = require('bunyan')
const fs = require('fs');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const willowMessages = require('./messages');

const log = bunyan.createLogger({ name: 'willow' });
const app = express();
app.use( bodyParser.urlencoded( { extended: true } ) );

app.get('/', (req, res) => {
	res.sendStatus(200);
});

app.post('/sms', (req, res) => {
	const { Body, From } = req.body;
	log.info({ body: Body, from: From }, 'sms');
	const newHuman = messageContainsSecret( Body ) && isNewUser( From );
	const isUnsubscribe = messageContainsStop( Body ) && isExistingUser( From );
	const twiml = new MessagingResponse();
	if ( newHuman ){
		twiml.message(willowMessages.welcome);
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());
	} else if ( isUnsubscribe ){
		twiml.message(willowMessages.unsubscribe);
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());
	}
	else {
		res.end();
	}
});

app.get('/test/:body', ( req, res ) => {
	const Body = req.params.body;
	const From = '+12345678';
	const newHuman = messageContainsSecret( Body );
	const isUnsubscribe = messageContainsStop( Body );
	if ( newHuman ){
		res.send( willowMessages.welcome );
	} else if ( isUnsubscribe ){
		res.send( willowMessages.unsubscribe );
	}
	else {
		res.send( 'do nothing' );
	}
});

http.createServer(app).listen(1337, () => {
	console.log('Express server listening on port 1337');
});

function isExistingUser( number ){
	let users = JSON.parse(fs.readFileSync('./users.json'));

	if ( users.numbers.indexOf( number ) !== -1 ){
		return true;
	}

	return false;
}

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

function messageContainsStop( message ){
	if ( typeof(message) === 'string' ){
		return message.toLowerCase().includes('stop');
	}
}
