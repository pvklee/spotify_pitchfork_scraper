# Spotify Pitchfork Scraper

![screenshot](https://raw.githubusercontent.com/pvklee/spotify_pitchfork_scraper/master/readme_images/Screen%20Shot%202019-06-13%20at%2010.50.47%20AM.png)

Scrapes album reviews from Pitchfork.com for your Spotify recommendations, and displays reviews while song is playing in an online player.

[Link to live site](https://spotify-pitchfork-scraper.herokuapp.com/) 

## Technologies used

I used Express for the backend, including web scraping and connecting to the Spotify Web API.

For the frontend, I used React for the single-page application UI and Redux for state management.

## Highlighted features

* Developed custom web scraping pipeline with Axios and the Cheerio library.
* Devised string manipulation paradigm and implemented pre-existing string-similarity library to ensure accurate web scraping results.
* Authenticates users and obtains user-specific Spotify data using Spotify Web API.
* Wrote custom algorithm to find top played artists for use as Spotify recommendation seeds.
* Seamless, dynamic, single page application with React for scraped data and Spotify Web Playback SDK.
