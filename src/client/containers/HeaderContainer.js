import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  authPageActivated,
  logInComplete,
  logInError,
  logInRequested,
  menuToggle,
  profileToggle
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
  onInit: () => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(logInRequested());

        try {
          let res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });

          if (res.status !== 200) {
            throw new Error(`responsed ${res.status}`);
          }

          res = await res.json();
          dispatch(logInComplete(res.user, res.accessToken));
        } catch (err) {
          console.error(err);
          dispatch(logInError());
          auth.signOut();
          window.location.reload();
        }
      }
    });
  },
  onLoginClick: () => {
    dispatch(authPageActivated());
  },
  onMenuToggle: isMenuActive => {
    dispatch(menuToggle(!isMenuActive));
  },
  onProfileToggle: isProfileActive => {
    dispatch(profileToggle(!isProfileActive));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
