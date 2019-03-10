import { connect } from 'react-redux';
import Login from '../components/Login';
import { deactivateLoginPage, logInComplete } from '../actions';
import { auth, provider } from '../utils/firebase';

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(deactivateLoginPage());
  },
  onGoogleSignIn: () => {
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
            logInComplete(res.user)
          );
        } catch (err) {
          console.error(err);
          auth.signOut();
          window.location.reload();
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
  null,
  mapDispatchToProps
)(Login);
