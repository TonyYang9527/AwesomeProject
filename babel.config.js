module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true}],
      ["@babel/plugin-proposal-class-properties", { "loose": true}],
      [
        'module-resolver',
        {
          alias: {
            "@screens": './src/screens',
            "@components": './src/components',
          },
        },
      ],
    ],
  }
}