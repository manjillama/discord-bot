const app = require('./app');
require('./bot.js');

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started...');
});
