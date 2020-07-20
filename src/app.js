require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send("You can't be here dwag!");
});

module.exports = app;
