import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: [
    './playground/client' // Your appʼs entry point
  ],
  output: {
    publicPath: 'http://localhost:8080/build/',
    path: path.join(__dirname, 'build'),
    filename: './react-pic.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
