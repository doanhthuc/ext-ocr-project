import reanimatedMock from 'react-native-reanimated/mock';

import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = reanimatedMock;

  Reanimated.default.call = () => undefined;

  return Reanimated;
});

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      apiUrl: 'https://example.com'
    }
  }
}));
