import React from 'react';
import SpotifyPlayerContainer from '../spotify_player/spotify_player_container'
import PitchforkReview from '../pitchfork_review/pitchfork_review'
export default class RecommendedTracks extends React.Component {
  componentDidMount(){
    this.props.refreshSpotifyToken(this.props.refresh_token)
      .then(() => this.props.getRecommendationsFromRecentlyPlayedSongs())
  }

  render(){
    const {currentTrackId, albumsInfo, queue, currentAlbumName} = this.props;
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
    return(
      <div>
        <SpotifyPlayerContainer />
        <PitchforkReview currentAlbumInfo={currentAlbumInfo}/>
      </div>
    )
  }
}