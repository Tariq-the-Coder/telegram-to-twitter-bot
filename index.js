require('dotenv').config()
const express = require('express')
const TelegramBot = require('node-telegram-bot-api');
var Twit = require('twit')
const app = express();
const http = require('http').createServer(app)
const port = process.env.PORT || 8000

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});

app.use(express.static(__dirname + '/public'))

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token:process.env.ACCESS_TOKEN_KEY,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET,
})

// timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
// strictSSL:            true,     // optional - requires SSL certificates to be valid.

// get random # $
function makeid(length) {
  var result           = '';
  var characters       = '#$';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


// console.log(makeid(5));
bot.on('message', (msg) => {
  var Newtext = msg.text.replace("#", `${(makeid(1))}`);
  T.post('statuses/update', { status: Newtext }, function(err, data, response) {
    console.log(data)
  })
  console.log(msg.text)
});


 // LISTEN THE SERVER
http.listen(port,()=>{
  console.log(`The application started successfully on port ${port}`);
})