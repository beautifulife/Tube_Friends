import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import {
  searchStoriesComplete,
  searchStoriesError,
  searchStoriesRequested
} from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: async (inputValue, accessToken) => {
    let keyword = inputValue;

    if (keyword.match(/[^a-zA-Z0-9\s]|\s\s/)) {
      keyword = keyword.replace(/[^a-zA-Z0-9가-힣\s]/g, '');
      keyword = keyword.replace(/\s\s/g, ' ');
    }

    if (keyword.trim().length < 2) {
      return window.alert('at least 2 characters required');
    }

    const uri = `/api/search?keyword=${keyword}`;
    const encodedUri = encodeURI(uri);

    dispatch(searchStoriesRequested());

    try {
      let res = await fetch(encodedUri);

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();
      dispatch(searchStoriesComplete(res.stories, res.page));
      ownProps.history.push(`/search/${keyword}`);
    } catch (err) {
      dispatch(searchStoriesError());
      console.error(err);
    }
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
);
