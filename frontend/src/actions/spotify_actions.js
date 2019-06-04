import * as APIUtil from '../util/spotify_api_util'

export const RECEIVE_SPOTIFY_TOKENS = "RECEIVE_SPOTIFY_TOKENS"
export const RECEIVE_RECENTLY_PLAYED_SONGS = "RECEIVE_RECENTLY_PLAYED_SONGS"

const receiveSpotifyTokens = tokens => ({
  type: RECEIVE_SPOTIFY_TOKENS,
  tokens
})

const receiveRecentlyPlayedSongs = songs => ({
  type: RECEIVE_RECENTLY_PLAYED_SONGS,
  songs
})

export const getRecentlyPlayedSongs = () => dispatch => {
  APIUtil.getRecentlyPlayedSongs()
    .then(songs => dispatch(receiveRecentlyPlayedSongs(songs)))
}

export const setAccessToken = access_token => {
  APIUtil.setAccessToken(access_token);
}

export const setSpotifyTokens = location => dispatch => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = location.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  localStorage.setItem('spotifyTokens', JSON.stringify(hashParams));
  setAccessToken(hashParams.access_token);
  dispatch(receiveSpotifyTokens);
}