import { ConfigContext, ExpoConfig } from '@expo/config';
import { config as loadEnv } from 'dotenv';

loadEnv();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'OCR Mobile',
  slug: 'ocr-mobile',
  version: '0.1.0',
  scheme: 'ocr',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: 'com.vietminhidp.ocr',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    }
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/icon.png'
  },
  plugins: ['expo-router', ['expo-build-properties', {
    android: {
      kotlinVersion: '1.9.24',
      androidGradlePluginVersion: '8.11.1',
      newArchEnabled: true,
    },
  }]],
  experiments: {
    typedRoutes: true
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://example.com',
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? ''
    }
  }
});
