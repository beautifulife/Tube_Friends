import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import CategoryContainer from '../containers/CategoryContainer';
import ContentsListContainer from '../containers/ContentsListContainer';
import StoryContainer from '../containers/StoryContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App__section">
            <Switch>
              <Redirect exact path="/" to="/hottest" />
              <Route
                exact
                path="/:category/:username/:story_id"
                render={(props) => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <StoryContainer {...props} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/:username/feed"
                render={(props) => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <CategoryContainer {...props} />
                    <ContentsListContainer {...props} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/:sort/:category"
                render={(props) => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <CategoryContainer {...props} />
                    <ContentsListContainer {...props} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/:sort"
                render={(props) => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <CategoryContainer {...props} />
                    <ContentsListContainer {...props} />
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
