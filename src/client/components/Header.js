import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  componentDidUpdate() {
    console.log(this.props);
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
      match: { params }
    } = this.props;

    return (
      <div className="Header">
        <nav className="Header__nav">
          <div className="Header__title">
            <Link to="/">
              <span className="logo">Tube Friends</span>
            </Link>
          </div>
          <div className="Header__sort">
            <ul className="Header__sort__list">
              <li
                className={
                  params.sort === 'hottest'
                    ? 'Header__sort__list__item active'
                    : 'Header__sort__list__item'
                }
              >
                <Link
                  to={
                    params.category ? `/hottest/${params.category}` : '/hottest'
                  }
                >
                  Hottest
                </Link>
              </li>
              <li
                className={
                  params.sort === 'newest'
                    ? 'Header__sort__list__item active'
                    : 'Header__sort__list__item'
                }
              >
                <Link
                  to={
                    params.category ? `/newest/${params.category}` : '/newest'
                  }
                >
                  Newest
                </Link>
              </li>
            </ul>
          </div>
          <div className="Header__search">
            <SearchBar />
          </div>
          <div className="Header__utils">
            <Link to="/create" className="Header__utils__plus">
              <FontAwesomeIcon icon="pen" />
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
              <FontAwesomeIcon icon="bars" />
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
