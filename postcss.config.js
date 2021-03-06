const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' &&
      purgecss({
        content: ['./public/index.html', './src/**/*.tsx', './src/**/*.ts'],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
  ],
};
