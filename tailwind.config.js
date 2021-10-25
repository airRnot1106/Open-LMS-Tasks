module.exports = {
  mode: 'jit',
  purge: ['./app/pages/popup.html', './app/scripts/popup.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        500: '500px',
      },
      maxWidth: {
        500: '500px',
      },
      colors: {
        'heavy-blue': '#343a40',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
