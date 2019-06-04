import axios from 'axios';

export const searchArtist = query => (
  axios.get('/api/artists/search', {params: {query}})
)

export const getArtistDetail = artistLink => (
  axios.get('/api/artists/detail', {params: {artistLink}})
)