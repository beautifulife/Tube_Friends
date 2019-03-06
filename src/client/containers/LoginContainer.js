import { connect } from 'react-redux';
import Login from '../components/Login';
import { deactivateLoginPage, logInUser } from '../actions';
import { authRef, provider } from '../utils/firebase';
// import toggleSignInGoogle from '../utils/googleLogin';

const mapStateToProps = (state) => {


  return state;
};


const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(deactivateLoginPage());
  },
  signInGoogle: () => {
    authRef.signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result);
      const accessToken = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      fetch('/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(`responsed ${res.status}`);
          }

          dispatch(logInUser(user, accessToken));
        })
        .catch(err => console.error(err));
    }).catch((error) => {
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
