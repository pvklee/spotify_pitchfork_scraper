import{
  RECEIVE_SPOTIFY_TOKENS
} from '../actions/spotify_actions';

const initialState = {
  access_token: '',
  refresh_token: ''
};

export default (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SPOTIFY_TOKENS:
      return action.tokens;
    default:
      return state;
  }
}