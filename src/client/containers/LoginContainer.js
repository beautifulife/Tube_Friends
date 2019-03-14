import { connect } from 'react-redux';
import Login from '../components/Login';
import { authPageDeactivated, logInError } from '../actions';
import { auth, provider } from '../utils/firebase';

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(authPageDeactivated());
  },
  onGoogleSignIn: () => {
    auth.signInWithPopup(provider).catch(err => {
      console.error(err);
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
