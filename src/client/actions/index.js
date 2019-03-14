import * as Types from './actionTypes';

export const authPageActivated = () => ({
  type: Types.AUTH_PAGE_ACTIVATED,
  isLoginActive: true
});

export const authPageDeactivated = () => ({
  type: Types.AUTH_PAGE_DEACTIVATED,
  isLoginActive: false
});

export const authRequestForbidden = () => ({
  type: Types.AUTH_REQUEST_FORBIDDEN,
  isLoginActive: true,
});

export const createStoryComplete = () => ({
  type: Types.CREATE_STORY_COMPLETE,
  isLoading: false
});

export const createStoryError = () => ({
  type: Types.CREATE_STORY_ERROR,
  isLoading: false
});

export const createStoryRequested = () => ({
  type: Types.CREATE_STORY_REQUESTED,
  isLoading: true
});

export const fetchCategoriesComplete = categories => ({
  type: Types.FETCH_CATEGORIES_COMPLETE,
  categories
});

export const fetchCategoriesError = () => ({
  type: Types.FETCH_CATEGORIES_ERROR
});

export const fetchCategoriesRequested = () => ({
  type: Types.FETCH_CATEGORIES_REQUESTED
});

export const fetchStoriesComplete = (stories, sortType, category, page) => ({
  type: Types.FETCH_STORIES_COMPLETE,
  isLoading: false,
  stories,
  sortType,
  category,
  page
});

export const fetchStoriesError = () => ({
  type: Types.FETCH_STORIES_ERROR,
  isLoading: false
});

export const fetchStoriesRequested = () => ({
  type: Types.FETCH_STORIES_REQUESTED,
  isLoading: true
});

export const fetchStoryComplete = story => ({
  type: Types.FETCH_STORY_COMPLETE,
  isLoading: false,
  story
});

export const fetchStoryError = () => ({
  type: Types.FETCH_STORY_ERROR,
  isLoading: false
});

export const fetchStoryRequested = () => ({
  type: Types.FETCH_STORY_REQUESTED,
  isLoading: true
});

export const likeToggleComplete = (likeAction, storyId, user) => ({
  type: Types.LIKE_TOGGLE_COMPLETE,
  isLoading: false,
  likeAction,
  storyId,
  user
});

export const likeToggleError = () => ({
  type: Types.LIKE_TOGGLE_ERROR,
  isLoading: false
});

export const likeToggleRequested = () => ({
  type: Types.LIKE_TOGGLE_REQUESTED,
  isLoading: true
});

export const logInComplete = (user, accessToken) => ({
  type: Types.LOG_IN_COMPLETE,
  isLoading: false,
  isLoginActive: false,
  isUserLoggedIn: true,
  accessToken,
  photoURL: user.photoURL,
  subscribe: user.subscribe,
  subscriber: user.subscriber,
  uid: user.uid,
  userId: user._id,
  username: user.username
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

export const menuToggle = isMenuActive => ({
  type: Types.MENU_TOGGLE,
  isMenuActive
});

export const profileToggle = isProfileActive => ({
  type: Types.PROFILE_TOGGLE,
  isProfileActive
});

export const searchStoriesComplete = (stories, page) => ({
  type: Types.SEARCH_STORIES_COMPLETE,
  isLoading: false,
  stories,
  page
});

export const searchStoriesError = () => ({
  type: Types.SEARCH_STORIES_ERROR,
  isLoading: false
});

export const searchStoriesRequested = () => ({
  type: Types.SEARCH_STORIES_REQUESTED,
  isLoading: true
});

export const subscriptionToggleComplete = subscribe => ({
  type: Types.SUBSCRIPTION_TOGGLE_COMPLETE,
  isLoading: false,
  subscribe
});

export const subscriptionToggleError = () => ({
  type: Types.SUBSCRIPTION_TOGGLE_ERROR,
  isLoading: false
});

export const subscriptionToggleRequested = () => ({
  type: Types.SUBSCRIPTION_TOGGLE_REQUESTED,
  isLoading: true
});
