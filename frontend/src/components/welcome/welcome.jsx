import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';

class Welcome extends React.Component {
  componentDidMount(){
    this.props.setSpotifyTokens(this.props.location.search);
  }

  render(){
    return(
      <Redirect to="/recommended_tracks"/>
    )
  }
}

export default withRouter(Welcome);