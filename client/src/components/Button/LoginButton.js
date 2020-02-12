import React, { Component } from 'react';

class LoginButton extends Component {
    render() {
        return (
            <div className = "login-button">
                <a href= 'http://tracklearn-backend.herokuapp.com/'>
                    <button id="button1">LOGIN</button>
                </a>
          </div>
        );
    }
}

export default LoginButton;