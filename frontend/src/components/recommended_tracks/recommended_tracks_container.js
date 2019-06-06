import {connect} from 'react-redux';
import {getRecentlyPlayedSongs} from '../../actions/spotify_actions'
import RecommendedTracks from './recommended_tracks'

const mapStateToProps = state => ({
  recommendations: state.entities.spotifyData.recommendations,
  albumsInfo: state.entities.pitchforkData.albumsInfo
})

const mapDispatchToProps = dispatch => ({
  getRecentlyPlayedSongs: () => dispatch(getRecentlyPlayedSongs())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedTracks);