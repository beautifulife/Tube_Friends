import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { logOutUser } from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => {
    auth.signOut();
    dispatch(logOutUser());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
