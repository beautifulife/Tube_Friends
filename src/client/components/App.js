import React, { Component } from 'react';
import Header from './Header';

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
      <div className="App">
        <Header />
        <h1>boilerplate</h1>
      </div>
    );
  }
}
