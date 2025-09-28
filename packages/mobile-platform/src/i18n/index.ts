import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        title: 'OCR Mobile',
        welcome: 'Welcome to OCR Mobile',
        subtitle: 'Sample API connection: {{api}}',
        nativewindTitle: 'Tailwind & NativeWind',
        nativewindDescription: 'Utility-first styling is ready out of the box.',
        reactQueryTitle: 'React Query',
        reactQueryDescription: 'Query caching keeps your UI in sync with APIs.',
        navigationTitle: 'Expo Router',
        navigationDescription: 'File-based routing powered by React Navigation.'
      }
    }
  },
  vi: {
    translation: {
      home: {
        title: 'OCR Mobile',
        welcome: 'Chào mừng đến với OCR Mobile',
        subtitle: 'Kết nối API mẫu: {{api}}',
        nativewindTitle: 'Tailwind & NativeWind',
        nativewindDescription: 'Bộ tiện ích lớp giúp tạo giao diện nhanh chóng.',
        reactQueryTitle: 'React Query',
        reactQueryDescription: 'Bộ nhớ đệm giữ cho giao diện đồng bộ dữ liệu.',
        navigationTitle: 'Expo Router',
        navigationDescription: 'Điều hướng dựa trên cấu trúc thư mục với React Navigation.'
      }
    }
  }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v4',
    lng: Localization.locale.split('-')[0] ?? 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
}

export default i18n;
