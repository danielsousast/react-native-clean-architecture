module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'react-native',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '@react-native|' +
      'react-native|' +
      'react-native-svg-charts|' +
      'react-native-iphone-x-helper|' +
      'react-native-responsive-fontsize|' +
      '@react-navigation|' +
      '/.*)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  globalSetup: './jest/global_setup.ts',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
};
