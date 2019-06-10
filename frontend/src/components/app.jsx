import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import SpotifyLoginContainer from './spotify_login/spotify_login_container'
import WelcomeContainer from './welcome/welcome_container'
import RecommendedTracksContainer from './recommended_tracks/recommended_tracks_container'
import './reset.css'
import './pitchfork_scraper.css'

class App extends React.Component{
  render(){
    return(
      <div className="pitchfork-scraper">
        <div className="header">
          <h1>Spotify Pitchfork Scraper</h1>
        </div>
        <div className="main">
          <Switch>
            <Redirect exact from='/' to='/spotify_login'/>
            <Route path="/spotify_login" component={SpotifyLoginContainer} />
          </Switch>
          <Route path="/recommended_tracks" component={RecommendedTracksContainer} />
          <Route path="/welcome" component={WelcomeContainer} />
        </div>
      </div>
    )
  }
}

export default App;
