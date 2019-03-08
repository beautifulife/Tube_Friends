import { connect } from 'react-redux';
import Category from '../components/Category';
import { getCategories } from '../actions';

const mapStateToProps = state => {
  const { categories, isUserLoggedIn, username } = state;

  return { categories, isUserLoggedIn, username };
};

const mapDispatchToProps = dispatch => ({
  onInit: async () => {
    let res = await fetch('/api/categories');

    if (res.status !== 200) {
      throw new Error(`responsed ${res.status}`);
    }

    res = await res.json();
    dispatch(
      getCategories(res.categories)
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
