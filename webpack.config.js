const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    library: 'Pic'
  },
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
    'react': {
      root: 'React',
      amd: 'react',
      commonjs2: 'react',
      commonjs: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom'
    }
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
