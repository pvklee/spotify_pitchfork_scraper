import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {setAccessToken} from './actions/spotify_actions'

document.addEventListener('DOMContentLoaded', ()=>{
  let store;
  if(localStorage.spotifyTokens){
    const tokens = JSON.parse(localStorage.spotifyTokens);
    const preloadedState = {
      session: tokens
    }
    setAccessToken(tokens.access_token)
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  //DEBUGGING ONLY debugger
  window.store = store.getState();
  //DEBUGGING ONLY debugger

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root)
});
