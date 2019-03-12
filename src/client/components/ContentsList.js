import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from './Spinner';

export default class ContentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'list',
      targetStoryId: ''
    };
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleViewTypeToogle = this.handleViewTypeToogle.bind(this);
    this.renderStories = this.renderStories.bind(this);
  }

  componentDidMount() {
    const {
      onInit,
      onInitFeed,
      userId,
      match: { params }
    } = this.props;

    console.log(params);

    if (params.username) {
      return;
    }

    onInit(params.sort, params.category);
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const {
      onInit,
      onInitFeed,
      userId,
      match: { params }
    } = this.props;

    console.log(params);

    if (userId !== prevProps.userId) {
      return onInitFeed(userId);
    }

    if (
      params.sort !== prevParams.sort ||
      params.category !== prevParams.category
    ) {
      if (params.username) {
        return onInitFeed(userId);
      }

      onInit(params.sort, params.category);
    }
  }

  handleLikeClick(didUserLike, storyId, ev) {
    const { onLikeClick } = this.props;

    onLikeClick(didUserLike, storyId);
  }

  handleMouseEnter(storyId, ev) {
    this.setState({
      targetStoryId: storyId
    });
  }

  handleMouseLeave(ev) {
    this.setState({
      targetStoryId: ''
    });
  }

  handleSubscriptionClick(action, targetUserId, ev) {
    const { onSubscriptionClick } = this.props;

    onSubscriptionClick(action, targetUserId);
  }

  handleViewTypeToogle(ev) {
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
    const { targetStoryId } = this.state;
    const {
      stories,
      subscribe,
      uid,
      userId,
      match: { params }
    } = this.props;

    return stories.map((story, index) => {
      const timeString = new Date(story.createdAt).toLocaleDateString();
      const isUserSubscribed = subscribe.includes(story.userId._id);
      let didUserLike = false;

      for (let i = 0; i < story.like.length; i++) {
        if (story.like[i].uid === uid) {
          didUserLike = true;

          break;
        }
      }

      return (
        <li key={index} className="ContentsList__main__list__item">
          <div className="header">
            <span
              className="header__username"
              onMouseEnter={this.handleMouseEnter.bind(this, story._id)}
              onMouseLeave={this.handleMouseLeave}
            >
              <Link to="#">{story.userId.username}</Link>
              {targetStoryId === story._id ? (
                <div className="header__username__modal">
                  <div className="title">
                    Do You Like This Story? <br /> Then Follow Awesome Curator!
                  </div>
                  {userId !== story.userId._id ? (
                    <Fragment>
                      {isUserSubscribed ? (
                        <button
                          type="button"
                          className="unsubscribe-btn"
                          onClick={this.handleSubscriptionClick.bind(
                            this,
                            'unsubscribe',
                            story.userId._id
                          )}
                        >
                          Subscribing
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="subscribe-btn"
                          onClick={this.handleSubscriptionClick.bind(
                            this,
                            'subscribe',
                            story.userId._id
                          )}
                        >
                          Subscribe
                        </button>
                      )}
                    </Fragment>
                  ) : null}
                </div>
              ) : null}
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
                <button
                  type="button"
                  className="like-btn"
                  onClick={this.handleLikeClick.bind(
                    this,
                    didUserLike,
                    story._id
                  )}
                >
                  {didUserLike ? (
                    <FontAwesomeIcon icon="heart" />
                  ) : (
                    <FontAwesomeIcon icon={['far', 'heart']} />
                  )}
                </button>
                <span>{story.like.length}</span>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    const { viewType } = this.state;
    const {
      isLoading,
      stories,
      sortType,
      match: { params }
    } = this.props;
    const category = params.category || 'All Categories';

    return (
      <div className="ContentsList">
        <div className="ContentsList__header">
          {stories && stories.length ? (
            <Fragment>
              <span>{sortType}</span>
              <span> : {category}</span>
            </Fragment>
          ) : (
            <span>...Loading</span>
          )}
          <button
            type="button"
            className="ContentsList__header__toggle-btn"
            onClick={this.handleViewTypeToogle}
          >
            {viewType === 'list' ? (
              <FontAwesomeIcon icon="list-ul" />
            ) : (
              <FontAwesomeIcon icon="th" />
            )}
          </button>
        </div>
        <div className="ContentsList__main">
          <ul className="ContentsList__main__list">
            {stories && stories.length ? this.renderStories() : null}
          </ul>
        </div>
        {isLoading && <Spinner />}
      </div>
    );
  }
}
