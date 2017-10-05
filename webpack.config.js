const UglifyEsPlugin = require('uglify-es-webpack-plugin');

const plugins = [
  new UglifyEsPlugin()
];

module.exports = {
  entry: `${__dirname}/src/zerofactor.js`,
  output: {
      path: `${__dirname}/extension`,
      filename: "zerofactor.js",
  },
  plugins
};
