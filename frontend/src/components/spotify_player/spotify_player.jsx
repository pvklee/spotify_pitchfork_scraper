import React from 'react';
import './spotify_player.css'

export default class SpotifyPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      position: 0,
      duration: 0,
      trackName: '',
      albumName: '',
      artistName: '',
      playing: false,
      playbackReady: false
    }
    this.checkForPlayer = this.checkForPlayer.bind(this);
    this.createEventHandlers = this.createEventHandlers.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentDidMount(){
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 100);
  }

  checkForPlayer(){
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      const token = this.props.access_token;
      this.player = new window.Spotify.Player({
        name: "Pitchfork Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });
      this.createEventHandlers();
      this.player.connect();
    }
  }

  onStateChanged(state) {
    if (state) {
      if(this.state.playbackReady){
        const {
          position,
          duration,
        } = state;
        const {
          current_track: currentTrack
        } = state.track_window;
        const playing = !state.paused;
        const trackId = currentTrack.id;
        const albumId = currentTrack.album.uri.split(":").pop();
        const albumArtUrl = currentTrack.album.images[2].url;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const artistName = currentTrack.artists
          .map(artist => artist.name)
          .join(", ");
        this.props.setUICurrentTrack({
          trackId,
          albumId,
          albumArtUrl,
          trackName,
          albumName,
        })
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          albumArtUrl,
          playing
        });
        console.log(state);
      } else if (!state.paused){
        this.setState({playbackReady: true});
        this.props.finishLoading();
      }
    }
  }

  createEventHandlers() {
    // Error handling
    const {setDeviceIdAndSetPlayback, setPlaybackToQueuedSongs} = this.props;
    this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
    this.player.addListener('account_error', ({ message }) => { console.error(message); });
    this.player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    this.player.addListener('player_state_changed', state => {
      console.log(state);
      this.onStateChanged(state);
    });

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      setDeviceIdAndSetPlayback(device_id)
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  }

  onPrevClick(){
    this.player.previousTrack();
  }

  onPlayClick(){
    this.player.togglePlay();
  }

  onNextClick(){
    this.player.nextTrack();
  }

  render(){
    if(!this.state.playbackReady) {return null};
    return(
      <div className="spotify-player-container">
        <div className="spotify-player-header">
          <h1>{this.state.trackName}</h1>
          <h2>{this.state.artistName}</h2>
        </div>
        <div className="spotify-album-art">
          <img src={this.state.albumArtUrl} alt="albumart"/>
        </div>
        <div className="spotify-player-controls">
          <button className="spotify-button" onClick={this.onPrevClick}>Previous</button>
          <button className="spotify-button" onClick={this.onPlayClick}>{this.state.playing ? 'Pause' : 'Play'}</button>
          <button className="spotify-button" onClick={this.onNextClick}>Next</button>
        </div>
      </div>
    )
  }
}