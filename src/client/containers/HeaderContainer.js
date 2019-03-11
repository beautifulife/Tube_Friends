import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  activateLoginPage,
  logInComplete,
  toggleMenu,
  toggleProfile
} from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  const {
    isLoginActive,
    isMenuActive,
    isProfileActive,
    isUserLoggedIn,
    displayName,
    photoURL
  } = state;

  return {
    isLoginActive,
    isMenuActive,
    isProfileActive,
    isUserLoggedIn,
    userProfile: {
      displayName,
      photoURL
    }
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (isLoginActive) => {
    auth.onAuthStateChanged(user => {
      console.log('auth load', user);
      if (user && !isLoginActive) {
        dispatch(
          logInComplete(JSON.parse(JSON.stringify(user)))
        );
      }
    });
  },
  onLoginClick: () => {
    dispatch(activateLoginPage());
  },
  onMenuToggle: isMenuActive => {
    dispatch(toggleMenu(!isMenuActive));
  },
  onProfileToggle: isProfileActive => {
    dispatch(toggleProfile(!isProfileActive));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
