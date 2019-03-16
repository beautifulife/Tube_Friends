import * as actionCreaters from '../index';
import * as Types from '../actionTypes';

describe('action creaters', () => {
  describe('about auth page function', () => {
    test('authPageActivated is valid', () => {
      const result = actionCreaters.authPageActivated();

      expect(result).toEqual({
        type: Types.AUTH_PAGE_ACTIVATED,
        isLoginActive: true
      });
    });

    test('authPageDeactivated is valid', () => {
      const result = actionCreaters.authPageDeactivated();

      expect(result).toEqual({
        type: Types.AUTH_PAGE_DEACTIVATED,
        isLoginActive: false
      });
    });

    test('authRequestForbidden is valid', () => {
      const result = actionCreaters.authRequestForbidden();

      expect(result).toEqual({
        type: Types.AUTH_REQUEST_FORBIDDEN,
        isLoginActive: true
      });
    });
  });

  describe('about create story function', () => {
    test('createStoryComplete is valid', () => {
      const result = actionCreaters.createStoryComplete();

      expect(result).toEqual({
        type: Types.CREATE_STORY_COMPLETE,
        isLoading: false
      });
    });

    test('createStoryError is valid', () => {
      const result = actionCreaters.createStoryError();

      expect(result).toEqual({
        type: Types.CREATE_STORY_ERROR,
        isLoading: false
      });
    });

    test('createStoryRequested is valid', () => {
      const result = actionCreaters.createStoryRequested();

      expect(result).toEqual({
        type: Types.CREATE_STORY_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about fetch categories function', () => {
    test('fetchCategoriesComplete is valid', () => {
      const categories = ['test'];
      const result = actionCreaters.fetchCategoriesComplete(categories);

      expect(result).toEqual({
        type: Types.FETCH_CATEGORIES_COMPLETE,
        categories
      });
    });

    test('fetchCategoriesError is valid', () => {
      const result = actionCreaters.fetchCategoriesError();

      expect(result).toEqual({
        type: Types.FETCH_CATEGORIES_ERROR
      });
    });

    test('fetchCategoriesRequested is valid', () => {
      const result = actionCreaters.fetchCategoriesRequested();

      expect(result).toEqual({
        type: Types.FETCH_CATEGORIES_REQUESTED
      });
    });
  });

  describe('about fetch stories function', () => {
    test('fetchStoriesComplete is valid', () => {
      const stories = ['test'];
      const sortType = ['list'];
      const category = 'test';
      const page = 1;
      const result = actionCreaters.fetchStoriesComplete(
        stories,
        sortType,
        category,
        page
      );

      expect(result).toEqual({
        type: Types.FETCH_STORIES_COMPLETE,
        isLoading: false,
        stories,
        sortType,
        category,
        page
      });
    });

    test('fetchStoriesError is valid', () => {
      const result = actionCreaters.fetchStoriesError();

      expect(result).toEqual({
        type: Types.FETCH_STORIES_ERROR,
        isLoading: false
      });
    });

    test('fetchStoriesRequested is valid', () => {
      const result = actionCreaters.fetchStoriesRequested();

      expect(result).toEqual({
        type: Types.FETCH_STORIES_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about fetch story function', () => {
    test('fetchStoryComplete is valid', () => {
      const story = {story: 'story'};
      const result = actionCreaters.fetchStoryComplete(story);

      expect(result).toEqual({
        type: Types.FETCH_STORY_COMPLETE,
        isLoading: false,
        story
      });
    });

    test('fetchStoryError is valid', () => {
      const result = actionCreaters.fetchStoryError();

      expect(result).toEqual({
        type: Types.FETCH_STORY_ERROR,
        isLoading: false
      });
    });

    test('fetchStoryRequested is valid', () => {
      const result = actionCreaters.fetchStoryRequested();

      expect(result).toEqual({
        type: Types.FETCH_STORY_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about like toggle function', () => {
    test('likeToggleComplete is valid', () => {
      const likeAction = 'add';
      const storyId = '1234';
      const user = { userId: 'userId' };
      const result = actionCreaters.likeToggleComplete(likeAction, storyId, user);

      expect(result).toEqual({
        type: Types.LIKE_TOGGLE_COMPLETE,
        isLoading: false,
        likeAction,
        storyId,
        user
      });
    });

    test('likeToggleError is valid', () => {
      const result = actionCreaters.likeToggleError();

      expect(result).toEqual({
        type: Types.LIKE_TOGGLE_ERROR,
        isLoading: false
      });
    });

    test('likeToggleRequested is valid', () => {
      const result = actionCreaters.likeToggleRequested();

      expect(result).toEqual({
        type: Types.LIKE_TOGGLE_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about log in function', () => {
    test('logInComplete is valid', () => {
      const accessToken = 'token';
      const user = {
        photoURL: './photo.com',
        subscribe: ['userId'],
        subscriber: ['userId'],
        uid: '1234',
        userId: '1234',
        username: 'name'
      };
      const result = actionCreaters.logInComplete(user, accessToken);

      expect(result).toEqual({
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
    });

    test('logInError is valid', () => {
      const result = actionCreaters.logInError();

      expect(result).toEqual({
        type: Types.LOG_IN_ERROR,
        isLoading: false
      });
    });

    test('logInRequested is valid', () => {
      const result = actionCreaters.logInRequested();

      expect(result).toEqual({
        type: Types.LOG_IN_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about log out function', () => {
    test('logOutComplete is valid', () => {
      const result = actionCreaters.logOutComplete();

      expect(result).toEqual({
        type: Types.LOG_OUT_COMPLETE
      });
    });
  });

  describe('about toggle menu function', () => {
    test('menuToggle is valid', () => {
      const isMenuActive = true;
      const result = actionCreaters.menuToggle(isMenuActive);

      expect(result).toEqual({
        type: Types.MENU_TOGGLE,
        isMenuActive
      });
    });
  });

  describe('about toggle profile function', () => {
    test('profileToggle is valid', () => {
      const isProfileActive = true;
      const result = actionCreaters.profileToggle(isProfileActive);

      expect(result).toEqual({
        type: Types.PROFILE_TOGGLE,
        isProfileActive
      });
    });
  });

  describe('about search stories function', () => {
    test('searchStoriesComplete is valid', () => {
      const stories = ['story'];
      const page = 1;
      const result = actionCreaters.searchStoriesComplete(stories, page);

      expect(result).toEqual({
        type: Types.SEARCH_STORIES_COMPLETE,
        isLoading: false,
        stories,
        page,
        sortType: 'search'
      });
    });

    test('searchStoriesError is valid', () => {
      const result = actionCreaters.searchStoriesError();

      expect(result).toEqual({
        type: Types.SEARCH_STORIES_ERROR,
        isLoading: false
      });
    });

    test('searchStoriesRequested is valid', () => {
      const result = actionCreaters.searchStoriesRequested();

      expect(result).toEqual({
        type: Types.SEARCH_STORIES_REQUESTED,
        isLoading: true
      });
    });
  });

  describe('about subscription toggle function', () => {
    test('subscriptionToggleComplete is valid', () => {
      const subscribe = ['userId'];
      const result = actionCreaters.subscriptionToggleComplete(subscribe);

      expect(result).toEqual({
        type: Types.SUBSCRIPTION_TOGGLE_COMPLETE,
        isLoading: false,
        subscribe
      });
    });

    test('subscriptionToggleError is valid', () => {
      const result = actionCreaters.subscriptionToggleError();

      expect(result).toEqual({
        type: Types.SUBSCRIPTION_TOGGLE_ERROR,
        isLoading: false
      });
    });

    test('subscriptionToggleRequested is valid', () => {
      const result = actionCreaters.subscriptionToggleRequested();

      expect(result).toEqual({
        type: Types.SUBSCRIPTION_TOGGLE_REQUESTED,
        isLoading: true
      });
    });
  });
});

describe('action types', () => {
  Object.keys(Types).forEach((action) => {
    test(`${action} is valid`, () => {
      expect(action).toBe(Types[action]);
    });
  });
});
