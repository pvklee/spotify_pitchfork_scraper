import {combineReducers} from 'redux';

import search from './search_reducer';
import loading from './loading_reducer';
import spotifyPlayback from './spotify_playback_reducer';

export default combineReducers({
  search,
  loading,
  spotifyPlayback
});