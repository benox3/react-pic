const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
  entry: [
    './lib/index.js'
  ],
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    library: 'Pic'
  },
  target: 'node',
  plugins: [],
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
  externals: {
    'react': 'react',
    'react-dom/server': 'react-dom/server',
    'react-addons-shallow-compare': 'react-addons-shallow-compare'
  }
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = config;
