import { connect } from 'react-redux';
import Login from '../components/Login';
import { authPageActivated, logInError } from '../actions';
import { auth, provider } from '../utils/firebase';

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(authPageActivated());
  },
  onGoogleSignIn: () => {
    auth
      .signInWithPopup(provider)
      .catch(err => {
        console.log(err);
        dispatch(logInError());
        auth.signOut();
        window.location.reload();
      });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
