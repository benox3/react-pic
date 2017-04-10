const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  entry: [
    'core-js/library/fn/array/reduce',
    './lib/index.js',
  ],
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    library: 'Pic',
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
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    react: 'react',
  },
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }));
}

module.exports = config;
