const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './playground/client' // Your appʼs entry point
  ],
  target: 'node',
  output: {
    publicPath: 'http://localhost:8080/build/',
    path: path.join(__dirname, 'build'),
    filename: './react-pic.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
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
  }
};
