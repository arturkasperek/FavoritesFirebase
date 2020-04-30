import 'react-native';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

jest.mock('@react-native-firebase/app', () => {
  return {
    app: jest.fn(() => ({
      utils: jest.fn(() => ({})),
    })),
  }
}, { virtual: true });

jest.mock('@react-native-firebase/auth', () => {
  const mock = {
    onAuthStateChanged: (func) => {
      const user = process.env.TESTS_FIREBASE_USER_LOGGED_IN !== 'yes' ? undefined : {};
      func(user);
    },
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  };

  return () => mock;
});

jest.mock('@react-native-firebase/firestore', () => ({}));
