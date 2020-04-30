import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import Enzyme from 'enzyme';
import auth from '@react-native-firebase/auth';
import Authentication from '../../src/components/Authentication';

const mockUseEffect = () => {
  let useEffectStarted = false;
  jest.spyOn(React, 'useEffect').mockImplementation((f) => {
    // protection to run useEffect only once
    if (!useEffectStarted) {
      f();
      useEffectStarted = true;
    }
  });
};

describe('<Authentication />', () => {
  describe('when initializing is in progress', () => {
    it('should show initializing loader', () => {
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text />
        </Authentication>,
      );
      expect(wrapper.children()).toHaveLength(0);
    });
  });

  describe('when initializing is finished', () => {
    beforeEach(() => {
      mockUseEffect();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render children when user is authenticated', () => {
      process.env.TESTS_FIREBASE_USER_LOGGED_IN = 'yes';
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text testID={'test-children-item'} />
        </Authentication>,
      );
      const childrenItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'test-children-item',
      );

      process.env.TESTS_FIREBASE_USER_LOGGED_IN = 'no';

      expect(childrenItem.exists()).toBeTruthy();
    });

    it('should render login after initialization', () => {
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text />
        </Authentication>,
      );
      const loginHelloLabel = wrapper
        .find('Text')
        .findWhere((w) => w.text() === 'Login');

      expect(loginHelloLabel.exists()).toBeTruthy();
    });

    it('should be able to toggle register tab and toggle back to login tab', () => {
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text />
        </Authentication>,
      );
      const toggleRegisterItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'toggle-register',
      );
      toggleRegisterItem.props().onPress();
      const registerHelloLabel = wrapper
        .find('Text')
        .findWhere((w) => w.text() === 'Register');

      expect(registerHelloLabel.exists()).toBeTruthy();

      const toggleLoginItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'toggle-login',
      );

      toggleLoginItem.props().onPress();
      const loginHelloLabel = wrapper
        .find('Text')
        .findWhere((w) => w.text() === 'Login');

      expect(loginHelloLabel.exists()).toBeTruthy();
    });

    it('should be able to login', () => {
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text />
        </Authentication>,
      );
      const emailItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'login-email',
      );
      const passwordItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'login-password',
      );

      emailItem.props().onChangeText('test@gmail.com');
      passwordItem.props().onChangeText('secret');

      const loginItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'login-submit',
      );
      loginItem.props().onPress();

      expect(auth().signInWithEmailAndPassword).toBeCalledWith(
        'test@gmail.com',
        'secret',
      );
    });

    it('should be able to register', () => {
      const wrapper = Enzyme.shallow(
        <Authentication>
          <Text />
        </Authentication>,
      );
      const toggleRegisterItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'toggle-register',
      );
      toggleRegisterItem.props().onPress();

      const emailItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'register-email',
      );
      const passwordItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'register-password',
      );

      emailItem.props().onChangeText('some@gmail.com');
      passwordItem.props().onChangeText('secret2');

      const registerItem = wrapper.findWhere(
        (node) => node.prop('testID') === 'register-submit',
      );
      registerItem.props().onPress();

      expect(auth().createUserWithEmailAndPassword).toBeCalledWith(
        'some@gmail.com',
        'secret2',
      );
    });
  });
});
