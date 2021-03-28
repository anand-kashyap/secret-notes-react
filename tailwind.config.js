module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['disabled']
    }
  },
  plugins: [],
}