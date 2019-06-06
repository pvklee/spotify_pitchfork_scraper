import * as APIUtil from '../util/spotify_api_util'
import {getPitchforkAlbumReviewsForSongs} from './artists_actions'

export const  RECEIVE_SPOTIFY_TOKENS = "RECEIVE_SPOTIFY_TOKENS",
              RECEIVE_RECENTLY_PLAYED_SONGS = "RECEIVE_RECENTLY_PLAYED_SONGS",
              RECEIVE_SAVED_ALBUMS = "RECEIVE_SAVED_ALBUMS",
              RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS",
              RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS"

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

const receivePlaylists = playlists => ({
  type: RECEIVE_PLAYLISTS,
  playlists
})

const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
})

//---

const getTopFiveArtistsCommaSeparated = (songs) => {
  let artists = [];
  songs.forEach((song) => {
    artists = artists.concat(song.track.artists)
  })
  let topFive = [];
  let artistCount = {};
  artists.forEach((artist, index) => {
    const recentBonus = (50-index)/100;
    artistCount[artist.id] = artistCount[artist.id] ?
      artistCount[artist.id] + 1 + recentBonus
      : 1 + recentBonus;
    if (topFive.length === 0) {
      topFive.push(artist.id)
    } else {
      let insert;
      let alreadyCounted = false;
      for(insert = 0; insert<topFive.length; ++insert){
        if(artistCount[artist.id] === artistCount[topFive[insert]]) {
          alreadyCounted = true;
          break;
        }
        if(artistCount[artist.id] < artistCount[topFive[insert]]) break;
      }
      if (alreadyCounted == true) {
        topFive.sort((a,b) => (artistCount[a] > artistCount[b]) ? 1 : ((artistCount[b] > artistCount[a]) ? -1 : 0))
      } else if(topFive.length < 5) {
        topFive.splice(insert, 0, artist.id);
      } else if(insert > 0){
        topFive.splice(insert, 0, artist.id);
        topFive.shift();
      }
    }
  })
  return topFive.join(',');
}

export const getRecentlyPlayedSongs = () => dispatch => {
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
      dispatch(getPitchforkAlbumReviewsForSongs(songs.data.tracks));
      dispatch(receiveRecommendations(songs));
    })
}

export const getSavedAlbums = (offset = 0) => dispatch => {
  APIUtil.getSavedAlbums(offset)
  .then(albums => {
    if(albums.data.items.length === 50) dispatch(getSavedAlbums(offset+50));
    dispatch(receiveSavedAlbums(albums));
  })
}

export const getPlaylists = (offset = 0) => dispatch => {
  APIUtil.getPlaylists(offset)
  .then(playlists => {
    if(playlists.data.items.length === 50) dispatch(getPlaylists(offset+50));
    dispatch(receivePlaylists(playlists));
  })
}

export const setAccessToken = access_token => {
  APIUtil.setAccessToken(access_token);
}

const getHashParams = (location) => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = location.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
}

export const setSpotifyTokens = location => dispatch => {
  const hashParams = getHashParams(location);
  localStorage.setItem('spotifyTokens', JSON.stringify(hashParams));
  setAccessToken(hashParams.access_token);
  dispatch(receiveSpotifyTokens);
}