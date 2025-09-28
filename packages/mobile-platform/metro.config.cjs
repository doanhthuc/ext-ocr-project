const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(projectRoot);

module.exports = {
  ...defaultConfig,
  watchFolders: Array.from(new Set([...(defaultConfig.watchFolders ?? []), workspaceRoot])),
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: (defaultConfig.resolver?.assetExts ?? []).filter((ext) => ext !== 'svg'),
    sourceExts: Array.from(
      new Set([...(defaultConfig.resolver?.sourceExts ?? []), 'svg'])
    )
  }
};
