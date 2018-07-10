const json_importer = require('node-sass-json-importer');
const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['./node_modules'],
        importer: json_importer,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
};
