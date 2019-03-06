import * as Types from '../actions/actionTypes';

const initialState = {
  isLoginActive: false,
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.LOGIN_PAGE_ACTIVATE:
  case Types.LOGIN_PAGE_DEACTIVATE:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.USER_LOG_IN:
    newState.isLoginActive = action.isLoginActive;
    newState.isUserLoggedIn = action.isUserLoggedIn;
    newState.displayName = action.displayName;
    newState.photoURL = action.photoURL;

    return newState;

  case Types.USER_LOG_OUT:
    newState.isUserLoggedIn = action.isUserLoggedIn;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
