import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useI18n, useUser } from '@/hooks';
import { circleButton } from '@/styles/variants';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MAX_RANDOM_ID = 9;

function Example() {
  const { t } = useTranslation();
  const { useFetchOneQuery } = useUser();
  const { toggleLanguage } = useI18n();

  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('mobile.screen.example.helloUser', {
          name: fetchOneUserQuery.data.name,
        })
      );
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={() => {
        handleResetError();
      }}
    >
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path="tom"
              resizeMode="contain"
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View
          className="mt-10 px-8"
          style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}
        >
          <View className="mt-10" style={[gutters.marginTop_40]}>
            <Text
              className="text-4xl font-bold text-text-primary"
              style={[fonts.size_40, fonts.gray800, fonts.bold]}
            >
              {t('mobile.screen.example.title', {
                appName: t('mobile.appName.full'),
              })}
            </Text>
            <Text
              className="mb-10 text-base text-text-light"
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              {t('mobile.screen.example.description')}
            </Text>
          </View>

          <View
            className="mt-4 w-full flex-row justify-between"
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <Skeleton
              height={64}
              loading={fetchOneUserQuery.isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                className={circleButton({ tone: 'primary' })}
                onPress={() => {
                  setCurrentId(Math.ceil(Math.random() * MAX_RANDOM_ID + 1));
                }}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <IconByVariant path="send" stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              className={circleButton()}
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path="theme" stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              className={circleButton()}
              onPress={toggleLanguage}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path="language" stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
