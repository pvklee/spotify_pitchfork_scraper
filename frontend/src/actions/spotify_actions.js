import * as APIUtil from '../util/spotify_api_util'
import {
  getTopFiveArtistsCommaSeparated,
  getHashParams
} from '../util/spotify_actions_util'

import {getPitchforkAlbumReviewsForSongs} from './pitchfork_actions'

export const  RECEIVE_SPOTIFY_TOKENS = "RECEIVE_SPOTIFY_TOKENS",
              RECEIVE_RECENTLY_PLAYED_SONGS = "RECEIVE_RECENTLY_PLAYED_SONGS",
              RECEIVE_SAVED_ALBUMS = "RECEIVE_SAVED_ALBUMS",
              RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS",
              RECEIVE_DEVICE_ID = "RECEIVE_DEVICE_ID",
              SET_UI_CURRENT_TRACK = "SET_UI_CURRENT_TRACK",
              SET_QUEUE_POSITION_TO_NEXT = "SET_QUEUE_POSITION_TO_NEXT"

const receiveSpotifyTokens = tokens => ({
  type: RECEIVE_SPOTIFY_TOKENS,
  tokens
})

const receiveRecentlyPlayedSongs = songs => ({
  type: RECEIVE_RECENTLY_PLAYED_SONGS,
  songs
})

const receiveSavedAlbums = albums => ({
  type: RECEIVE_SAVED_ALBUMS,
  albums
})

const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
})

const receiveDeviceId = deviceId => ({
  type: RECEIVE_DEVICE_ID,
  deviceId
})

export const setUICurrentTrack = currentTrack => ({
  type: SET_UI_CURRENT_TRACK,
  currentTrack
})

export const setQueuePositionToNext = () => ({
  type: SET_QUEUE_POSITION_TO_NEXT
})

//---

export const setPlaybackToQueuedSongs = trackUris => (
  APIUtil.setPlaybackToQueuedSongs(trackUris)
)

export const setDeviceIdAndSetPlayback = deviceId => dispatch => {
  dispatch(receiveDeviceId(deviceId));
  return APIUtil.setPlayback(deviceId);
}


export const getRecommendationsFromRecentlyPlayedSongs = () => dispatch => {
  APIUtil.getRecentlyPlayedSongs()
    .then(songs => {
      dispatch(receiveRecentlyPlayedSongs(songs));
      dispatch(getRecommendationsFromTopFiveArtists(songs))
    })
}

export const getRecommendationsFromTopFiveArtists = songs => dispatch => {
  const topFive = getTopFiveArtistsCommaSeparated(songs.data.items);
  APIUtil.getRecommendationsFromTopFiveArtists(topFive)
    .then(songs => {
      let alreadyCountedAlbums = new Set();
      const filteredSongs = songs.data.tracks.filter(track => {
        const notAlreadyCounted = !alreadyCountedAlbums.has(track.album.id);
        alreadyCountedAlbums.add(track.album.id);
        return notAlreadyCounted;
      });
      dispatch(receiveRecommendations(filteredSongs));
      dispatch(getPitchforkAlbumReviewsForSongs(filteredSongs));
    })
}

export const getSavedAlbums = (offset = 0) => dispatch => {
  APIUtil.getSavedAlbums(offset)
  .then(albums => {
    if(albums.data.items.length === 50) dispatch(getSavedAlbums(offset+50));
    dispatch(receiveSavedAlbums(albums));
  })
}

const setAccessToken = access_token => {
  APIUtil.setAccessToken(access_token);
}

export const setSpotifyTokens = location => dispatch => {
  const hashParams = getHashParams(location);
  setTimeout(() => dispatch(refreshSpotifyToken(hashParams.refresh_token)), 30*60*1000);
  localStorage.setItem('spotifyTokens', JSON.stringify(hashParams));
  setAccessToken(hashParams.access_token);
  dispatch(receiveSpotifyTokens(hashParams));
}

export const refreshSpotifyToken = refresh_token => dispatch => (
  APIUtil.refreshSpotifyToken(refresh_token)
    .then(res => {
      const {access_token} = res.data;
      setAccessToken(access_token); 
      dispatch(receiveSpotifyTokens({access_token, refresh_token}));
      setTimeout(() => dispatch(refreshSpotifyToken(refresh_token)), 30*60*1000);
    })
)