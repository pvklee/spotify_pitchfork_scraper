import * as APIUtil from '../util/pitchfork_api_util'
import {setPlaybackToQueuedSongs} from './spotify_actions'

export const  RECEIVE_ARTIST_SEARCH_RESULTS = "RECEIVE_ARTIST_SEARCH_RESULTS",
              START_LOADING_ARTIST_SEARCH_RESULTS = "START_LOADING_ARTIST_SEARCH_RESULTS",
              RECEIVE_ARTIST_SEARCH_ERRORS = "RECEIVE_ARTIST_SEARCH_ERRORS",
              RECEIVE_ARTIST_DETAIL_ERRORS = "RECEIVE_ARTIST_DETAIL_ERRORS",
              START_LOADING_ARTIST_DETAIL = "START_LOADING_ARTIST_DETAIL",
              RECEIVE_ARTIST_DETAIL = "RECEIVE_ARTIST_DETAIL",
              RECEIVE_ALBUMS_INFO = "RECEIVE_ALBUMS_INFO",
              ADD_SONGS_TO_PLAYBACK_QUEUE="ADD_SONGS_TO_PLAYBACK_QUEUE",
              START_LOADING_ALBUM_REVIEWS="START_LOADING_ALBUM_REVIEWS",
              FINISHED_LOADING_ALBUM_REVIEWS="FINISHED_LOADING_ALBUM_REVIEWS";

const receiveArtistSearchResults = ({data}) => ({
  type: RECEIVE_ARTIST_SEARCH_RESULTS,
  data
})

const startLoadingArtistSearchResults = () => ({
  type: START_LOADING_ARTIST_SEARCH_RESULTS
})

const receiveArtistSearchErrors = (errors) => ({
  type: RECEIVE_ARTIST_SEARCH_ERRORS,
  errors
})

const receiveArtistDetail = ({data}) => ({
  type: RECEIVE_ARTIST_DETAIL,
  data
})

const startLoadingArtistDetail = () => ({
  type: START_LOADING_ARTIST_DETAIL
})

const receiveArtistDetailErrors = errors => ({
  type: RECEIVE_ARTIST_DETAIL_ERRORS,
  errors
})

const receiveAlbumsInfo = ({data}) => ({
  type: RECEIVE_ALBUMS_INFO,
  data
})

const addSongsToPlaybackQueue = songs => ({
  type: ADD_SONGS_TO_PLAYBACK_QUEUE,
  songs
})

const startLoadingAlbumReviews = () => ({
  type: START_LOADING_ALBUM_REVIEWS
})

const finishedLoadingAlbumReviews = () => ({
  type: FINISHED_LOADING_ALBUM_REVIEWS
})

//async

export const searchArtist = query => dispatch => {
  dispatch(startLoadingArtistSearchResults());
  APIUtil.searchArtist(query)
    .then(data => dispatch(receiveArtistSearchResults(data)))
    .catch(err => receiveArtistSearchErrors(err));
}

export const getArtistDetail = artistLink => dispatch => {
  dispatch(startLoadingArtistDetail());
  APIUtil.getArtistDetail(artistLink)
    .then(data => dispatch(receiveArtistDetail(data)))
    .catch(err => receiveArtistDetailErrors(err));
}

export const getPitchforkAlbumReviewsForSongs = songs => dispatch => {
  dispatch(startLoadingAlbumReviews());
  const albums = getAlbumsFromSongs(songs);
  let allFilteredSongs = [];
  APIUtil.getPitchforkAlbumReviewsForSongs(albums)
    .then(pitchforkAlbumsInfo => {
      const filteredSongs = songs.filter(song => {
        const albumId = song.album.uri.split(':').pop();
        if (pitchforkAlbumsInfo.data[albumId]){
          allFilteredSongs.push(song.uri)
          return true;
        };
        return false;
      });
      dispatch(addSongsToPlaybackQueue(filteredSongs));
      dispatch(receiveAlbumsInfo(pitchforkAlbumsInfo));
      setPlaybackToQueuedSongs(allFilteredSongs)
        .then(() => dispatch(finishedLoadingAlbumReviews()));
    })
}


const getAlbumsFromSongs = songs => {
  let albums = [];
  songs.forEach(song => {
    const albumInfo = {};
    albumInfo.artistName = song.artists[0].name;
    albumInfo.artistId = song.artists[0].uri.split(':').pop();
    albumInfo.albumTitle = song.album.name;
    albumInfo.albumId = song.album.uri.split(':').pop();;
    albums.push(albumInfo);
  })
  return albums;
}