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
  let userLoggedIn = false;
  const createUserWithEmailAndPasswordMock = jest.fn(() => {
    userLoggedIn = true;
    return Promise.resolve({});
  });
  const signInWithEmailAndPasswordMock = jest.fn(() => {
    userLoggedIn = true;
    return Promise.resolve({});
  });
  return () => {
    return {
      onAuthStateChanged: (func) => {
        const user = userLoggedIn ? {} : undefined;
        func(user);
      },
      createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      signOut: () => {
        userLoggedIn = false;
      }
    };
  };
});

jest.mock('@react-native-firebase/firestore', () => ({}));
