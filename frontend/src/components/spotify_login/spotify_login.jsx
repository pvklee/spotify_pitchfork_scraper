import React from 'react';
import {Redirect} from 'react-router-dom';
import "./spotify_login.css";

export default class SpotifyLogin extends React.Component {
  render(){
    // if(this.props.access_token){
    //   return <Redirect to="/recommended_tracks" />
    // }
    return(
      <div className="spotify-login-container">
          <div className="welcome-text-container">
            <h1>
              Welcome to Spotify Pitchfork Scraper!
            </h1>
            <p>
              This webapp displays Pitchfork album reviews to display alongside your Spotify recommendations in an online player.
            </p>
            <p>
              Ready to get started? Log in to your Spotify account below.
            </p>
          </div>
          <div>
            <a href="https://spotify-pitchfork-scraper.herokuapp.com/api/spotify_auth/login">
              <div className="spotify-login-button">
                Login to Spotify
              </div>
            </a>
          </div>
      </div>
    )
  }
}