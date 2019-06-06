import React from 'react';
import RecommendedTrackBox from './recommended_track_box';

export default class RecommendedTracks extends React.Component {
  componentDidMount(){
    this.props.getRecentlyPlayedSongs();
  }

  render(){
    const {recommendations, albumsInfo} = this.props;
    if(!recommendations[0]) {return null};
    const recommendationsList = recommendations.map(song => {
      if(!song || !albumsInfo[song.album.id]) {return null};
      const spotifyData = song;
      const pitchforkData = albumsInfo;
      return (
        <RecommendedTrackBox
          key={spotifyData.id}
          spotifyData={spotifyData}
          pitchforkData={pitchforkData}
        />
      )
    })
    return(<div>{recommendationsList}</div>)
  }
}