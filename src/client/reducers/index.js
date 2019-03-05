import * as Types from '../actions/actionTypes';

const initialState = {
  isLoginActive: false
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.ACTIVATE_LOGIN_PAGE:
  case Types.DEACTIVATE_LOGIN_PAGE:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
