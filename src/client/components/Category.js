import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  componentDidMount() {
    const { onInit } = this.props;

    onInit();
  }

  render() {
    const { categories, isUserLoggedIn, username, match } = this.props;
    const sort = match.params.category === 'feed' ? 'hottest' : match.params.sort;

    const renderCategories = () => {
      return categories.map(category => {
        return (
          <li key={category._id}>
            <Link to={`/${sort}/${category.title}`}>{category.title}</Link>
          </li>
        );
      });
    };

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
                <Link to={`/${sort}`}>All Categories</Link>
              </li>
              {renderCategories()}
            </Fragment>
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    );
  }
}
