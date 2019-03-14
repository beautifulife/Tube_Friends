import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { searchStoriesComplete, searchStoriesError, searchStoriesRequested } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onSubmit: async (inputValue, accessToken) => {
    if (inputValue.match(/[^a-zA-Z0-9\s]|\s\s/)) {
      inputValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
      inputValue = inputValue.replace(/\s\s/g, ' ');
    }

    if (inputValue.trim().length < 2) {
      return window.alert('at least 2 characters required');
    }

    const uri = `/api/search?keyword=${inputValue}`;
    const encodedUri = encodeURI(uri);

    dispatch(searchStoriesRequested());

    try {
      let res = await fetch(encodedUri);

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();
      dispatch(searchStoriesComplete(res.stories, res.page));
    } catch (err) {
      dispatch(searchStoriesError());
      console.error(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
