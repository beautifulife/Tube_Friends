import * as Types from './actionTypes';
import { Type } from 'protobufjs';

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

export const fetchCategoriesError = () => ({
  type: Types.FETCH_CATEGORIES_ERROR
});

export const fetchStoriesComplete = (stories, sortType, category, page) => ({
  type: Types.FETCH_STORIES_COMPLETE,
  stories,
  sortType,
  category,
  isLoading: false
});

export const fetchStoriesError = () => ({
  type: Types.FETCH_STORIES_ERROR,
  isLoading: false
});

export const fetchStoriesRequested = () => ({
  type: Types.FETCH_STORIES_REQUESTED,
  isLoading: true
});

export const logInComplete = user => ({
  type: Types.LOG_IN_COMPLETE,
  isLoading: false,
  isLoginActive: false,
  isUserLoggedIn: true,
  accessToken: user.stsTokenManager.accessToken,
  uid: user.uid,
  photoURL: user.photoURL,
  username: user.email.split('@')[0]
});

export const logInError = () => ({
  type: Types.LOG_IN_ERROR,
  isLoading: false
});

export const logInRequested = () => ({
  type: Types.LOG_IN_REQUESTED,
  isLoading: true
});

export const logOutComplete = () => ({
  type: Types.LOG_OUT_COMPLETE
});

export const likeToggleComplete = (likeAction, storyId, user) => ({
  type: Types.LIKE_TOGGLE_COMPLETE,
  isLoading: false,
  likeAction,
  storyId,
  user
});

export const likeToggleError = () => ({
  type: Type.LIKE_TOGGLE_ERROR,
  isLoading: false
});

export const likeToggleRequested = () => ({
  type: Types.LIKE_TOGGLE_REQUESTED,
  isLoading: true
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
