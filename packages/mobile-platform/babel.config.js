const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@ocr-platform/shared': path.resolve(__dirname, '..', 'shared'),
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
        root: ['./src'],
      },
    ],
    'inline-dotenv',
    'nativewind/babel',
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin', // keep last plugin
  ],
  presets: ['module:@react-native/babel-preset'],
};
