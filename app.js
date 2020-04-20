const config = require('./config');
const accountSid = config.accountSid;
const authToken = config.authToken;
const phoneNumber = config.phoneNumber;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: phoneNumber,
     to: '+12223334444'
   })
  .then(message => console.log(message.sid));
