module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm/.*)?(react-native|@react-native|react-native-vector-icons|react-native-reanimated|react-native-linear-gradient|react-native-device-info|react-native-size-matters|immer|react-native-worklets|react-redux|@reduxjs/toolkit|react-native-config|@react-native/js-polyfills)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/navigation/**',
    '!src/screens/**',
  ],
};
