import * as Types from '../actions/actionTypes';

const initialState = {
  isLoginActive: false,
  isMenuActive: false,
  isProfileActive: false,
  isUserLoggedIn: false,
  accessToken: '',
  categories: [],
  displayName: '',
  photoURL: '',
  page: 0,
  stories: [],
  username: ''
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.ACTIVATE_LOGIN_PAGE:
  case Types.DEACTIVATE_LOGIN_PAGE:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.FETCH_CATEGORIES_COMPLETE:
    newState.categories = action.categories;

    return newState;

  case Types.LOG_IN_COMPLETE:
    newState.isLoginActive = action.isLoginActive;
    newState.isUserLoggedIn = action.isUserLoggedIn;
    newState.accessToken = action.accessToken;
    newState.displayName = action.displayName;
    newState.photoURL = action.photoURL;
    newState.username = action.username;

    return newState;

  case Types.LOG_OUT_COMPLETE:
    return initialState;

  case Types.SEARCH_STORIES_COMPLETE:
    newState.stories = action.stories;
    newState.page = action.page;

    return newState;

  case Types.TOGGLE_MENU:
    newState.isMenuActive = action.isMenuActive;

    return newState;

  case Types.TOGGLE_PROFILE:
    newState.isProfileActive = action.isProfileActive;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
