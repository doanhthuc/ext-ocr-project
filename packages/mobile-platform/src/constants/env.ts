import type { ExpoConfig } from 'expo/config';

import Constants from 'expo-constants';

const expoConfig = (Constants.expoConfig ?? Constants.manifest) as ExpoConfig | undefined;
const extra = expoConfig?.extra as { apiUrl?: string } | undefined;

export const API_ENDPOINT = extra?.apiUrl ?? 'https://example.com';
