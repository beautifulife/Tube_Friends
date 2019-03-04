import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuActive: false,
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
  }

  handleInputChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value.trim()
    });
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
              value={inputValue}
              placeholder="search keyword"
              className="Header__search__input"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="Header__utils">
            <a href="#" className="Header__utils__plus">
              <FontAwesomeIcon icon={faPen} />
            </a>
            <a href="#" className="Header__utils__login">Login</a>
            <a href="#" className="Header__utils__sign-up">Sign Up</a>
            <button
              type="button"
              className={isMenuActive ? 'Header__utils__menu active' : 'Header__utils__menu'}
              onClick={this.handleMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </nav>
        <div className={isMenuActive ? 'Header__menu active' : 'Header__menu'}>
          <ul className="Header__menu__list">
            <a href="#">
              <li className="Header__menu__list__item">About</li>
            </a>
            <a href="#">
              <li className="Header__menu__list__item">Notice</li>
            </a>
            <a href="#">
              <li className="Header__menu__list__item">Terms of service</li>
            </a>
            <a href="#">
              <li className="Header__menu__list__item">Privacy policy</li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}
