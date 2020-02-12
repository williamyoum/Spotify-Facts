import React, { Component } from 'react';
import '../styles/App.scss';
import Header from './Header.js';
import SpotifyWebApi from 'spotify-web-api-js';
import Button from './Button/Button.js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    console.log("Here is the token: " + token);
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: '', albumArt: '', accessURI: ''},
      audioFacts: { key: '', timeSignature: '', mode: '', tempo: ' '},
      keyConversion: '',
      me: { me_name: '', me_image: ''},
      recentTracks: {prevSong: ''},
    };
    this.getAudioFacts = this.getAudioFacts.bind(this);

  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getRecent(){
    spotifyApi.getMyRecentlyPlayedTracks()
      .then((data) =>{
        this.setState({
          recentTracks: {
            prevSong: data.previous,
          },
          audioFacts: {
            song_key: data.previous.key,
            song_timeSignature: data.time_signature,
            song_mode: data.mode,
            song_tempo: data.tempo,
            song_energy: data.energy,
          },
        })
        console.log("This is the last song played:");
      });
  }
  getAudioFacts() {
    // this.accessURI(); //returns songURI
    const feedURI = this.state.nowPlaying.accessURI;
    spotifyApi.getAudioFeaturesForTrack(feedURI)
      .then((data) => {
        this.setState({
          audioFacts: {
            song_key: data.key,
            song_timeSignature: data.time_signature,
            song_mode: data.mode,
            song_tempo: data.tempo,
            song_energy: data.energy,
          },
        })
        this.printKeyEasy();
        // this.printTimeSigEasy();
        this.printModeEasy();
      }, function (err) {
        console.error(err);
      });
  }


  getNowPlaying() {

    if(!spotifyApi.getMyCurrentPlaybackState()){
      // if the playbackstate doesn't exist, then fill the state with the previous song.
      this.getRecent();
      this.getAudioFacts();
      this.setState({
          nowPlaying: {
            name: 'empty'
          }
      })
    }
    else{
      spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            accessURI: response.item.id,
          },
        })
        this.getAudioFacts();
        this.getRecent();
      })  
    }


  }
  printModeEasy(){
    if (this.state.audioFacts.song_key === 0) {
      this.setState({
        modeConversion: 'Minor',
      })
    }
    else{
      this.setState({
        modeConversion: 'Major', 
      })
    }
  }
  printKeyEasy() {
    if (this.state.audioFacts.song_key === 0) {
      this.setState({
        keyConversion: 'C',
      })
    }
    if (this.state.audioFacts.song_key === 1) {
      this.setState({
        keyConversion: 'C#/Db',
      })
    }
    if (this.state.audioFacts.song_key === 2) {
      this.setState({
        keyConversion: 'D',
      })
    }
    if (this.state.audioFacts.song_key === 3) {
      this.setState({
        keyConversion: 'D#/Eb',
      })
    }
    if (this.state.audioFacts.song_key === 4) {
      this.setState({
        keyConversion: 'E',
      })
    }
    if (this.state.audioFacts.song_key === 5) {
      this.setState({
        keyConversion: 'F',
      })
    }
    if (this.state.audioFacts.song_key === 6) {
      this.setState({
        keyConversion: 'F#/Gb',
      })
    }
    if (this.state.audioFacts.song_key === 7) {
      this.setState({
        keyConversion: 'G',
      })
    }
    if (this.state.audioFacts.song_key === 8) {
      this.setState({
        keyConversion: 'G#/Ab',
      })
    }
    if (this.state.audioFacts.song_key === 9) {
      this.setState({
        keyConversion: 'A',
      })
    }
    if (this.state.audioFacts.song_key === 10) {
      this.setState({
        keyConversion: 'A#/Bb',
      })
    }
    if (this.state.audioFacts.song_key === 11) {
      this.setState({
        keyConversion: 'B',
      })
    }
  }
  render() {
    return (

      <div className="App">
              <Header />
              <Button />
              <div className = "entrance-content">
                <div className = "logo-content">
                  <img id="logo" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-logo-transparent-vector-1.png" alt="Spotify Logo" />
                </div>
                {!this.state.loggedIn && 
                <div className = "login-button">
                  <a href= 'http://tracklearn-backend.herokuapp.com/'>
                      <button id="button1">LOGIN</button>
                  </a>
                </div>
                }          
      
              </div>  
                
          <div className = "main-content">
                <div className = "button-content">
                  {this.state.loggedIn && 
                    <button id="button2" onClick={() => 
                      this.getNowPlaying()}>
                      Get Facts
                    </button>
                  }
                </div>
                {/* text input for track name */}
                {/* Audio Features Button */}
                <div className="nowPlaying">
                  <p>
                    {this.state.nowPlaying.name}
                  </p>
                </div>
                <div>
                  {this.state.loggedIn &&
                    <div className = "track-facts-rectangle">
                      <div className = "album-art-box">
                        <img src={this.state.nowPlaying.albumArt} alt="" style={{ height: 290, width: 290 }} />
                      </div>
                        {this.state.nowPlaying.name !== '' && 
                          <div className="answers">
                            <div className ="category-label">Key</div>
                            <div className = "results">{this.state.keyConversion}</div>
                          </div>}
                        {this.state.nowPlaying.name !== '' && 
                          <div className="answers">
                            <div className ="category-label">Time Sign.</div>
                            <div className = "results">{this.state.audioFacts.song_timeSignature} per bar</div>
                          </div>}
                        {this.state.nowPlaying.name !== '' && 
                          <div className="answers">
                            <div className ="category-label">Key</div>
                            <div className = "results">{this.state.modeConversion} </div>
                          </div>}
                        {this.state.nowPlaying.name !== '' && 
                          <div className="answers">
                            <div className ="category-label">Tempo</div>
                            <div className = "results">{this.state.audioFacts.song_tempo} BPM</div>
                          </div>}
                    </div>
                  }
                  </div>
              </div>
        </div>

    );
  }
}

export default App;


// notes:
// make sure the current song gives back the URI, feed that URI into audioFacts.
// maybe move the answers next to the head, aligned, but in the columnR

