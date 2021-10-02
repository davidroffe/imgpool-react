const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const env = 'development';

module.exports = [
  {
    entry: './app/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'index_bundle.[hash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000',
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './app/index.html',
      }),
    ],
  },
  {
    entry: './server/index.js',
    node: {
      __dirname: false,
    },
    target: 'node',

    externals: [nodeExternals()],

    output: {
      path: path.resolve('server-build'),
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000',
        },
      ],
    }
  },
];
