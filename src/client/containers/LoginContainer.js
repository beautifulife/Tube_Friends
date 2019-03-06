import { connect } from 'react-redux';
import Login from '../components/Login';
import { deactivateLoginPage, logInUser } from '../actions';
import { auth, provider } from '../utils/firebase';

const mapStateToProps = state => {
  const { isLoginActive, isUserLoggedIn } = state;

  return { isLoginActive, isUserLoggedIn };
};

const mapDispatchToProps = dispatch => ({
  onCloseClick: isLoginActive => {
    dispatch(deactivateLoginPage(!isLoginActive));
  },
  onGoogleSignIn: (isLoginActive, isUserLoggedIn) => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user = JSON.stringify(result.user);

        try {
          let res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: user
          });

          if (res.status !== 200) {
            throw new Error(`responsed ${res.status}`);
          }

          res = await res.json();
          dispatch(
            logInUser(res.user, !isLoginActive, !isUserLoggedIn)
          );
        } catch (err) {
          auth.signOut();
          console.error(err);
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
