const cssnano = require('cssnano');

module.exports = {
  plugins: [
    cssnano(),
    require('tailwindcss'),
    require('autoprefixer')
  ],
};