/* eslint-disable no-undef */
import rootReducer, { initialState } from '../index';
import * as Types from '../../actions/actionTypes';

describe('reducers validate', () => {
  test('initial state validate', () => {
    const state = initialState;
    const result = rootReducer(undefined, {});

    expect(result).toEqual(state);
  });

  describe('when action type about auth is', () => {
    test('AUTH_PAGE_ACTIVATED', () => {
      const action = {
        type: Types.AUTH_PAGE_ACTIVATED,
        isLoginActive: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoginActive = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('AUTH_PAGE_DEACTIVATED', () => {
      const action = {
        type: Types.AUTH_PAGE_DEACTIVATED,
        isLoginActive: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoginActive = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('AUTH_REQUEST_FORBIDDEN', () => {
      const action = {
        type: Types.AUTH_REQUEST_FORBIDDEN,
        isLoginActive: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoginActive = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about creating story is', () => {
    test('CREATE_STORY_COMPLETE', () => {
      const action = {
        type: Types.CREATE_STORY_COMPLETE,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('CREATE_STORY_ERROR', () => {
      const action = {
        type: Types.CREATE_STORY_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('CREATE_STORY_REQUESTED', () => {
      const action = {
        type: Types.CREATE_STORY_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about fetching categories is', () => {
    test('FETCH_CATEGORIES_COMPLETE', () => {
      const categories = ['test'];
      const action = {
        type: Types.FETCH_CATEGORIES_COMPLETE,
        categories
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.categories = categories;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
      expect(result.categories).toBe(state.categories);
    });

    test('FETCH_CATEGORIES_ERROR', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_ERROR
      };
      const state = initialState;
      const result = rootReducer(state, action);

      expect(result).not.toBe(state);
    });

    test('FETCH_CATEGORIES_REQUESTED', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_REQUESTED
      };
      const state = initialState;
      const result = rootReducer(state, action);

      expect(result).not.toBe(state);
    });
  });

  describe('when action type about fetching stories is', () => {
    test('FETCH_STORIES_COMPLETE', () => {
      const stories = ['test'];
      const action = {
        type: Types.FETCH_STORIES_COMPLETE,
        stories,
        sortType: 'list',
        category: 'test',
        page: 1,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.stories = stories;
      state.sortType = 'list';
      state.category = 'test';
      state.page = 1;
      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result.stories).toBe(state.stories);
      expect(result).not.toBe(state);
    });

    test('FETCH_STORIES_ERROR', () => {
      const action = {
        type: Types.FETCH_STORIES_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('FETCH_STORIES_REQUESTED', () => {
      const action = {
        type: Types.FETCH_STORIES_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about fetching story is', () => {
    test('FETCH_STORY_COMPLETE', () => {
      const story = { story: 'story' };
      const action = {
        type: Types.FETCH_STORY_COMPLETE,
        isLoading: false,
        story
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;
      state.story = story;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
      expect(result.story).toBe(state.story);
    });

    test('FETCH_STORY_ERROR', () => {
      const action = {
        type: Types.FETCH_STORY_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('FETCH_STORY_REQUESTED', () => {
      const action = {
        type: Types.FETCH_STORY_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about authenticate is', () => {
    test('LOG_IN_COMPLETE', () => {
      const subscribe = ['test subscribe'];
      const subscriber = ['test subscriber'];
      const action = {
        type: Types.LOG_IN_COMPLETE,
        isLoading: false,
        isLoginActive: false,
        isUserLoggedIn: true,
        accessToken: 'test token',
        photoURL: 'test photoUrl',
        subscribe,
        subscriber,
        uid: 'test uid',
        userId: 'test userId',
        username: 'test username'
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;
      state.isLoginActive = false;
      state.isUserLoggedIn = true;
      state.accessToken = 'test token';
      state.photoURL = 'test photoUrl';
      state.subscribe = subscribe;
      state.subscriber = subscriber;
      state.uid = 'test uid';
      state.userId = 'test userId';
      state.username = 'test username';

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
      expect(result.subscribe).toBe(state.subscribe);
      expect(result.subscriber).toBe(state.subscriber);
    });

    test('LOG_IN_ERROR', () => {
      const action = {
        type: Types.LOG_IN_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('LOG_IN_REQUESTED', () => {
      const action = {
        type: Types.LOG_IN_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('LOG_OUT_COMPLETE', () => {
      const action = {
        type: Types.LOG_OUT_COMPLETE
      };
      const state = initialState;
      const result = rootReducer(state, action);

      expect(result).toEqual(state);
      expect(result).toBe(state);
    });
  });

  describe('when action type about like toggling is', () => {
    test('LIKE_TOGGLE_COMPLETE', () => {
      const action = {
        type: Types.LIKE_TOGGLE_COMPLETE,
        isLoading: false,
        likeAction: 'add',
        storyId: 'test storyId',
        user: { _id: 'test userId' }
      };
      const state = initialState;

      state.stories = [{ _id: 'test storyId', like: [] }];
      state.story = { _id: 'test storyId', like: [] };

      let result = rootReducer(state, action);

      expect(result.categories).toEqual(state.categories);
      expect(result.categories).not.toBe(state.categories);
      expect(result.isLoading).toBe(action.isLoading);
      expect(result.stories[0].like[0]).toBe(action.user);
      expect(result.story.like[0]).toBe(action.user);

      action.storyId = 'different test userId';
      action.user = { _id: 'wrong userId' };
      result = rootReducer(result, action);

      expect(result.stories[0].like[1]).toBeUndefined();
      expect(result.story.like[1]).toBeUndefined();

      action.likeAction = 'remove';
      result = rootReducer(result, action);

      expect(result.stories[0].like).toHaveLength(1);
      expect(result.story.like).toHaveLength(1);

      action.storyId = 'test storyId';
      action.user = { _id: 'test userId' };
      result = rootReducer(result, action);

      expect(result.stories[0].like).toHaveLength(0);
      expect(result.story.like).toHaveLength(0);
    });

    test('LIKE_TOGGLE_ERROR', () => {
      const action = {
        type: Types.LIKE_TOGGLE_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('LIKE_TOGGLE_REQUESTED', () => {
      const action = {
        type: Types.LIKE_TOGGLE_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about menu toggling is', () => {
    test('MENU_TOGGLE', () => {
      const action = {
        type: Types.MENU_TOGGLE,
        isMenuActive: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isMenuActive = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about profile toggling is', () => {
    test('PROFILE_TOGGLE', () => {
      const action = {
        type: Types.PROFILE_TOGGLE,
        isProfileActive: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isProfileActive = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about searching story is', () => {
    test('SEARCH_STORIES_COMPLETE', () => {
      const action = {
        type: Types.SEARCH_STORIES_COMPLETE,
        isLoading: false,
        stories: [{ story: 'test story' }],
        page: 1
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;
      state.stories = [{ story: 'test story' }];
      state.page = 1;
      
      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('SEARCH_STORIES_ERROR', () => {
      const action = {
        type: Types.SEARCH_STORIES_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('SEARCH_STORIES_REQUESTED', () => {
      const action = {
        type: Types.SEARCH_STORIES_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });

  describe('when action type about subscription toggling is', () => {
    test('SUBSCRIPTION_TOGGLE_COMPLETE', () => {
      const action = {
        type: Types.SUBSCRIPTION_TOGGLE_COMPLETE,
        isLoading: false,
        subscribe: [{ user: 'test user' }]
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;
      state.subscribe = [{ user: 'test user' }];

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('SUBSCRIPTION_TOGGLE_ERROR', () => {
      const action = {
        type: Types.SUBSCRIPTION_TOGGLE_ERROR,
        isLoading: false
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = false;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });

    test('SUBSCRIPTION_TOGGLE_REQUESTED', () => {
      const action = {
        type: Types.SUBSCRIPTION_TOGGLE_REQUESTED,
        isLoading: true
      };
      const state = initialState;
      const result = rootReducer(state, action);

      state.isLoading = true;

      expect(result).toEqual(state);
      expect(result).not.toBe(state);
    });
  });
});
