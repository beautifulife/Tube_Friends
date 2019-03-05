import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
        </div>
      </Router>
    );
  }
}
