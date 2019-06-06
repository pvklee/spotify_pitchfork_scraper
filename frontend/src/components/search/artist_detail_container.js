import {connect} from 'react-redux';
import ArtistDetail from './artist_detail';
import {getArtistDetail} from '../../actions/artists_actions'

const mapStateToProps = (state, {match}) => ({
  artist: state.entities.pitchforkData[match.params.pitchforkLink]
})

const mapDispatchToProps = dispatch => ({
  getArtistDetail: artistLink => dispatch(getArtistDetail(artistLink))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistDetail)