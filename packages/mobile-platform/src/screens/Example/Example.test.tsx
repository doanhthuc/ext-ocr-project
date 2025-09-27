import { storage } from '@/App';
import { supportedLanguages } from '@/hooks/language/schema';
import { LANGUAGE_STORAGE_KEY } from '@/hooks/language/useI18n';
import { ThemeProvider } from '@/theme';
import i18n from '@/translations';
import { defaultLanguage } from '@ocr-platform/shared/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Example from './Example';

describe('Example screen should render correctly', () => {
  let storageInstance: MMKV;
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  const secondaryLanguage =
    supportedLanguages.find(language => language !== defaultLanguage) ??
    defaultLanguage;

  beforeAll(() => {
    storageInstance = new MMKV();
  });

  beforeEach(() => {
    storage.set(LANGUAGE_STORAGE_KEY, defaultLanguage);
    void i18n.changeLanguage(defaultLanguage);
  });

  test('the user change the language', () => {
    const component = (
      <SafeAreaProvider>
        <ThemeProvider storage={storageInstance}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <Example />
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    render(component);

    expect(i18n.language).toBe(defaultLanguage);

    const button = screen.getByTestId('change-language-button');
    expect(button).toBeDefined();
    fireEvent.press(button);

    expect(i18n.language).toBe(secondaryLanguage);
  });

  test('the user change the theme', () => {
    const component = (
      <SafeAreaProvider>
        <ThemeProvider storage={storageInstance}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <Example />
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    render(component);

    expect(storageInstance.getString('theme')).toBe('default');

    const button = screen.getByTestId('change-theme-button');
    expect(button).toBeDefined();
    fireEvent.press(button);

    expect(storageInstance.getString('theme')).toBe('dark');
  });
});
