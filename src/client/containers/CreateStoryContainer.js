import { connect } from 'react-redux';
import CreateStory from '../components/CreateStory';
import {
  authPageActivated,
  authRequestForbidden,
  createStoryComplete,
  createStoryError,
  createStoryRequested
} from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  const { categories, isLoading, isUserLoggedIn, userId } = state;

  return { categories, isLoading, isUserLoggedIn, userId };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: async (title, content, link, categoryId, thumbnail) => {
    if (!auth.currentUser) {
      return dispatch(authRequestForbidden());
    }

    dispatch(createStoryRequested());

    try {
      const accessToken = JSON.parse(JSON.stringify(auth.currentUser))
        .stsTokenManager.accessToken;

      const res = await fetch('/api/stories/new', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          link,
          categoryId,
          thumbnail
        })
      });

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      dispatch(createStoryComplete());
    } catch (err) {
      console.error(err);
      dispatch(createStoryError());
    } finally {
      ownProps.history.push('/');
    }
  },
  onHistoryPush: async () => {
    dispatch(authPageActivated());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStory);
