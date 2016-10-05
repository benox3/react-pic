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
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-addons-shallow-compare': 'var React.addons.shallowCompare'
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
