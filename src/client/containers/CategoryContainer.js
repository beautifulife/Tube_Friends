import { connect } from 'react-redux';
import Category from '../components/Category';
import { fetchCategoriesComplete, fetchCategoriesError } from '../actions';

const mapStateToProps = state => {
  const { categories, isUserLoggedIn, username } = state;

  return { categories, isUserLoggedIn, username };
};

const mapDispatchToProps = dispatch => ({
  onInit: async () => {
    try {
      let res = await fetch('/api/categories');

      if (res.status !== 200) {
        throw new Error(`responsed ${res.status}`);
      }

      res = await res.json();
      dispatch(
        fetchCategoriesComplete(res.categories)
      );
    } catch (err) {
      dispatch(fetchCategoriesError());
      console.error(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
