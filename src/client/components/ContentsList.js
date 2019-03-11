import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faTh, faHeart } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';

export default class ContentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'list'
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.renderStories = this.renderStories.bind(this);
  }

  componentDidMount() {
    const {
      onInit,
      match: { params }
    } = this.props;

    onInit(params.sort, params.category);
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const {
      onInit,
      match: { params }
    } = this.props;

    console.log(params, prevParams);

    if (
      params.sort !== prevParams.sort ||
      params.category !== prevParams.category
    ) {
      onInit(params.sort, params.category);
    }
  }

  handleToggle(ev) {
    const { viewType } = this.state;

    if (viewType === 'list') {
      this.setState({
        viewType: 'card'
      });
    } else {
      this.setState({
        viewType: 'list'
      });
    }
  }

  renderStories() {
    const {
      stories,
      match: { params }
    } = this.props;

    return stories.map((story, index) => {
      const timeString = new Date(story.createdAt).toLocaleDateString();

      return (
        <li key={index} className="ContentsList__main__list__item">
          <div className="header">
            <span>
              <Link to="#">{story.userId.username}</Link>
            </span>
            <span>
              <Link to={`/${params.sort}/${story.categoryId.title}`}>
                {story.categoryId.title}
              </Link>
            </span>
            <span>{timeString}</span>
          </div>
          <div className="main">
            <div className="main__thumbnail">
              <Link to="#">
                <img src={`${story.thumbnail}`} alt={story.title} />
              </Link>
            </div>
            <div className="main__info">
              <p className="title">
                <Link to="#">{story.title}</Link>
              </p>
              <p className="summary">
                <Link to="#">{story.summary}</Link>
              </p>
              <div className="utils">
                <button type="button" className="like-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <span>{story.like}</span>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    const { viewType } = this.state;
    const { isLoading, stories, sortType } = this.props;

    return (
      <div className="ContentsList">
        <div className="ContentsList__header">
          {stories.length ? (
            <Fragment>
              <span>{sortType}</span>
              <span>: answer</span>
            </Fragment>
          ) : (
            <span>...Loading</span>
          )}
          <button
            type="button"
            className="ContentsList__header__toggle-btn"
            onClick={this.handleToggle}
          >
            {viewType === 'list' ? (
              <FontAwesomeIcon icon={faListUl} />
            ) : (
              <FontAwesomeIcon icon={faTh} />
            )}
          </button>
        </div>
        <div className="ContentsList__main">
          <ul className="ContentsList__main__list">
            {stories.length ? this.renderStories() : null}
          </ul>
        </div>
        {isLoading && <Spinner />}
      </div>
    );
  }
}
