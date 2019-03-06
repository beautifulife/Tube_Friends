import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOnProcess: false,
      isSignUpActive: false
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLoginToggle = this.handleLoginToggle.bind(this);
  }

  handleCloseClick(ev) {
    if (
      ev.target.classList.contains('Login') ||
      ev.currentTarget.classList.contains('Login__contents__close-btn')
    ) {
      const { onCloseClick, isLoginActive } = this.props;

      onCloseClick(isLoginActive);
    }
  }

  handleLoginClick(ev) {
    const { onGoogleSignIn, isLoginActive, isUserLoggedIn } = this.props;

    this.setState(
      {
        isLoginOnProcess: true
      },
      onGoogleSignIn(isLoginActive, isUserLoggedIn)
    );
  }

  handleLoginToggle(ev) {
    if (ev.currentTarget.innerText === 'Log in') {
      this.setState({
        isSignUpActive: false
      });
    } else {
      this.setState({
        isSignUpActive: true
      });
    }
  }

  render() {
    const { isLoginOnProcess, isSignUpActive } = this.state;

    return (
      <div className="Login" onClick={this.handleCloseClick}>
        <div className="Login__contents">
          {isSignUpActive ? (
            <div className="Login__contents__wrapper">
              <div className="Login__contents__title">
                Sign up on Tube Friends
              </div>
              <button
                type="button"
                className="Login__contents__google-btn"
                onClick={this.handleLoginClick}
                disabled={isLoginOnProcess}
              >
                <span className="Login__contents__google-btn__logo">
                  <FontAwesomeIcon icon={fab.faGooglePlusG} />
                </span>
                <span>Sign up with Google</span>
              </button>
              <div className="Login__contents__no-account">
                Already have an account?
                <span onClick={this.handleLoginToggle}>Log in</span>
              </div>
            </div>
          ) : (
            <div className="Login__contents__wrapper">
              <div className="Login__contents__title">Log in to continue</div>
              <button
                type="button"
                className="Login__contents__google-btn"
                onClick={this.handleLoginClick}
              >
                <span className="Login__contents__google-btn__logo">
                  <FontAwesomeIcon icon={fab.faGooglePlusG} />
                </span>
                <span>Log in with Google</span>
              </button>
              <div className="Login__contents__no-account">
                Don't have an account?
                <span onClick={this.handleLoginToggle}>Sign up</span>
              </div>
            </div>
          )}
          <button
            type="button"
            className="Login__contents__close-btn"
            onClick={this.handleCloseClick}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    );
  }
}
