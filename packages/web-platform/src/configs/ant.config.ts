import { ThemeConfig } from 'antd';

import { getCSSVariable } from '~shared/utils/get-css-variable.util';

export const PREFIX_CLASS = 'atlas';

export const antConfig: ThemeConfig = {
  cssVar: true,
  token: {
    fontSize: 14,
    colorPrimary: getCSSVariable('--color-primary'),
    fontFamily: getCSSVariable('--font-serif'),
    colorTextBase: getCSSVariable('--color-typo'),

    controlHeightLG: 56,
    controlHeight: 40,
    controlHeightSM: 36,

    borderRadius: 8,
    borderRadiusLG: 16,

    colorError: getCSSVariable('--color-red-1'),
    colorSuccess: getCSSVariable('--color-green-2'),
  },
  components: {
    Button: {
      onlyIconSize: 20,
    },
    Tag: {
      borderRadiusSM: 9999,
      defaultBg: getCSSVariable('--color-gray-4'),
      fontWeightStrong: 500,
    },
    Typography: {
      fontSizeHeading2: 32,
      fontWeightStrong: 500,
      colorTextHeading: getCSSVariable('--color-black'),
    },
    Descriptions: {
      itemPaddingBottom: 6,
      colorTextDescription: getCSSVariable('--color-gray-6'),
    },
    Menu: {
      itemHeight: 40,
      itemBorderRadius: 8,
    },
  },
};
