"use strict";

require("dotenv").config();
const http = require("http");
const Discord = require("discord.js");
const axios = require("axios");
const bot = new Discord.Client();

const BOT_TOKEN = process.env.BOT_TOKEN;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
/*
 * Establish connection
 */
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

/*
  When a new message is received
  - if its a command (starting with exclamation)
    - handle command
  - if message content includes 'i want ', 'i wanna' etc
    - send related gif

 */
const gifKeywords = ["i wanna", "i'm", "i am", "i want", "send"];

bot.on("message", (message) => {
  let { content } = message;
  content = content.toLowerCase();

  if (content.charAt(0) == "!") {
    const args = content.substring(1).split(" ");

    switch (args[0]) {
      case "weather":
        if (!args[1]) return message.reply("Ayyy! where's the place?");
        getWeather(message, args[1], args[2]);
        break;
      case "show":
        if (!args[1]) return message.reply("Ayyy! show what?");
        getUnsplashImage(message, args[1]);
        break;
      case "clear":
        if (!args[1]) return message.reply("Ayyy! give me numbers?");
        message.channel.bulkDelete(args[1]);
        break;
      default:
    }
  } else if (gifKeywords.some((keyword) => content.includes(keyword)))
    sendGif(content, message);
});

/*
 * Login bot using token
 */
bot.login(BOT_TOKEN).catch((err) => {
  console.log("-------------------------------------");
  console.log("Invalid discord bot token provided!!!");
  console.log("-------------------------------------");
  process.exit(1);
});

/*
 * Post image from unsplash
 */
function getUnsplashImage(message, query) {
  if (!UNSPLASH_API_KEY) return message.reply("Didn't get yo unspash api key");
  const URL = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${query}&per_page=50`;
  axios.get(URL).then(({ data }) => {
    const image = data.results[Math.floor(Math.random() * data.results.length)];
    const imageUrl = image.urls.small;
    const userUrl = image.user.links.html;
    const username = image.user.name;

    const embed = new Discord.MessageEmbed()
      .addField(
        query.toUpperCase(),
        `Photo by [${username}](${userUrl}?utm_source=discord-bot&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=discord-bot&utm_medium=referral)`
      )
      .setImage(imageUrl);
    message.channel.send(embed);
  });
}

/*
 * Get weather
 */
function getWeather(message, place, unit) {
  if (!OPEN_WEATHER_KEY)
    return message.reply("Didn't get yo openweather api key");

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OPEN_WEATHER_KEY}&units=imperial`;
  axios
    .get(URL)
    .then(({ data }) => {
      const weather = data.weather[0];
      const {
        name,
        main: { temp, humidity },
      } = data;

      const embed = new Discord.MessageEmbed()
        .setThumbnail("http://openweathermap.org/img/w/${weather.icon}.png")
        .addFields(
          { name: "Tempreture", value: temp + " ˚F" },
          { name: "Humidity", value: humidity + "%" }
        )
        .setFooter(
          weather.description,
          `http://openweathermap.org/img/w/${weather.icon}.png`
        );

      message.channel.send(embed);
    })
    .catch(() => message.reply("Ayyy didn't catch that name, you sure?"));
}

/*
 * Send gif (creates a gif query to be searched)
 */
function sendGif(content, message) {
  const intoArray = content.trim().split(" ");

  // query is the very last item in array
  let query = intoArray[intoArray.length - 1];

  postGif(query, message);
}

/*
 * Post gif to discord server
 */
function postGif(query, message) {
  if (!GIPHY_API_KEY) return message.reply("Didn't get yo giphy api key");
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}`
    )
    .then(({ data: { data } }) => {
      const gif = data[Math.floor(Math.random() * data.length)];
      const gifUrl = gif.images.downsized_medium.url;
      message.channel.send("", { files: [gifUrl] });
    })
    .catch((err) => {
      message.reply("Didn't get what you askin?");
    });
}

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("You're not supposed to be here dwag!");
    res.end();
  })
  .listen(process.env.PORT || 5000);
