import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Now Playing', albumArt: '', accessURI: ''},
      audioFacts: { key: '', timeSignature: '', mode: '', tempo: ' '},
      keyConversion: '',
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
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            accessURI: response.item.id,
          },
        });
      })
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
    console.log("printed easy");
  }
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="column">
            <header>
              {/* move to header.js */}
              DISCOVER
              KEY,
              TIME SIGNATURE,
              MODE,
              TEMPO,
              ENERGY
        </header>
          </div>
          <div className="column">
            <div>
              <a href='http://localhost:4002/'>
                <img id="logo" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-logo-transparent-vector-1.png" alt="Spotify Logo" />
              </a>
            </div>
            {/* Login Button */}
            <a href='http://localhost:4002'><button id="button1">LOGIN TO SPOTIFY</button></a>
            {/* Now Playing Button */}
            {this.state.loggedIn && <button id="button2" onClick={() => this.getNowPlaying()}>CHECK CURRENT SONG</button>}
            {/* text input for track name */}
            {/* Audio Features Button */}
            {this.state.loggedIn && <button id="button3" onClick={() => this.getAudioFacts()}>ANALYZE SONG</button>}
            <div>
              {this.state.nowPlaying.name}
            </div>
            {/* {this.printKeyEasy} */}
            <div>
              <p>Key: {this.state.audioFacts.song_key} // {this.state.keyConversion}</p>
              <p>Time signature: {this.state.audioFacts.song_timeSignature} / 4</p>
              <p>Mode: {this.state.audioFacts.song_mode} // {this.state.modeConversion} </p>
              <p>Tempo:  {this.state.audioFacts.song_tempo} BPM</p>
              <p>Energy:  {this.state.audioFacts.song_energy} </p>
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} alt="" style={{ height: 150, width: 150 }} />
            </div>
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

