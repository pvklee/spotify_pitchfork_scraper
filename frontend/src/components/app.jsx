import React from 'react';
import {Route} from 'react-router-dom';
import SearchContainer from './search/search_container'
import SpotifyLoginContainer from './spotify_login/spotify_login_container'
import WelcomeContainer from './welcome/welcome_container'
import RecommendTracksContainer from './recommended_tracks/recommended_tracks_container'

class App extends React.Component{
  render(){
    return <div>
      <Route path="/artists" component={SearchContainer} />
      <Route path="/recommended_tracks" component={RecommendTracksContainer} />
      <Route path="/spotify_login" component={SpotifyLoginContainer} />
      <Route path="/welcome" component={WelcomeContainer} />
    </div>
  }
}

export default App;
