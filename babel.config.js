module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ["@babel/plugin-proposal-decorators", { "legacy": true}],
      ["@babel/plugin-proposal-class-properties", { "loose": true}],
      [
        'module-resolver',
        {
          alias: {
            "@screens": './src/screens',
            "@components": './src/components',
            "@ts": './src/ts',
            "@utils": './src/utils',
            "@stores": './src/stores',
            "@navigator": './src/navigator',
            "@translations": './src/translations',
            "@provider": './src/provider',
            "@resource": "./resource",
            "@constants": "./src/constants",
          },
        },
      ],
    ],
  }
}