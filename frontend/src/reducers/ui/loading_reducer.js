import {
  START_LOADING_ARTIST_SEARCH_RESULTS,
  RECEIVE_ARTIST_SEARCH_RESULTS,
  START_LOADING_ALBUM_REVIEWS,
  FINISHED_LOADING_ALBUM_REVIEWS
} from '../../actions/pitchfork_actions';
import merge from 'lodash/merge'

const initialState = {
  artistSearchLoading: false,
  albumReviewsLoading: true
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
    case START_LOADING_ALBUM_REVIEWS:
        newState.albumReviewsLoading = true;
        return newState;
    case FINISHED_LOADING_ALBUM_REVIEWS:
        newState.albumReviewsLoading = false;
        return newState;
    default:
      return state;
  }
}