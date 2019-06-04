import {connect} from 'react-redux';
import {setSpotifyTokens} from '../../actions/spotify_actions'
import Welcome from './welcome'

const mapDispatchToProps = dispatch => ({
  setSpotifyTokens: (tokens) => dispatch(setSpotifyTokens(tokens)),
})

export default connect(
  null,
  mapDispatchToProps
)(Welcome)