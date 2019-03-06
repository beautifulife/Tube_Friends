import * as Types from './actionTypes';

export const activateLoginPage = () => ({
  type: Types.LOGIN_PAGE_ACTIVATE,
  isLoginActive: true
});

export const deactivateLoginPage = () => ({
  type: Types.LOGIN_PAGE_DEACTIVATE,
  isLoginActive: false
});

export const logInUser = (user, accessToken) => ({
  type: Types.USER_LOG_IN,
  isUserLoggedIn: true,
  isLoginActive: false,
  displayName: user.displayName,
  photoURL: user.photoURL,
  accessToken
});

export const logOutUser = () => ({
  type: Types.USER_LOG_OUT,
  isUserLoggedIn: false
});
