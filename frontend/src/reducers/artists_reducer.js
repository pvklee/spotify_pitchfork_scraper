import {
  RECEIVE_ARTIST_DETAIL
} from '../actions/artists_actions';
import merge from 'lodash/merge';

const initialState = {};

export default function(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ARTIST_DETAIL:
      return merge({}, state, action.data)
    default:
      return state;
  }
}