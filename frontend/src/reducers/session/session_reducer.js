import{
  RECEIVE_SPOTIFY_TOKENS,
  RECEIVE_DEVICE_ID
} from '../../actions/spotify_actions';
import merge from 'lodash/merge';

const initialState = {
  access_token: '',
  refresh_token: '',
  tokenExpirationTime: null,
  device_id: ''
};

export default (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SPOTIFY_TOKENS:
      newState.access_token = action.tokens.access_token;
      newState.refresh_token = action.tokens.refresh_token;

      return newState;
    case RECEIVE_DEVICE_ID:
      newState.device_id = action.deviceId;
      return newState;
    default:
      return state;
  }
}