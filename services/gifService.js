const axios = require('axios');

/*
 * Send gif (creates a gif query to be searched)
 */
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

module.exports = async function sendGif(content, message) {
  const intoArray = content.trim().split(' ');

  // query is the very last item in array
  const query = intoArray[intoArray.length - 1];

  try {
    const gifUrl = await postGif(query);
    message.channel.send('', { files: [gifUrl] });
  } catch (error) {
    message.reply(error.message);
  }
};

/** 
 * Post gif to discord server
 @param {string} query - search query for gif.
 @param {object} message - Message object from discord on 'message' callback
 @return {void}
 */
async function postGif(query) {
  if (!GIPHY_API_KEY) throw new Error("Didn't get yo giphy api key");
  return await axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}`
    )
    .then(({ data: { data } }) => {
      const gif = data[Math.floor(Math.random() * data.length)];
      const gifUrl = gif.images.downsized_medium.url;
      return gifUrl;
    })
    .catch(() => {
      throw new Error("Didn't get what you askin?");
    });
}
