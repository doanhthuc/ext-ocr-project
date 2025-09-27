import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { useErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type Properties = {
  readonly onReset?: () => void;
};

function DefaultErrorScreen({ onReset = undefined }: Properties) {
  const { colors, fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();
  const { resetBoundary } = useErrorBoundary();

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        gutters.gap_16,
        gutters.padding_16,
      ]}
    >
      <IconByVariant
        height={42}
        path="fire"
        stroke={colors.red500}
        width={42}
      />
      <Text style={[fonts.gray800, fonts.bold, fonts.size_16]}>
        {t('mobile.errorBoundary.title')}
      </Text>
      <Text style={[fonts.gray800, fonts.size_12, fonts.alignCenter]}>
        {t('mobile.errorBoundary.description')}
      </Text>

      {onReset ? (
        <TouchableOpacity
          onPress={() => {
            resetBoundary();
            onReset();
          }}
        >
          <Text style={[fonts.gray800, fonts.size_16]}>
            {t('mobile.errorBoundary.cta')}
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}

export default DefaultErrorScreen;
