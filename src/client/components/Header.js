import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBars } from '@fortawesome/free-solid-svg-icons';
import LoginContainer from '../containers/LoginContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SearchBar from '../containers/SearchBarContainer';
import Menu from './Menu';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  componentDidMount() {
    const { onInit, isLoginActive } = this.props;

    onInit(isLoginActive);
  }

  handleLoginClick(ev) {
    const { onLoginClick } = this.props;

    onLoginClick();
  }

  handleMenuClick(ev) {
    const { onMenuToggle, isMenuActive } = this.props;

    onMenuToggle(isMenuActive);
  }

  handleProfileClick(ev) {
    const { onProfileToggle, isProfileActive } = this.props;

    onProfileToggle(isProfileActive);
  }

  render() {
    const {
      isLoginActive,
      isMenuActive,
      isProfileActive,
      isUserLoggedIn,
      userProfile: { photoURL, displayName },
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
            <SearchBar />
          </div>
          <div className="Header__utils">
            <Link to="#" className="Header__utils__plus">
              <FontAwesomeIcon icon={faPen} />
            </Link>
            {isUserLoggedIn ? (
              <span className="Header__utils__profile">
                <img
                  src={photoURL}
                  alt={displayName}
                  onClick={this.handleProfileClick}
                />
                {isProfileActive && <ProfileContainer />}
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
                  ? 'Header__utils__menu-btn active'
                  : 'Header__utils__menu-btn'
              }
              onClick={this.handleMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
        <div className={isMenuActive ? 'Header__menu active' : 'Header__menu'}>
          <Menu />
        </div>
        {isLoginActive && <LoginContainer />}
      </div>
    );
  }
}
