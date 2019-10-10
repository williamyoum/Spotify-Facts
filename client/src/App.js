import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Now Playing', albumArt: '' },
    }
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
    spotifyApi.getAudioFeaturesForTrack('43ZHCT0cAZBISjO8DG9PnE')
    .then(function(data) {
      console.log('Features:', data);
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
          }
        });
      })
  }
  render() {
    return (
      <div className="App">
        <header>
          DISCO
          VER YOUR FAVORITE KEY</header>
        <div>
        </div>
        <div>
          <img id="logo" src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-logo-transparent-vector-1.png" alt="Spotify Logo" />
        </div>
        <a href='http://localhost:4002'><button id="button2">Login to Spotify</button></a>
        {this.state.loggedIn && <button id="button1" onClick={() => this.getNowPlaying()}>
          Check Now Playing
              </button>}
        {/* text input for track name */}
        <div>
          {/* <button>Audio Analysis
          </button> */}
        </div>
        {this.state.loggedIn && <button id="button3" onClick={() => this.getAudioFacts()}>Get Facts</button>}
        <div>
          {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} alt="" style={{ height: 150, width: 150 }} />
        </div>
      </div>
    );
  }
}

export default App;
