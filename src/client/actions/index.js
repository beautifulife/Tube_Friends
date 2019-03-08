import * as Types from './actionTypes';

export const activateLoginPage = () => ({
  type: Types.LOGIN_PAGE_ACTIVATE,
  isLoginActive: true
});

export const deactivateLoginPage = () => ({
  type: Types.LOGIN_PAGE_DEACTIVATE,
  isLoginActive: false
});

export const logInUser = (user) => ({
  type: Types.USER_LOG_IN,
  isLoginActive: false,
  isUserLoggedIn: true,
  accessToken: user.stsTokenManager.accessToken,
  displayName: user.displayName,
  photoURL: user.photoURL
});

export const logOutUser = () => ({
  type: Types.USER_LOG_OUT,
  isUserLoggedIn: false
});

export const searchStories = (stories, page) => ({
  type: Types.STORIES_SEARCH,
  stories,
  page
});

export const toggleMenu = isMenuActive => ({
  type: Types.MENU_TOGGLE,
  isMenuActive
});

export const toggleProfile = isProfileActive => ({
  type: Types.PROFILE_TOGGLE,
  isProfileActive
});
