import { connect } from 'react-redux';
import Header from '../components/Header';
import { activateLoginPage } from '../actions';

const mapStateToProps = (state) => {
  const { isLoginActive, isUserLoggedIn, photoURL, displayName } = state;

  return {
    isLoginActive,
    isUserLoggedIn,
    userProfile: {
      photoURL,
      displayName
    }
  };
};

const mapDispatchToProps = dispatch => ({
  onLoginClick: () => {
    dispatch(activateLoginPage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
