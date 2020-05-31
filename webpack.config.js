const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'td': './lib/index.js',
    'td.min': './lib/index.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new UglifyJSPlugin({
      compress: false,
      mangle: false,
      beautify: true,
      output: {
        quote_keys: true
      },
      include: /td\.js$/
    }),
    new UglifyJSPlugin({
      compress: {
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false,
        quote_keys: true
      },
      include: /td\.min\.js$/,
      minimize: true
    })
  ]
}
