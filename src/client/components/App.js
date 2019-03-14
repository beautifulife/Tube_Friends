import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import CategoryContainer from '../containers/CategoryContainer';
import ContentsListContainer from '../containers/ContentsListContainer';
import CreateStoryConainer from '../containers/CreateStoryContainer';
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
                path="/create"
                render={props => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <CreateStoryConainer {...props} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/:category/:username/:story_id"
                render={props => (
                  <Fragment>
                    <HeaderContainer {...props} />
                    <StoryContainer {...props} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/:username/feed"
                render={props => (
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
                render={props => (
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
                render={props => (
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
