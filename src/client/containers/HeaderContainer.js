import { connect } from 'react-redux';
import Header from '../components/Header';
import { activateLoginPage } from '../actions';

const mapStateToProps = (state) => {
  const { isLoginActive } = state;

  return {
    isLoginActive
  };
};

const mapDispatchToProps = dispatch => ({
  onLoginClick: () => {
    dispatch(activateLoginPage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
