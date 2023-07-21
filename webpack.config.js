const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    './scripts/WalkingSim/bundle': './scripts/WalkingSim/script.js',
    './scripts/Waves/bundle': './scripts/Waves/script.js',
    './scripts/bundle': './scripts/combinedScript.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: ['webpack-glsl-loader'],
      },
    ],
  },
  devServer: {
    static: './public',
   
    hot: false,
  },
  watchOptions: {
    ignored: 'WorldDataHereSoItDoesntUpdateEveryTimeIChangeIt.json',

  },
};