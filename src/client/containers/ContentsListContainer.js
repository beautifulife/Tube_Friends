import { connect } from 'react-redux';
import { auth } from '../utils/firebase';
import ContentsList from '../components/ContentsList';
import {
  fetchStoriesComplete,
  fetchStoriesError,
  fetchStoriesRequested,
  likeToggleComplete,
  likeToggleError,
  likeToggleRequested
} from '../actions';

const mapStateToProps = state => {
  const { isLoading, stories, sortType, uid } = state;

  return { isLoading, stories, sortType, uid };
};

const mapDispatchToProps = dispatch => ({
  onInit: async (sort, category) => {
    sort = sort || '';
    category = category || '';

    dispatch(fetchStoriesRequested());

    try {
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
  onLikeClick: async (didUserLike, storyId) => {
    const action = didUserLike ? 'remove' : 'add';
    const accessToken = JSON.parse(JSON.stringify(auth.currentUser))
      .stsTokenManager.accessToken;

    dispatch(likeToggleRequested());
    try {
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentsList);
