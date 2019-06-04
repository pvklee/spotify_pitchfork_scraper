import axios from 'axios';

export const setAccessToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getRecentlyPlayedSongs = () => (
  axios.get('https://api.spotify.com/v1/me/player/recently-played')
  // axios.get('/api/spotify_data/recently_played_songs')
)