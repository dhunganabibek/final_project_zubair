const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/transform-runtime'
          ],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv({
      path: './.env.development.properties',
      safe: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: true,
    }),
  ],
};
