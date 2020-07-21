const Discord = require('discord.js');
const bot = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;

/**
 * @return {Promise} Promise object represents either success or failed response
 */
exports.connectBot = function () {
  return bot
    .login(BOT_TOKEN)
    .then(res => res)
    .catch(err => {
      return err.message;
    });
};

exports.bot = bot;
