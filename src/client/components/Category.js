import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  componentDidMount() {
    const { onInit } = this.props;

    onInit();
  }

  renderCategories(categories) {
    return categories.map(category => {
      return (
        <li key={category._id}>
          <Link to="#">{category.title}</Link>
        </li>
      );
    });
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="Category">
        <ul className="Category__list">
          {categories.length ? (
            <Fragment>
              <li className="main-btn my-feed">
                <Link to="#">My Feed</Link>
              </li>
              <li className="main-btn">
                <Link to="#">All Categories</Link>
              </li>
              {this.renderCategories(categories)}
            </Fragment>
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    );
  }
}
