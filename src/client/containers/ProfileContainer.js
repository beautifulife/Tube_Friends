import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { logOutUser } from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  const { displayName } = state;

  return {
    displayName
  };
};

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => {
    auth.signOut();
    dispatch(logOutUser());
    window.location.reload();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
