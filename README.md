<div align="center">

> A simple discord bot for your discord server

[![](https://github.com/manjillama/discord-bot/workflows/CI/badge.svg)](https://github.com/manjillama/discord-bot/actions)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)



</div>

## Getting Started

```bash
$ npm install
```

```bash
$ npm run dev
```

## Formatting

Check for formatting errors.

```bash
$ npm run format:check
```

Fix formatting errors.

```bash
$ npm run format
```

## Set environment variables

You can create a .env file in your root project folder and add theses configurations. Be sure to modify the values beforehand. **_Never commit .env file to github._**.

```bash
# Get your discord bot token from here https://discord.com/developers/applications
BOT_TOKEN =
# Get giphy developer api key from here https://developers.giphy.com/
GIPHY_API_KEY =
# get unsplash api key from here https://unsplash.com/developers
UNSPLASH_API_KEY =
# get openweather api key from here https://openweathermap.org/api
OPEN_WEATHER_KEY =

```

## Features

| Commands              | Actions                                       |
| --------------------- | --------------------------------------------- |
| !weather _place_name_ | Shows weather for the given place             |
| !show _keyword_       | Shows image of the provided keyword, if found |
| !clear _n_            | Deletes n number of last message              |
| send _keyword_        | Sends gif                                     |
