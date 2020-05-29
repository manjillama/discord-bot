const getWeather = require('../services/weatherService');
const getUnsplashImage = require('../services/unsplashImageService');

module.exports = async function (message, content) {
  const args = content.substring(1).split(' ');

  switch (args[0]) {
    case 'weather': {
      if (!args[1]) return message.reply("Ayyy! where's the place?");
      try {
        const embed = await getWeather(
          content.substring(1).split('weather ')[1]
        );
        message.channel.send(embed);
      } catch (error) {
        message.reply(error.message);
      }
      break;
    }
    case 'show': {
      if (!args[1]) return message.reply('Ayyy! show what?');
      try {
        const embed = await getUnsplashImage(
          content.substring(1).split('show ')[1]
        );
        message.channel.send(embed);
      } catch (error) {
        message.reply(error.message);
      }
      break;
    }

    case 'clear':
      if (!args[1]) return message.reply('Ayyy! give me numbers?');
      message.channel.bulkDelete(args[1]);
      break;
    default:
  }
};
