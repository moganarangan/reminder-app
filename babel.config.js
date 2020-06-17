module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [["@babel/plugin-proposal-decorators", { "legacy": true }],
          'react-native-paper/babel'],
      },
    }
  };
};
