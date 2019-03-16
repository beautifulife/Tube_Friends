import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      const { onCloseClick } = this.props;

      onCloseClick();
    }
  }

  handleLoginClick(ev) {
    const { onGoogleSignIn } = this.props;

    this.setState(
      {
        isLoginOnProcess: true
      },
      onGoogleSignIn()
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
                  <i className="fab fa-google-plus-g" />
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
                  <i className="fab fa-google-plus-g" />
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
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      </div>
    );
  }
}
