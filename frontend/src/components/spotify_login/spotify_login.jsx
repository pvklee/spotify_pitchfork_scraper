import React from 'react';

export default class SpotifyLogin extends React.Component {
  render(){
    return(
      // <button onClick={this.handleClick}>Login</button>
      <a href="http://localhost:5000/api/spotify_auth/login">Login</a>
    )
  }
}