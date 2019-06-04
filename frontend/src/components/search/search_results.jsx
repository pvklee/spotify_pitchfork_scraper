import React from 'react'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../ui/loading_spinner'

export default ({searchResults, searchLoading}) => {
  const resultsList = searchResults.map(result => (
    <li key={result.url}><Link to={result.url}>{result.artist}</Link></li>
  ));

  if(searchLoading) {return <LoadingSpinner />}

  return(
    <ul>{resultsList}</ul>
  )
}
