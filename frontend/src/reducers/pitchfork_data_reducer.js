import {
  RECEIVE_ARTIST_DETAIL,
  RECEIVE_ALBUMS_INFO
} from '../actions/artists_actions';
import merge from 'lodash/merge';

const initialState = {
  artistsInfo: {},
  albumsInfo: {}
};

export default function(state = initialState, action) {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ARTIST_DETAIL:
      newState = merge({}, newState, {artistsInfo: action.data});
      return newState;
    case RECEIVE_ALBUMS_INFO:
      debugger;
      newState = merge({}, state, {albumsInfo: action.data});
      return newState;
    default:
      return state;
  }
}