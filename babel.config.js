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
            "@components": './src/components',
            "@constants": "./src/constants",
            "@screens": './src/screens',
            "@fmk": './src/fmk',
            "@navigator": './src/navigator',
            "@provider": './src/provider',
            "@stores": './src/stores',
            "@translations": './src/translations',
            "@ts": './src/ts',
            "@utils": './src/utils',
            "@resource": "./resource"
          },
        },
      ],
    ],
  }
}