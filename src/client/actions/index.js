import * as Types from './actionTypes';

export const activateLoginPage = isLoginActive => ({
  type: Types.LOGIN_PAGE_ACTIVATE,
  isLoginActive
});

export const deactivateLoginPage = isLoginActive => ({
  type: Types.LOGIN_PAGE_DEACTIVATE,
  isLoginActive
});

export const logInUser = (user, isLoginActive, isUserLoggedIn) => ({
  type: Types.USER_LOG_IN,
  isLoginActive,
  isUserLoggedIn,
  accessToken: user.stsTokenManager.accessToken,
  displayName: user.displayName,
  photoURL: user.photoURL
});

export const logOutUser = () => ({
  type: Types.USER_LOG_OUT
});

export const toggleMenu = isMenuActive => ({
  type: Types.MENU_TOGGLE,
  isMenuActive
});

export const toggleProfile = isProfileActive => ({
  type: Types.PROFILE_TOGGLE,
  isProfileActive
});
