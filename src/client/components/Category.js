import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  componentDidMount() {
    const { onInit } = this.props;

    onInit();
  }

  render() {
    const {
      categories,
      isUserLoggedIn,
      username,
      match: { params }
    } = this.props;
    const sort = params.username ? 'hottest' : params.sort;

    const renderCategories = () => {
      return categories.map(category => {
        return (
          <li
            key={category._id}
            className={params.category === category.title ? 'active' : null}
          >
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
                <li
                  className={
                    params.username
                      ? 'main-btn my-feed active'
                      : 'main-btn my-feed'
                  }
                >
                  <Link to={`/${username}/feed`}>My Feed</Link>
                </li>
              )}
              <li
                className={
                  params.sort && !params.category
                    ? 'main-btn active'
                    : 'main-btn'
                }
              >
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
