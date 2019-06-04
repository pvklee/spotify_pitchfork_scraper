import * as APIUtil from '../util/search_api_util'

export const RECEIVE_ARTIST_SEARCH_RESULTS = "RECEIVE_ARTIST_SEARCH_RESULTS";
export const START_LOADING_ARTIST_SEARCH_RESULTS = "START_LOADING_ARTIST_SEARCH_RESULTS";
export const RECEIVE_ARTIST_SEARCH_ERRORS = "RECEIVE_ARTIST_SEARCH_ERRORS";
export const RECEIVE_ARTIST_DETAIL_ERRORS = "RECEIVE_ARTIST_DETAIL_ERRORS";
export const START_LOADING_ARTIST_DETAIL = "START_LOADING_ARTIST_DETAIL";
export const RECEIVE_ARTIST_DETAIL = "RECEIVE_ARTIST_DETAIL";

const receiveArtistSearchResults = ({data}) => ({
  type: RECEIVE_ARTIST_SEARCH_RESULTS,
  data
})

const startLoadingArtistSearchResults = () => ({
  type: START_LOADING_ARTIST_SEARCH_RESULTS
})

const receiveArtistSearchErrors = (errors) => ({
  type: RECEIVE_ARTIST_SEARCH_ERRORS,
  errors
})

const receiveArtistDetail = ({data}) => ({
  type: RECEIVE_ARTIST_DETAIL,
  data
})

const startLoadingArtistDetail = () => ({
  type: START_LOADING_ARTIST_DETAIL
})

const receiveArtistDetailErrors = errors => ({
  type: RECEIVE_ARTIST_DETAIL_ERRORS,
  errors
})
//async

export const searchArtist = query => dispatch => {
  dispatch(startLoadingArtistSearchResults());
  APIUtil.searchArtist(query)
    .then(data => dispatch(receiveArtistSearchResults(data)))
    .catch(err => receiveArtistSearchErrors(err));
}

export const getArtistDetail = artistLink => dispatch => {
  dispatch(startLoadingArtistDetail());
  APIUtil.getArtistDetail(artistLink)
    .then(data => dispatch(receiveArtistDetail(data)))
    .catch(err => receiveArtistDetailErrors(err));
}