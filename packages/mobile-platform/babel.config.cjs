module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          root: ['./'],
          alias: {
            '~': './src',
            '@mobile': './src',
            '@shared': '../shared/src'
          }
        }
      ],
      'nativewind/babel',
      'expo-router/babel',
      ['inline-dotenv', { path: '../../.env', safe: false }],
      'react-native-reanimated/plugin'
    ]
  };
};
