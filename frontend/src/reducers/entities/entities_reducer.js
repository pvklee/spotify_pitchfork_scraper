import {combineReducers} from 'redux';

import pitchforkData from './pitchfork_data_reducer';
import spotifyData from './spotify_data_reducer';

export default combineReducers({
  pitchforkData,
  spotifyData
});