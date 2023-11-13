const colors = require('tailwindcss/colors');

const extensions = ['js', 'ts', 'hbs', 'html','gjs', 'gts'];

module.exports = {
  content: [
    `./app/**/*.{${extensions.join(',')}}`,
    `./tests/**/*.{${extensions.join(',')}}`
  ],
  corePlugins: {},
  plugins: [],
  theme: {
    extends: {
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
    colors: {
      primary: '#5AA69D',
      secondary: '#C98C55',
      text: '#535263',
      background: '#F7F7EF',
      'background-disabled': '#F6F6F6',
      'text-secondary': '#384043',
      error: '#D72F33',
      warn: '#ffcc00',
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      red: colors.red,
      gray: colors.gray,
    },
  },
};
