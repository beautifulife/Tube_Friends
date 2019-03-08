import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  componentDidMount() {
    const { onInit } = this.props;

    onInit();
  }

  renderCategories() {
    const { categories, match } = this.props;

    return categories.map(category => {
      return (
        <li key={category._id}>
          <Link to={`/${match.params.sort}/${category.title}`}>{category.title}</Link>
        </li>
      );
    });
  }

  render() {
    const { categories, isUserLoggedIn, username, match } = this.props;

    return (
      <div className="Category">
        <ul className="Category__list">
          {categories.length ? (
            <Fragment>
              {isUserLoggedIn && (
                <li className="main-btn my-feed">
                  <Link to={`/@${username}`}>My Feed</Link>
                </li>
              )}
              <li className="main-btn">
                <Link to={`/${match.params.sort}`}>All Categories</Link>
              </li>
              {this.renderCategories()}
            </Fragment>
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    );
  }
}
