const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    './scripts/WalkingSim/bundle':'./scripts/WalkingSim/script.js',
    './scripts/Waves/bundle':'./scripts/Waves/script.js'
},
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
};