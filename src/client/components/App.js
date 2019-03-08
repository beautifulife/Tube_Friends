import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import SearchPage from './SearchPage';
import CategoryContainer from '../containers/CategoryContainer';
import ContentsList from './ContentsList';

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
              <Redirect exact path="/" to="/hottest" />
              {/* <Route path="/search" component={SearchPage} /> */}
              <Route
                path="/:sort/:category"
                render={(props) => (
                  <Fragment>
                    <CategoryContainer {...props} />
                    <ContentsList {...props} />
                  </Fragment>
                )}
              />
              <Route
                path="/:sort"
                render={(props) => (
                  <Fragment>
                    <CategoryContainer {...props} />
                    <ContentsList {...props} />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
