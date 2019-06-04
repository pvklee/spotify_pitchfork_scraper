import React from 'react';
import {Route} from 'react-router-dom';
import ArtistDetailContainer from './artist_detail_container'
import SearchForm from './search_form';
import SearchResults from './search_results';

export default class Search extends React.Component {

  componentDidMount(){
    this.props.getRecentlyPlayedSongs();
  }


  render(){
    return(
      <div>
        <div>
          <SearchForm searchArtist={this.props.searchArtist}/>
          <SearchResults
            searchResults={this.props.searchResults}
            searchLoading={this.props.searchLoading}
          />
        </div>
        <div>
          <Route path="/artists/:pitchforkLink"
            component={ArtistDetailContainer}/>
        </div>
      </div>

    )
  }
}