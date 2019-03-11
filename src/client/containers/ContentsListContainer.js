import { connect } from 'react-redux';
import ContentsList from '../components/ContentsList';
import { fetchStoriesComplete, fetchStoriesError, fetchStoriesRequested } from '../actions';

const mapStateToProps = state => {
  const { isLoading, stories, sortType } = state;

  return { isLoading, stories, sortType };
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentsList);
