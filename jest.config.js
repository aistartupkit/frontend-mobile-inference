module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-native-safe-area-context|@react-native-firebase|@react-native-google-signin|react-native-fs|react-native-progress|react-native-google-mobile-ads|@react-native-async-storage)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
