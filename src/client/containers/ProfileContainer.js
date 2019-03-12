import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { logOutComplete } from '../actions';
import { auth } from '../utils/firebase';

const mapStateToProps = state => {
  const { username } = state;

  return {
    username
  };
};

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => {
    auth.signOut();
    dispatch(logOutComplete());
    window.location.reload();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
