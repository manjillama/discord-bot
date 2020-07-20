const commands = require('./commands');
const sendGif = require('./services/gifService');
const { bot, connectBot } = require('./services/botService');

/*
 * Establish connection
 */
connectBot();

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
