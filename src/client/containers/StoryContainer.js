import { connect } from 'react-redux';
import Story from '../components/Story';
import {
  fetchStoryComplete,
  fetchStoryError,
  fetchStoryRequested,
  likeToggleComplete,
  likeToggleError,
  likeToggleRequested,
  subscriptionToggleComplete,
  subscriptionToggleError,
  subscriptionToggleRequested
} from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  const { isLoading, story, subscribe, userId } = state;

  return { isLoading, story, subscribe, userId };
};

const mapDispatchToProps = dispatch => ({
  onInit: async storyId => {
    dispatch(fetchStoryRequested());

    try {
      let res = await fetch(`/api/stories/${storyId}`);

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();

      dispatch(fetchStoryComplete(res.story));
    } catch (err) {
      console.error(err);
      dispatch(fetchStoryError());
    }
  },
  onLikeClick: async (didUserLike, storyId) => {
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
      console.log('done');
    } catch (err) {
      console.error(err);
      dispatch(likeToggleError());
    }
  },
  onSubscriptionClick: async (action, targetUserId) => {
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
      console.log('done');
    } catch (err) {
      console.error(err);
      dispatch(subscriptionToggleError());
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Story);
