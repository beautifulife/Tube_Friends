import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
          <div className="App__section">
            <Switch>
              <Redirect exact path="/" to="/stories" />
              {/* <Route path="/search" component={SearchPage} /> */}
              <Route path="/:sort/:category" component={MainPage} />
              <Route path="/:sort" component={MainPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
