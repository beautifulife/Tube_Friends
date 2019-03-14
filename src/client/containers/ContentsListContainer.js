import { connect } from 'react-redux';
import { auth } from '../utils/firebase';
import ContentsList from '../components/ContentsList';
import {
  authRequestForbidden,
  fetchStoriesComplete,
  fetchStoriesError,
  fetchStoriesRequested,
  likeToggleComplete,
  likeToggleError,
  likeToggleRequested,
  subscriptionToggleComplete,
  subscriptionToggleError,
  subscriptionToggleRequested
} from '../actions';

const mapStateToProps = state => {
  const { isLoading, stories, sortType, subscribe, uid, userId } = state;

  return { isLoading, stories, sortType, subscribe, uid, userId };
};

const mapDispatchToProps = dispatch => ({
  onInit: async (sort, category) => {
    dispatch(fetchStoriesRequested());

    try {
      sort = sort || '';
      category = category || '';

      let res = await fetch(
        `/api/stories?sort=${sort}&category=${category}&page=1`
      );

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();

      dispatch(
        fetchStoriesComplete(res.stories, res.sort, res.category, res.page)
      );
    } catch (err) {
      console.error(err);
      dispatch(fetchStoriesError());
    }
  },
  onInitFeed: async userId => {
    if (!auth.currentUser) {
      return dispatch(authRequestForbidden());
    }

    dispatch(fetchStoriesRequested());

    try {
      const accessToken = JSON.parse(JSON.stringify(auth.currentUser))
        .stsTokenManager.accessToken;

      let res = await fetch(`/api/users/${userId}/feed?page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();
      dispatch(fetchStoriesComplete(res.stories, 'feed', 'feed', res.page));
    } catch (err) {
      console.error(err);
      dispatch(fetchStoriesError());
    }
  },
  onLikeClick: async (didUserLike, storyId) => {
    if (!auth.currentUser) {
      return dispatch(authRequestForbidden());
    }

    dispatch(likeToggleRequested());

    try {
      const action = didUserLike ? 'remove' : 'add';
      const accessToken = JSON.parse(JSON.stringify(auth.currentUser))
        .stsTokenManager.accessToken;

      let res = await fetch(`/api/stories/${storyId}/like`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();

      dispatch(likeToggleComplete(action, storyId, res.user));
    } catch (err) {
      console.error(err);
      dispatch(likeToggleError());
    }
  },
  onSubscriptionClick: async (action, targetUserId) => {
    if (!auth.currentUser) {
      return dispatch(authRequestForbidden());
    }

    dispatch(subscriptionToggleRequested());

    try {
      const accessToken = JSON.parse(JSON.stringify(auth.currentUser))
        .stsTokenManager.accessToken;

      let res = await fetch(`/api/users/${targetUserId}/subscription`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();

      dispatch(subscriptionToggleComplete(res.subscribe));
    } catch (err) {
      console.error(err);
      dispatch(subscriptionToggleError());
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentsList);
