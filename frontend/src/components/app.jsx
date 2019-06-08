import React from 'react';
import {Route} from 'react-router-dom';
import SpotifyLoginContainer from './spotify_login/spotify_login_container'
import WelcomeContainer from './welcome/welcome_container'
import RecommendedTracksContainer from './recommended_tracks/recommended_tracks_container'

class App extends React.Component{
  render(){
    return <div>
        <Route path="/recommended_tracks" component={RecommendedTracksContainer} />
        <Route path="/spotify_login" component={SpotifyLoginContainer} />
        <Route path="/welcome" component={WelcomeContainer} />
      </div>
  }
}

export default App;
