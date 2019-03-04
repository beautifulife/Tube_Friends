import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Header">
        <nav className="Header__nav">
          <div className="Header__logo">
            <a href="/">
              <span className="logo">Tube Friends</span>
            </a>
          </div>
          <div className="Header__sort">
            <ul className="Header__sort__list">
              <li className="Header__sort__list__item">
                <a href="#">hottest</a>
              </li>
              <li className="Header__sort__list__item">
                <a href="#">newest</a>
              </li>
            </ul>
          </div>
          <div className="Header__search">
            <input
              value=""
              placeholder="search keyword"
              className="Header__search__input"
            />
          </div>
          <div className="Header__utils">
            <a href="#" className="Header__utils__plus">
              <FontAwesomeIcon icon={faPlus} />
            </a>
            <a href="#" className="Header__utils__login">Login</a>
            <a href="#" className="Header__utils__sign-up">Sign Up</a>
            <button type="button" className="Header__utils__menu">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
