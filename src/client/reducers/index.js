import * as Types from '../actions/actionTypes';

const initialState = {
  isLoginActive: false,
  isMenuActive: false,
  isProfileActive: false,
  isUserLoggedIn: false,
  accessToken: '',
  displayName: '',
  photoURL: ''
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.LOGIN_PAGE_ACTIVATE:
  case Types.LOGIN_PAGE_DEACTIVATE:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.MENU_TOGGLE:
    newState.isMenuActive = action.isMenuActive;

    return newState;

  case Types.PROFILE_TOGGLE:
    newState.isProfileActive = action.isProfileActive;

    return newState;

  case Types.STORIES_SEARCH:
    newState.stories = action.stories;
    newState.page = action.page;

    return newState;

  case Types.USER_LOG_IN:
    newState.isLoginActive = action.isLoginActive;
    newState.isUserLoggedIn = action.isUserLoggedIn;
    newState.accessToken = action.accessToken;
    newState.displayName = action.displayName;
    newState.photoURL = action.photoURL;

    return newState;

  case Types.USER_LOG_OUT:
    return initialState;

  default:
    return newState;
  }
};

export default rootReducer;
