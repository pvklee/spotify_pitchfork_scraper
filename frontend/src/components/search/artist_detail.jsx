import React from 'react'

export default class ArtistDetail extends React.Component {
  componentDidMount(){
    const artistLink = this.props.match.params.pitchforkLink;
    this.props.getArtistDetail(artistLink);
  }

  render(){
    const {artist} = this.props;

    if(!artist) return null;

    artist.reviews.map(review => ({
    }))

    return(
      <div>
        {artist.reviews[0].body}
      </div>
    )
  }
}