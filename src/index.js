require('dotenv').config();
const http = require('http');
const Discord = require('discord.js');
const commands = require('./commands');
const sendGif = require('./services/gifService');
const bot = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
/*
 * Establish connection
 */
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

/*
  When a new message is received
  - if its a command (starting with exclamation)
    - handle command
  - if message content includes any word inside gifKeyword array
    - send related gif

 */
const gifKeywords = ['i wanna', "i'm", 'i am', 'i want', 'send'];

bot.on('message', message => {
  let { content } = message;
  content = content.toLowerCase();

  if (content.charAt(0) == '!') {
    commands(message, content);
  } else if (gifKeywords.some(keyword => content.includes(keyword)))
    sendGif(content, message);
});

/*
 * Login bot using token
 */
bot.login(BOT_TOKEN).catch(() => {
  console.log('-------------------------------------');
  console.log('Invalid discord bot token provided!!!');
  console.log('-------------------------------------');
  process.exit(1);
});

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("You're not supposed to be here dwag!");
    res.end();
  })
  .listen(process.env.PORT || 5000);
