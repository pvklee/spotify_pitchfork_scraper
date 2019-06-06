import {
  RECEIVE_RECENTLY_PLAYED_SONGS,
  RECEIVE_SAVED_ALBUMS,
  RECEIVE_PLAYLISTS,
  RECEIVE_RECOMMENDATIONS
} from '../actions/spotify_actions';
import merge from 'lodash/merge';

const _initialState = {
  recentlyPlayedSongs: {},
  savedAlbums: {},
  artists: {},
  recommendations: {},
  seeds: {}
}


export default (state = _initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_RECENTLY_PLAYED_SONGS:
      newState.recentlyPlayedSongs = action.songs.data.items;
      return newState;
    case RECEIVE_SAVED_ALBUMS:
      action.albums.data.items.forEach(item => {
        item.album.artists.forEach(artist => {
          if (!newState.artists[artist.id]){
            newState.artists[artist.id] = artist;
          }
        })
      })
      newState.savedAlbums = action.albums.data;
      return newState;
    case RECEIVE_RECOMMENDATIONS:
      newState = merge({}, newState, {
        recommendations: action.recommendations.data.tracks,
        seeds: action.recommendations.data.seeds
      });
      return newState;
    default:
      return state;
  }
}