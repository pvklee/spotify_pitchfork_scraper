import {connect} from 'react-redux';
import Search from './search'
import {searchArtist} from '../../actions/pitchfork_actions'

import {getSavedAlbums, getPlaylists} from '../../actions/spotify_actions'

const mapStateToProps = state => ({
  searchResults: state.ui.search.artistSearchResults,
  searchLoading: state.ui.loading.artistSearchLoading
})

const mapDispatchToProps = dispatch => ({
  searchArtist: query => dispatch(searchArtist(query)),
  getSavedAlbums: () => dispatch(getSavedAlbums()),
  getPlaylists: () => dispatch(getPlaylists())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)