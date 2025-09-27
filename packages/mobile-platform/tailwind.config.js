const { withNativewind } = require('nativewind/tailwind');

const { colorTokens, fontTokens } = require('@ocr-platform/shared/styles');

const colors = Object.entries(colorTokens).reduce(
  (accumulator, [key, value]) => {
    accumulator[key] = value;
    return accumulator;
  },
  {}
);

module.exports = withNativewind({
  content: ['./index.js', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: [fontTokens.serif, 'System'],
      },
    },
  },
  plugins: [],
});
