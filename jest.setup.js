jest.mock('@react-native-firebase/app', () => {
  return {
    app: jest.fn(() => ({
      utils: jest.fn(() => ({})),
    })),
  }
}, { virtual: true });

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: jest.fn()
  })
});

jest.mock('@react-native-firebase/firestore', () => ({}));
