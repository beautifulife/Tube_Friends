import { connect } from 'react-redux';
import Login from '../components/Login';
import { deactivateLoginPage } from '../actions';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onCloseClick: () => {
    dispatch(deactivateLoginPage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
