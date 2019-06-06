import {connect} from 'react-redux';
import Search from './search'
import {searchArtist} from '../../actions/artists_actions'

import {getRecentlyPlayedSongs, getSavedAlbums, getPlaylists} from '../../actions/spotify_actions'

const mapStateToProps = state => ({
  searchResults: state.ui.search.artistSearchResults,
  searchLoading: state.ui.loading.artistSearchLoading
})

const mapDispatchToProps = dispatch => ({
  searchArtist: query => dispatch(searchArtist(query)),
  getRecentlyPlayedSongs: () => dispatch(getRecentlyPlayedSongs()),
  getSavedAlbums: () => dispatch(getSavedAlbums()),
  getPlaylists: () => dispatch(getPlaylists())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)