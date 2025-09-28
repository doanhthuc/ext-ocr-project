import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { useHelloQuery } from '../hooks/useHelloQuery';

const features = [
  {
    titleKey: 'home.nativewindTitle',
    descriptionKey: 'home.nativewindDescription'
  },
  {
    titleKey: 'home.reactQueryTitle',
    descriptionKey: 'home.reactQueryDescription'
  },
  {
    titleKey: 'home.navigationTitle',
    descriptionKey: 'home.navigationDescription'
  }
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { data } = useHelloQuery();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-slate-950" contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: t('home.title') }} />
      <View className="px-6 pt-16 pb-10 gap-8">
        <View className="gap-3">
          <Text className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            {t('home.welcome')}
          </Text>
          <Text className="text-base text-slate-600 dark:text-slate-400">
            {t('home.subtitle', { api: data?.message })}
          </Text>
        </View>

        <View className="gap-5">
          {features.map((feature) => (
            <View key={feature.titleKey} className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/70">
              <Text className="text-lg font-medium text-slate-900 dark:text-slate-100">
                {t(feature.titleKey)}
              </Text>
              <Text className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {t(feature.descriptionKey)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
