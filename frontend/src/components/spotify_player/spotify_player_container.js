import {connect} from 'react-redux';
import {
  setDeviceIdAndSetPlayback,
  setUICurrentTrack,
} from '../../actions/spotify_actions';
import {getPitchforkAlbumReviewsForSongs} from '../../actions/pitchfork_actions'
import SpotifyPlayer from './spotify_player'

const mapStateToProps = state => ({
  albumsInfo: state.entities.pitchforkData.albumsInfo,
  access_token: state.session.access_token,
  queue: state.ui.spotifyPlayback.queue,
  albumReviewsLoading: state.ui.loading.albumReviewsLoading,
  firstSong: state.ui.spotifyPlayback.firstSong
})

const mapDispatchToProps = dispatch => ({
  setDeviceIdAndSetPlayback: deviceId => dispatch(setDeviceIdAndSetPlayback(deviceId)),
  getPitchforkAlbumReviewsForSongs: song => dispatch(getPitchforkAlbumReviewsForSongs(song)),
  setUICurrentTrack: currentTrack => dispatch(setUICurrentTrack(currentTrack)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyPlayer);