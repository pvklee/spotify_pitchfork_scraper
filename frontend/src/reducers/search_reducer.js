import {
  RECEIVE_ARTIST_SEARCH_RESULTS
} from '../actions/artists_actions';
import merge from 'lodash/merge'

const initialState = {
  artistSearchResults: []
};

export default function(state = initialState, action) {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ARTIST_SEARCH_RESULTS:
      newState.artistSearchResults = action.data;
      return newState;
    default:
      return state;
  }
}