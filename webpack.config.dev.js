const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'core-js/library/fn/array/reduce',
    './playground/client.js', // Your appʼs entry point
  ],
  target: 'node',
  output: {
    publicPath: 'http://localhost:8080/build/',
    path: path.join(__dirname, 'build'),
    filename: './react-pic.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      './node_modules',
    ],
  },
};
