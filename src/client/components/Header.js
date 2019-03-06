import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBars } from '@fortawesome/free-solid-svg-icons';
import LoginContainer from '../containers/LoginContainer';
import toggleSignInGoogle from '../utils/googleLogin';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuActive: false,
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    // if (firebase.auth().currentUser) {
    //   console.log('user is here', firebase.auth().currentUser);
    // }
  }

  handleInputChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value.trim()
    });
  }

  handleLoginClick(ev) {
    const { onLoginClick } = this.props;

    onLoginClick();
  }

  handleMenuClick(ev) {
    if (ev.currentTarget.classList.contains('active')) {
      this.setState({
        isMenuActive: false
      });
    } else {
      this.setState({
        isMenuActive: true
      });
    }
  }

  render() {
    const { isMenuActive, inputValue } = this.state;
    const {
      isLoginActive,
      isUserLoggedIn,
      userProfile: {
        photoURL,
        displayName
      }
    } = this.props;

    return (
      <div className="Header">
        <nav className="Header__nav">
          <div className="Header__logo">
            <Link to="/">
              <span className="logo">Tube Friends</span>
            </Link>
          </div>
          <div className="Header__sort">
            <ul className="Header__sort__list">
              <li className="Header__sort__list__item">
                <Link to="#">hottest</Link>
              </li>
              <li className="Header__sort__list__item">
                <Link to="#">newest</Link>
              </li>
            </ul>
          </div>
          <div className="Header__search">
            <input
              value={inputValue}
              placeholder="search keyword"
              className="Header__search__input"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="Header__utils">
            <Link to="#" className="Header__utils__plus">
              <FontAwesomeIcon icon={faPen} />
            </Link>
            {isUserLoggedIn ? (
              <span className="Header__utils__profile">
                <Link to={`/${displayName}`}>
                  <img
                    src={photoURL}
                    alt={displayName}
                  />
                </Link>
              </span>
            ) : (
              <button
                type="button"
                className="Header__utils__login"
                onClick={this.handleLoginClick}
              >
                Login
              </button>
            )}
            <button
              type="button"
              className={
                isMenuActive
                  ? 'Header__utils__menu active'
                  : 'Header__utils__menu'
              }
              onClick={this.handleMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
        <div className={isMenuActive ? 'Header__menu active' : 'Header__menu'}>
          <ul className="Header__menu__list">
            <Link to="#">
              <li className="Header__menu__list__item">About</li>
            </Link>
            <Link to="#">
              <li className="Header__menu__list__item">Notice</li>
            </Link>
            <Link to="#">
              <li className="Header__menu__list__item">Terms of service</li>
            </Link>
            <Link to="#">
              <li className="Header__menu__list__item">Privacy policy</li>
            </Link>
          </ul>
        </div>
        {isLoginActive && <LoginContainer />}
      </div>
    );
  }
}
