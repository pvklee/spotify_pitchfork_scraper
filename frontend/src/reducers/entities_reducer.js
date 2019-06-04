import {combineReducers} from 'redux';

import artists from './artists_reducer';
import spotifyData from './spotify_data_reducer';

export default combineReducers({
  artists,
  spotifyData
});