import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from './Spinner';

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    const {
      onInit,
      match: { params }
    } = this.props;

    onInit(params.story_id);
  }

  checkUserSubscription(storyUserId) {
    const { subscribe } = this.props;

    return subscribe.includes(storyUserId);
  }

  handleLikeClick(didUserLike, storyId, ev) {
    const { onLikeClick } = this.props;

    onLikeClick(didUserLike, storyId);
  }

  handleMouseEnter(ev) {
    this.setState({
      isModalActive: true
    });
  }

  handleMouseLeave(ev) {
    this.setState({
      isModalActive: false
    });
  }

  handleSubscriptionClick(action, targetUserId, ev) {
    const { onSubscriptionClick } = this.props;

    onSubscriptionClick(action, targetUserId);
  }

  render() {
    const { isModalActive } = this.state;
    const { isLoading, story, userId } = this.props;
    const timeString = new Date(story.createdAt).toLocaleDateString();
    let didUserLike = false;

    if (story.like) {
      for (let i = 0; i < story.like.length; i++) {
        if (story.like[i]._id === userId) {
          didUserLike = true;

          break;
        }
      }
    }

    return (
      <div className="Story">
        {Object.keys(story).length ? (
          <Fragment>
            <div className="Story__header">
              <h1 className="Story__header__title">{story.title}</h1>
              <div className="Story__header__info">
                <span
                  className="username"
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <Link to="#">{story.userId.username}</Link>
                  {isModalActive ? (
                    <div className="username__modal">
                      <div className="title">
                        Do You Like This Story? <br /> Then Follow Awesome
                        Curator!
                      </div>
                      {userId !== story.userId._id ? (
                        <Fragment>
                          {this.checkUserSubscription(story.userId._id) ? (
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
                  <Link to="#">{story.categoryId.title}</Link>
                </span>
                <span>
                  <Link to="#">{timeString}</Link>
                </span>
              </div>
            </div>
            <div className="Story__main">
              <div className="Story__main__markdown">
                <p>{story.content}</p>
              </div>
              <div className="Story__main__player">
                <div>
                  <iframe
                    title="tube-player"
                    className="tube-player"
                    src={`https://www.youtube.com/embed/${story.link}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="Story__utils">
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
          </Fragment>
        ) : null}
        {isLoading && <Spinner />}
      </div>
    );
  }
}
