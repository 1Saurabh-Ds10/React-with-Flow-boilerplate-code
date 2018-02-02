const webpack = require('webpack');
const path = require('path');
// const glob = require("glob");
// const PurifyCSSPlugin = require("purifycss-webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['axios', 'lodash', 'moment', 'react', 'react-dom'];

const isProd = process.env.NODE_ENV === 'prod ';

const cssDev = ['style-loader', 'css-loader']; // 'sass-loader'
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [{ loader: 'css-loader', options: { minimize: true } }]
  // use: [{ loader: ["css-loader", "sass-loader"], options: { minimize: true } }]
});

module.exports = {
  context: __dirname,
  entry: {
    bundle: ['react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server','./src/App.js'],
    vendor: VENDOR_LIBS
  },
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js?[hash]'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'es2016', 'es2017', 'stage-0']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: isProd ? cssProd : cssDev
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
              name: 'img/[name]_[hash].[ext]'
            }
          },

          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true, // GZip Compression
    // publicPath: 'public/',
    // port: 9000,
    historyApiFallback: true,
    stats: 'errors-only',
    open: true,
    hot: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({
      filename: 'css/style.css?[chunkhash]',
      disable: !isProd,
      allChunks: true
    }),
    /* new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    }), */
    new HTMLWebpackPlugin({
      title: 'Boilerplate Project',
      minify: {
        collapseWhitespace: true
      },
      // hash: true,
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
