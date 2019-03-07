import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value
    });
  }

  handleSubmit(ev) {
    let { inputValue } = this.state;
    const { onSubmit, accessToken } = this.props;

    ev.preventDefault();

    onSubmit(inputValue, accessToken);

    this.setState({
      inputValue: ''
    });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <Fragment>
        <form className="SearchBar" onSubmit={this.handleSubmit}>
          <input
            value={inputValue}
            placeholder="search keyword"
            className="SearchBar__input"
            onChange={this.handleInputChange}
          />
          <button type="submit" className="SearchBar__submit-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </Fragment>
    );
  }
}
