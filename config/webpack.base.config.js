const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = env => {
  const { NODE_ENV, PROD_ENV } = env;
  return merge([
    {
      entry: ['babel-polyfill', './index.js'],
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-webpack.bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
          },
          {
            test: /\.html$/,
            use: {
              loader: 'html-loader',
            },
          },
          {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ],
      },
      devServer: {
        contentBase: path.join(__dirname, '/public/'),
        hot: true,
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.PROD_ENV': JSON.stringify('production'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
          template: './index.html',
          filename: 'index.html',
          inject: true,
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true,
          },
        }),
        // new CopyWebpackPlugin([{ from: "src/dist" }]),
        new DashboardPlugin(),
        new CleanWebpackPlugin(),
      ],
    },
  ]);
};
