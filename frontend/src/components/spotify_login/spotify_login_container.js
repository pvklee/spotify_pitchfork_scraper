import {connect} from 'react-redux';
import SpotifyLogin from './spotify_login'

const mapStateToProps = state => ({
  access_token: state.session.access_token
})

export default connect(
  mapStateToProps
)(SpotifyLogin)