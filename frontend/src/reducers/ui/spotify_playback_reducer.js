import {
  SET_UI_CURRENT_TRACK
} from '../../actions/spotify_actions'
import {
  ADD_SONGS_TO_PLAYBACK_QUEUE
} from '../../actions/pitchfork_actions'
import merge from 'lodash/merge'

const initialState = {
  currentTrack: {},
  queue: {},
  firstSong: ''
}

export default (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case SET_UI_CURRENT_TRACK:
      newState.currentTrack = action.currentTrack;
      return newState;
    case ADD_SONGS_TO_PLAYBACK_QUEUE:
      newState.firstSong = action.songs[0].name;
      action.songs.forEach(song => newState.queue[song.id] = song);
      return newState;
    default:
      return state;
  }
}