import {connect} from 'react-redux';
import {getRecommendationsFromRecentlyPlayedSongs, refreshSpotifyToken} from '../../actions/spotify_actions'
import RecommendedTracks from './recommended_tracks'

const mapStateToProps = state => ({
  recommendations: state.entities.spotifyData.recommendations,
  albumsInfo: state.entities.pitchforkData.albumsInfo,
  queue: state.ui.spotifyPlayback.queue,
  currentTrackId: state.ui.spotifyPlayback.currentTrack.trackId,
  currentAlbumName: state.ui.spotifyPlayback.currentTrack.albumName,
  refresh_token: state.session.refresh_token
})

const mapDispatchToProps = dispatch => ({
  getRecommendationsFromRecentlyPlayedSongs: () => dispatch(getRecommendationsFromRecentlyPlayedSongs()),
  refreshSpotifyToken: refresh_token => dispatch(refreshSpotifyToken(refresh_token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedTracks);