import {
  START_LOADING_ARTIST_SEARCH_RESULTS,
  RECEIVE_ARTIST_SEARCH_RESULTS
} from '../actions/artists_actions';
import merge from 'lodash/merge'

const initialState = {
  artistSearchLoading: false
};

export default function(state = initialState, action) {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case START_LOADING_ARTIST_SEARCH_RESULTS:
      newState.artistSearchLoading = true;
      return newState;
    case RECEIVE_ARTIST_SEARCH_RESULTS:
      newState.artistSearchLoading = false;
      return newState;
    default:
      return state;
  }
}