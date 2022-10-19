const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  return {
    entry: './src/index.jsx',
    output: {
      filename: 'index_bundle' + Date.now() + '.js',
    },
    //To make BrowserRouter working
    devServer: {
      historyApiFallback: true,
    },
    mode: process.env.mode,
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
        path: './.env.production.properties',
        safe: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/index.html',
      }),
    ],
  };
};
