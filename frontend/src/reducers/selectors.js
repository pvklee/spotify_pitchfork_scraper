export const selectArtistSearchResults = (state) => {
  return state.ui.search.artistSearchResultIds.map(id => (
    state.entities.artists[id]
  ))
}