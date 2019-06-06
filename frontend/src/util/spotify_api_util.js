import axios from 'axios';

export const setAccessToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getRecentlyPlayedSongs = () => (
  axios.get(
    'https://api.spotify.com/v1/me/player/recently-played',
    {params: {
      limit: 50
    }}
  )
)

export const getSavedAlbums = (offset) => (
  axios.get(
    'https://api.spotify.com/v1/me/albums',
    {params: {
      limit: 50,
      offset: offset
    }}
  )
)

export const getPlaylists = offset => (
  axios.get(
    'https://api.spotify.com/v1/me/playlists',
    {params: {
      limit: 50,
      offset: offset
    }}
  )
)

export const getRecommendationsFromTopFiveArtists = topFive => (
  axios.get(
    'https://api.spotify.com/v1/recommendations',
    {params: {
      seed_artists: topFive,
      limit: 20
    }}
  )
)