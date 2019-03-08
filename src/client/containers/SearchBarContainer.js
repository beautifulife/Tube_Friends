import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { searchStories } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onSubmit: async (inputValue, accessToken) => {
    if (inputValue.match(/[^a-zA-Z0-9\s]|\s\s/)) {
      inputValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
      inputValue = inputValue.replace(/\s\s/g, ' ');

      console.log('invalid character is removed');
    }

    if (inputValue.trim().length < 2) {
      console.log('under 2');

      return window.alert('at least 2 characters required');
    }

    console.log(inputValue, 'input');
    const uri = `/api/search?keyword=${inputValue}`;
    const encodedUri = encodeURI(uri);

    try {
      let res = await fetch(encodedUri, {
        Authorization: `Bearer ${accessToken}`
      });
  
      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }
  
      res = await res.json();
      dispatch(
        searchStories(res.stories, res.page)
      );
    } catch (err) {
      console.error(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);