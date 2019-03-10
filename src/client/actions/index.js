import * as Types from './actionTypes';

export const activateLoginPage = () => ({
  type: Types.ACTIVATE_LOGIN_PAGE,
  isLoginActive: true
});

export const deactivateLoginPage = () => ({
  type: Types.DEACTIVATE_LOGIN_PAGE,
  isLoginActive: false
});

export const fetchCategoriesComplete = categories => ({
  type: Types.FETCH_CATEGORIES_COMPLETE,
  categories
});

export const logInComplete = (user) => ({
  type: Types.LOG_IN_COMPLETE,
  isLoginActive: false,
  isUserLoggedIn: true,
  accessToken: user.stsTokenManager.accessToken,
  displayName: user.displayName,
  photoURL: user.photoURL,
  username: user.email.split('@')[0]
});

export const logOutComplete = () => ({
  type: Types.LOG_OUT_COMPLETE
});

export const searchStoriesComplete = (stories, page) => ({
  type: Types.SEARCH_STORIES_COMPLETE,
  stories,
  page
});

export const toggleMenu = isMenuActive => ({
  type: Types.TOGGLE_MENU,
  isMenuActive
});

export const toggleProfile = isProfileActive => ({
  type: Types.TOGGLE_PROFILE,
  isProfileActive
});
