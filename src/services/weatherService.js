const axios = require('axios');
const Discord = require('discord.js');

const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;

/*
 * Get weather
 */
module.exports = async function (place) {
  if (!OPEN_WEATHER_KEY) throw new Error("Didn't get yo openweather api key");

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OPEN_WEATHER_KEY}&units=imperial`;
  return await axios
    .get(URL)
    .then(({ data }) => {
      const weather = data.weather[0];
      const {
        main: { temp, humidity },
      } = data;

      const embed = new Discord.MessageEmbed()
        .setThumbnail('http://openweathermap.org/img/w/${weather.icon}.png')
        .addFields(
          { name: 'Tempreture', value: temp + ' ˚F' },
          { name: 'Humidity', value: humidity + '%' }
        )
        .setFooter(
          weather.description,
          `http://openweathermap.org/img/w/${weather.icon}.png`
        );
      return embed;
    })
    .catch(() => {
      throw new Error("Ayyy didn't catch that name, you sure?");
    });
};
