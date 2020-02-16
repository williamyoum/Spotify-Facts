import React, { Component } from 'react';

class TrackFacts extends Component {
    render() {
        return (
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
        )
    }
}

export default TrackFacts;