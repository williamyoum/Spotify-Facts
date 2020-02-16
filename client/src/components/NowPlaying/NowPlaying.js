import React, { Component } from 'react';

class nowPlaying extends Component {
    render() {
        return (
            <div className="nowPlaying">
                <p>
                {this.state.nowPlaying.name}
                </p>
          </div>
        );
    }
}

export default nowPlaying;