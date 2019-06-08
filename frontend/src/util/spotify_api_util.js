import axios from 'axios';

export const setAccessToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const refreshSpotifyToken = refresh_token => (
  axios.get('/api/spotify_auth/refresh_token', {params: {refresh_token}})
)

export const setPlaybackToQueuedSongs = trackUris => (
  axios.put(
    'https://api.spotify.com/v1/me/player/play',
    {uris: trackUris}
  )
)

export const setPlayback = deviceId => (
  axios.put(
    'https://api.spotify.com/v1/me/player',
    {device_ids: [deviceId], play: false}
  )
)

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

export const getRecommendationsFromTopFiveArtists = topFive => (
  axios.get(
    'https://api.spotify.com/v1/recommendations',
    {params: {
      seed_artists: topFive,
      limit: 25
    }}
  )
)