import * as Types from '../actions/actionTypes';

const initialState = {
  isLoginActive: false,
  isMenuActive: false,
  isProfileActive: false,
  isUserLoggedIn: false,
  isLoading: false,
  accessToken: '',
  categories: [],
  photoURL: '',
  page: 0,
  stories: [],
  story: {},
  subscribe: [],
  subscriber: [],
  userId: '',
  uid: '',
  username: ''
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.AUTH_PAGE_ACTIVATED:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.AUTH_PAGE_DEACTIVATED:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.AUTH_REQUEST_FORBIDDEN:
    newState.isLoginActive = action.isLoginActive;

    return newState;

  case Types.CREATE_STORY_COMPLETE:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.CREATE_STORY_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.CREATE_STORY_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.FETCH_CATEGORIES_COMPLETE:
    newState.categories = action.categories;

    return newState;

  case Types.FETCH_CATEGORIES_ERROR:

    return newState;

  case Types.FETCH_CATEGORIES_REQUESTED:

    return newState;

  case Types.FETCH_STORIES_COMPLETE:
    newState.stories = action.stories;
    newState.sortType = action.sortType;
    newState.category = action.category;
    newState.page = action.page;
    newState.isLoading = action.isLoading;

    return newState;

  case Types.FETCH_STORIES_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.FETCH_STORIES_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.FETCH_STORY_COMPLETE:
    newState.isLoading = action.isLoading;
    newState.story = action.story;

    return newState;

  case Types.FETCH_STORY_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.FETCH_STORY_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.LIKE_TOGGLE_COMPLETE:
    if (action.likeAction === 'add') {
      for (let i = 0; i < newState.stories.length; i++) {
        if (newState.stories[i]._id === action.storyId) {
          newState.stories[i].like.push(action.user);

          break;
        }
      }

      if (Object.keys(newState.story).length) {
        if (newState.story._id === action.storyId) {
          newState.story.like.push(action.user);
        }
      }
    } else {
      for (let i = 0; i < newState.stories.length; i++) {
        if (newState.stories[i]._id === action.storyId) {
          for (let j = 0; j < newState.stories[i].like.length; j++) {
            if (newState.stories[i].like[j]._id === action.user._id) {
              newState.stories[i].like.splice(j, 1);

              break;
            }
          }

          break;
        }
      }

      if (Object.keys(newState.story).length) {
        for (let i = 0; i < newState.story.like.length; i++) {
          if (newState.story.like[i]._id === action.user._id) {
            newState.story.like.splice(i, 1);

            break;
          }
        }
      }
    }

    newState.isLoading = action.isLoading;

    return newState;

  case Types.LIKE_TOGGLE_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.LIKE_TOGGLE_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.LOG_IN_COMPLETE:
    newState.isLoading = action.isLoading;
    newState.isLoginActive = action.isLoginActive;
    newState.isUserLoggedIn = action.isUserLoggedIn;
    newState.accessToken = action.accessToken;
    newState.photoURL = action.photoURL;
    newState.subscribe = action.subscribe;
    newState.subscriber = action.subscriber;
    newState.uid = action.uid;
    newState.userId = action.userId;
    newState.username = action.username;

    return newState;

  case Types.LOG_IN_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.LOG_IN_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.LOG_OUT_COMPLETE:
    return initialState;

  case Types.MENU_TOGGLE:
    newState.isMenuActive = action.isMenuActive;

    return newState;

  case Types.PROFILE_TOGGLE:
    newState.isProfileActive = action.isProfileActive;

    return newState;

  case Types.SEARCH_STORIES_COMPLETE:
    newState.isLoading = action.isLoading;
    newState.stories = action.stories;
    newState.page = action.page;

    return newState;

  case Types.SEARCH_STORIES_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.SEARCH_STORIES_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;


  case Types.SUBSCRIPTION_TOGGLE_COMPLETE:
    newState.isLoading = action.isLoading;
    newState.subscribe = action.subscribe;

    return newState;

  case Types.SUBSCRIPTION_TOGGLE_ERROR:
    newState.isLoading = action.isLoading;

    return newState;

  case Types.SUBSCRIPTION_TOGGLE_REQUESTED:
    newState.isLoading = action.isLoading;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
