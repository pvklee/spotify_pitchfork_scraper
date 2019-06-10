import React from 'react';
import {Redirect} from 'react-router-dom';
import SpotifyPlayerContainer from '../spotify_player/spotify_player_container'
import PitchforkReview from '../pitchfork_review/pitchfork_review'
import LoadingSpinner from '../ui/loading_spinner'
import './recommended_tracks.css'

export default class RecommendedTracks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.finishLoading = this.finishLoading.bind(this);
  }

  componentDidMount(){
    if(this.props.refresh_token){
      this.props.refreshSpotifyToken(this.props.refresh_token)
        .then(() => this.props.getRecommendationsFromRecentlyPlayedSongs())
    }
  }

  finishLoading(){ 
    this.setState({loading: false});
  }

  render(){
    const {currentTrackId, albumsInfo, queue, currentAlbumName, refresh_token} = this.props;

    if(!refresh_token){
      return <Redirect to="/spotify_login" />
    }

    let currentAlbumId = null;
    if (queue[currentTrackId])
      currentAlbumId = queue[currentTrackId].album.id;
    else if(albumsInfo && currentAlbumName){
      // sometimes the same spotify track has different track/album ids after setting playback 
      Object.values(albumsInfo).forEach(album => {
        if(album.spotifyTitle === currentAlbumName.split(/ [\(\[]/)[0]){
          currentAlbumId = album.albumId;
        }
      })
    }
    const currentAlbumInfo = (currentAlbumId && albumsInfo) ? albumsInfo[currentAlbumId] : null;
    
    const pitchforkReview = 
      <div className="pitchfork-review">
        <PitchforkReview currentAlbumInfo={currentAlbumInfo}/>
      </div>
    
    const loading = 
      <div className="recommended-tracks-loading">
        <LoadingSpinner />
      </div>
    return(
      <div className="recommended-tracks">
        {this.state.loading ? loading : null}
        <div className={this.state.loading ? "" : "spotify-player"}>
          <SpotifyPlayerContainer finishLoading={this.finishLoading}/>
        </div>
        {this.state.loading ? null : pitchforkReview}
      </div>
    )
  }
}