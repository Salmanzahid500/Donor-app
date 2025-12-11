module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Enable lazy loading for better performance
    ['@babel/plugin-transform-runtime', { helpers: true }],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
