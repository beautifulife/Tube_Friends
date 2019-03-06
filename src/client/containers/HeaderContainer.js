import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  activateLoginPage,
  logInUser,
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
  onInit: (isLoginActive, isUserLoggedIn) => {
    auth.onAuthStateChanged(user => {
      console.log('auth load', user);
      if (user && !isLoginActive) {
        dispatch(
          logInUser(
            JSON.parse(JSON.stringify(user)),
            isLoginActive,
            !isUserLoggedIn
          )
        );
      }
    });
  },
  onLoginClick: isLoginActive => {
    dispatch(activateLoginPage(!isLoginActive));
  },
  onLogOutClick: () => {
    auth.signOut();
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
