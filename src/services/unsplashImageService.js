const axios = require('axios');
const Discord = require('discord.js');

/*
 * Post image from unsplash
 */
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

module.exports = async function getUnsplashImage(query) {
  if (!UNSPLASH_API_KEY) throw new Error("Didn't get yo unsplash api key");

  const URL = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${query}&per_page=50`;
  return await axios
    .get(URL)
    .then(({ data }) => {
      const image =
        data.results[Math.floor(Math.random() * data.results.length)];
      const imageUrl = image.urls.small;
      const userUrl = image.user.links.html;
      const username = image.user.name;

      const embed = new Discord.MessageEmbed()
        .addField(
          query.toUpperCase(),
          `Photo by [${username}](${userUrl}?utm_source=discord-bot&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=discord-bot&utm_medium=referral)`
        )
        .setImage(imageUrl);
      return embed;
    })
    .catch(() => {
      throw new Error("Didn't get yo query");
    });
};
