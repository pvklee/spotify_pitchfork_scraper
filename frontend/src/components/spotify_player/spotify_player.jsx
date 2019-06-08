import React from 'react';
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

  componentDidUpdate(prevProps){
    if(this.props.queue.length !== 0 && prevProps.queuePosition !== this.props.queuePosition){
      this.setState({queuedSongLoading: true});
      const trackUri = this.props.queue[this.props.queuePosition].uri;
      this.props.setPlaybackToNewSong(trackUri);
    }
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
      } else if (this.props.firstSong === state.track_window.current_track.name){
        this.setState({playbackReady: true});
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
      <div>
        <div>
          <h1>{this.state.trackName}</h1>
          <h2>{this.state.albumName}</h2>
          <img src={this.state.albumArtUrl} alt="albumart"/>
        </div>
        <div>
          <button onClick={this.onPrevClick}>Previous</button>
          <button onClick={this.onPlayClick}>{this.state.playing ? 'Pause' : 'Play'}</button>
          <button onClick={this.onNextClick}>Next</button>
        </div>
      </div>
    )
  }
}