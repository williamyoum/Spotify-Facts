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
      nowPlaying: { name: 'Now Playing', albumArt: '' },
      audioFacts: { key: '', timeSignature: '', mode: '', tempo: ''},
      currURI: '',
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
    spotifyApi.getAudioFeaturesForTrack('0H2MmFtJgoeywCIbAN3sid')
    .then((data) => {
      this.setState({
        audioFacts: {
          song_key: data.key,
          song_timeSignature: data.time_signature,
          song_mode: data.mode,
          song_tempo: data.tempo,

        }
      })
     }, function(err) {
      console.error(err);
    });
  }
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          },
          currURI: response.item.decodeURIComponent,
        });
      })
  }

  printEasy(){
    if(this.state.audioFacts.key == 0){
      this.state.audioFacts.key = 'C';
    }
    if(this.state.audioFacts.key == 1){
      this.state.audioFacts.key = 'C#/Db';
    }
    if(this.state.audioFacts.key == 2){
      this.state.audioFacts.key = 'D';
    }
    if(this.state.audioFacts.key == 3){
      this.state.audioFacts.key = 'D#/Eb';
    }
    if(this.state.audioFacts.key == 4){
      this.state.audioFacts.key = 'E';
    }
    if(this.state.audioFacts.key == 5){
      this.state.audioFacts.key = 'F';
    }
    if(this.state.audioFacts.key == 6){
      this.state.audioFacts.key = 'F#/Gb';
    }
    if(this.state.audioFacts.key == 7){
      this.state.audioFacts.key = 'G';
    }
    if(this.state.audioFacts.key == 8){
      this.state.audioFacts.key = 'G#/Ab';
    }
    if(this.state.audioFacts.key == 9){
      this.state.audioFacts.key = 'A';
    }
    if(this.state.audioFacts.key == 10){
      this.state.audioFacts.key = 'A#/Bb';
    }
    if(this.state.audioFacts.key == 11){
      this.state.audioFacts.key = 'B';
    }



  }
  render() {
    return (
      <div className="App">
        <div class="row">
          <div class="column">
        <header>
          DISCOVER KEY,
          TIME SIGNATURE,
          MODE, 
          TEMPO
        </header>
          </div>
          <div class="column">
            <div>
              <a href= 'http://localhost:3000'>
                <img id="logo" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-logo-transparent-vector-1.png" alt="Spotify Logo" />
                </a>
              
            </div>
            {/* Login Button */}
            <a href='http://localhost:4002'><button id="button1">Login to Spotify</button></a>
            {/* Now Playing Button */}
            {this.state.loggedIn && <button id="button2" onClick={() => this.getNowPlaying()}>Check Now Playing</button>}
            {/* text input for track name */}
            {/* Audio Features Button */}
            {this.state.loggedIn && <button id="button3" onClick={() => this.getAudioFacts()}>Get Facts</button>}
            <div>
              {this.state.nowPlaying.name}
            </div>
            {this.printEasy}
            <div>
              <dl>
                <dt>Here is the key: 
                  <dd>{this.state.audioFacts.song_key}</dd>
                </dt>
                <dt>Whats the time signature?<dd>{this.state.audioFacts.song_timeSignature}</dd>
                </dt>
                <dt>Ever wonder what the mode was?
                  <dd>{this.state.audioFacts.song_mode}</dd>
                </dt>
                <dt>And Here's the tempo:
                  <dd>{this.state.audioFacts.song_tempo}</dd>
                </dt>
              </dl>
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
