import { connect } from 'react-redux';
import Login from '../components/Login';
import { deactivateLoginPage } from '../actions';
import toggleSignInGoogle from '../utils/googleLogin';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(deactivateLoginPage());
  },
  signInGoogle: () => {
    toggleSignInGoogle();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
