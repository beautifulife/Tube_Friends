/* eslint-disable no-undef */
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../Login';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  const wrapper = shallow(<Login />);

  it('component rendered', () => {
    expect(wrapper.find('.Login').length).toBe(1);
  });

  describe('about state', () => {
    const wrapper = shallow(<Login />);
    
    it('initial state set', () => {
      expect(wrapper.state().isLoginOnProcess).toBe(false);
      expect(wrapper.state().isSignUpActive).toBe(false);
    });
  });

  describe('about event handlers', () => {
    let isLoginActive = true;
    let didGoogleSignIn = false;
    const onCloseClick = () => {
      isLoginActive = false;
    };
    const onGoogleSignIn = () => {
      didGoogleSignIn = true;
    };
    const wrapper = mount(<Login onCloseClick={onCloseClick} onGoogleSignIn={onGoogleSignIn} />);
    const loginButton = wrapper.find('.Login__contents__google-btn');
    const closeButton = wrapper.find('.Login__contents__close-btn');
    const loginToggleButton = wrapper.find('.Login__contents__no-account > span');

    it('buttons are rendered', () => {
      expect(loginButton.length).toBe(1);
      expect(closeButton.length).toBe(1);
      expect(loginToggleButton.length).toBe(1);
    });

    it('get event when click login button', () => {
      loginButton.simulate('click');
      expect(wrapper.state().isLoginOnProcess).toBe(true);
      expect(didGoogleSignIn).toBe(true);
    });

    it('get event when click close button', () => {
      closeButton.simulate('click');
      expect(isLoginActive).toBe(false);
    });

    it('get event when click close button', () => {
      loginToggleButton.simulate('click');
      expect(wrapper.state().isSignUpActive).toBe(true);
    });
  });
});
