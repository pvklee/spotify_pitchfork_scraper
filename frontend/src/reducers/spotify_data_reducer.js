import {
  
} from '../actions/spotify_actions'

const _initialState = {

}

export default (state = _initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    default:
      return state;
  }
}